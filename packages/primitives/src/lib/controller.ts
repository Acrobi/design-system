/**
 * Architectural Standards: Controller Pattern for Complex Components
 *
 * This file implements the controller pattern for managing complex component state
 * following architectural standards with separation of concerns.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { ComponentController } from './types';

// Generic controller hook for complex components
export function useController<T extends Record<string, any>>(
  initialState: T,
  options?: {
    onChange?: (state: T) => void;
    onValidate?: (state: T) => boolean;
    persistKey?: string;
  }
): ComponentController<T> {
  const [state, setState] = useState<T>(() => {
    // Load persisted state if key is provided
    if (options?.persistKey) {
      try {
        const persisted = localStorage.getItem(options.persistKey);
        if (persisted) {
          return { ...initialState, ...JSON.parse(persisted) };
        }
      } catch (error) {
        console.warn('Failed to load persisted state:', error);
      }
    }
    return initialState;
  });

  // Persist state when it changes
  useEffect(() => {
    if (options?.persistKey) {
      try {
        localStorage.setItem(options.persistKey, JSON.stringify(state));
      } catch (error) {
        console.warn('Failed to persist state:', error);
      }
    }
  }, [state, options?.persistKey]);

  // Call onChange callback when state changes
  useEffect(() => {
    if (options?.onChange) {
      options.onChange(state);
    }
  }, [state, options?.onChange]);

  const update = useCallback((updates: Partial<T>) => {
    setState(prevState => {
      const newState = { ...prevState, ...updates };

      // Validate new state if validator is provided
      if (options?.onValidate && !options.onValidate(newState)) {
        console.warn('State validation failed, not updating');
        return prevState;
      }

      return newState;
    });
  }, [options?.onValidate]);

  const reset = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  return {
    state,
    actions: {
      update,
      reset
    },
    hooks: {
      onChange: options?.onChange,
      onValidate: options?.onValidate
    }
  };
}

// Button controller for managing button state
export function useButtonController(initialState?: {
  loading?: boolean;
  disabled?: boolean;
  clicked?: boolean;
}) {
  return useController({
    loading: false,
    disabled: false,
    clicked: false,
    ...initialState
  }, {
    onChange: (state) => {
      // Auto-disable button when loading
      if (state.loading && !state.disabled) {
        state.disabled = true;
      } else if (!state.loading && state.disabled && initialState?.disabled !== true) {
        state.disabled = false;
      }
    }
  });
}

// Form controller for managing form state
export function useFormController<T extends Record<string, any>>(
  initialValues: T,
  options?: {
    onSubmit?: (values: T) => void | Promise<void>;
    onValidate?: (values: T) => Record<string, string> | null;
    resetOnSubmit?: boolean;
  }
) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const submitCountRef = useRef(0);

  const controller = useController(initialValues, {
    onChange: (state) => {
      setIsDirty(true);
      // Clear errors when user starts typing
      if (errors && Object.keys(errors).length > 0) {
        setErrors({});
      }
    }
  });

  const validate = useCallback((values: T) => {
    if (options?.onValidate) {
      const validationErrors = options.onValidate(values);
      setErrors(validationErrors || {});
      return !validationErrors || Object.keys(validationErrors).length === 0;
    }
    return true;
  }, [options?.onValidate]);

  const submit = useCallback(async () => {
    if (isSubmitting) return;

    const isValid = validate(controller.state);
    if (!isValid) {
      submitCountRef.current++;
      return;
    }

    setIsSubmitting(true);
    submitCountRef.current++;

    try {
      await options?.onSubmit?.(controller.state);

      if (options?.resetOnSubmit) {
        controller.actions.reset();
        setIsDirty(false);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [controller, validate, isSubmitting, options]);

  const reset = useCallback(() => {
    controller.actions.reset();
    setErrors({});
    setIsDirty(false);
    submitCountRef.current = 0;
  }, [controller]);

  return {
    ...controller,
    formState: {
      errors,
      isSubmitting,
      isDirty,
      submitCount: submitCountRef.current,
      isValid: Object.keys(errors).length === 0
    },
    formActions: {
      submit,
      reset,
      validate,
      setErrors
    }
  };
}

// Theme controller for managing theme state
export function useThemeController(initialTheme?: string) {
  return useController({
    theme: initialTheme || 'system',
    resolvedTheme: 'light',
    isDark: false
  }, {
    onChange: (state) => {
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', state.theme);
      document.documentElement.classList.toggle('dark', state.isDark);
    }
  });
}

// List controller for managing list/table state
export function useListController<T>(
  items: T[],
  options?: {
    sortBy?: keyof T;
    sortOrder?: 'asc' | 'desc';
    filter?: (item: T) => boolean;
    itemsPerPage?: number;
  }
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  const controller = useController({
    sortBy: options?.sortBy || null,
    sortOrder: options?.sortOrder || 'asc',
    filter: options?.filter || null,
    searchQuery: ''
  });

  // Apply filters and sorting
  const processedItems = items.filter(item => {
    if (controller.state.filter && !controller.state.filter(item)) {
      return false;
    }
    if (controller.state.searchQuery) {
      // Simple search implementation - can be customized
      const searchLower = controller.state.searchQuery.toLowerCase();
      return JSON.stringify(item).toLowerCase().includes(searchLower);
    }
    return true;
  }).sort((a, b) => {
    if (!controller.state.sortBy) return 0;

    const aValue = a[controller.state.sortBy];
    const bValue = b[controller.state.sortBy];

    if (aValue === bValue) return 0;

    const comparison = aValue < bValue ? -1 : 1;
    return controller.state.sortOrder === 'desc' ? -comparison : comparison;
  });

  // Pagination
  const itemsPerPage = options?.itemsPerPage || 10;
  const totalPages = Math.ceil(processedItems.length / itemsPerPage);
  const paginatedItems = processedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelection = useCallback((item: T) => {
    setSelectedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  }, []);

  const selectAll = useCallback(() => {
    setSelectedItems(paginatedItems);
  }, [paginatedItems]);

  const clearSelection = useCallback(() => {
    setSelectedItems([]);
  }, []);

  return {
    ...controller,
    listState: {
      items: processedItems,
      paginatedItems,
      currentPage,
      totalPages,
      selectedItems,
      isAllSelected: paginatedItems.length > 0 && paginatedItems.every(item => selectedItems.includes(item)),
      isPartiallySelected: selectedItems.length > 0 && !paginatedItems.every(item => selectedItems.includes(item))
    },
    listActions: {
      setCurrentPage,
      toggleSelection,
      selectAll,
      clearSelection,
      setFilter: (filter: (item: T) => boolean) => controller.actions.update({ filter }),
      setSortBy: (sortBy: keyof T) => controller.actions.update({ sortBy }),
      toggleSortOrder: () => controller.actions.update({
        sortOrder: controller.state.sortOrder === 'asc' ? 'desc' : 'asc'
      }),
      setSearchQuery: (searchQuery: string) => controller.actions.update({ searchQuery })
    }
  };
}

// Controller factory for creating custom controllers
export function createController<T extends Record<string, any>>(
  initialState: T,
  middleware?: Array<(state: T, updates: Partial<T>) => Partial<T> | null>
) {
  return function useCustomController(options?: {
    onChange?: (state: T) => void;
    onValidate?: (state: T) => boolean;
  }) {
    const [state, setState] = useState(initialState);

    const update = useCallback((updates: Partial<T>) => {
      setState(prevState => {
        let newState = { ...prevState, ...updates };

        // Apply middleware
        if (middleware) {
          for (const middlewareFn of middleware) {
            const result = middlewareFn(newState, updates);
            if (result) {
              newState = { ...newState, ...result };
            }
          }
        }

        // Validate new state
        if (options?.onValidate && !options.onValidate(newState)) {
          console.warn('State validation failed, not updating');
          return prevState;
        }

        return newState;
      });
    }, [options?.onValidate]);

    const reset = useCallback(() => {
      setState(initialState);
    }, [initialState]);

    return {
      state,
      actions: { update, reset },
      hooks: {
        onChange: options?.onChange,
        onValidate: options?.onValidate
      }
    };
  };
}