/**
 * Architectural Standards: Controller Pattern for Complex Components
 *
 * This file implements the controller pattern for managing complex component state
 * following architectural standards with separation of concerns.
 */
import { useState, useCallback, useEffect, useRef } from 'react';
// Generic controller hook for complex components
export function useController(initialState, options) {
    const [state, setState] = useState(() => {
        // Load persisted state if key is provided
        if (options === null || options === void 0 ? void 0 : options.persistKey) {
            try {
                const persisted = localStorage.getItem(options.persistKey);
                if (persisted) {
                    return Object.assign(Object.assign({}, initialState), JSON.parse(persisted));
                }
            }
            catch (error) {
                console.warn('Failed to load persisted state:', error);
            }
        }
        return initialState;
    });
    // Persist state when it changes
    useEffect(() => {
        if (options === null || options === void 0 ? void 0 : options.persistKey) {
            try {
                localStorage.setItem(options.persistKey, JSON.stringify(state));
            }
            catch (error) {
                console.warn('Failed to persist state:', error);
            }
        }
    }, [state, options === null || options === void 0 ? void 0 : options.persistKey]);
    // Call onChange callback when state changes
    useEffect(() => {
        if (options === null || options === void 0 ? void 0 : options.onChange) {
            options.onChange(state);
        }
    }, [state, options === null || options === void 0 ? void 0 : options.onChange]);
    const update = useCallback((updates) => {
        setState(prevState => {
            const newState = Object.assign(Object.assign({}, prevState), updates);
            // Validate new state if validator is provided
            if ((options === null || options === void 0 ? void 0 : options.onValidate) && !options.onValidate(newState)) {
                console.warn('State validation failed, not updating');
                return prevState;
            }
            return newState;
        });
    }, [options === null || options === void 0 ? void 0 : options.onValidate]);
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
            onChange: options === null || options === void 0 ? void 0 : options.onChange,
            onValidate: options === null || options === void 0 ? void 0 : options.onValidate
        }
    };
}
// Button controller for managing button state
export function useButtonController(initialState) {
    return useController(Object.assign({ loading: false, disabled: false, clicked: false }, initialState), {
        onChange: (state) => {
            // Auto-disable button when loading
            if (state.loading && !state.disabled) {
                state.disabled = true;
            }
            else if (!state.loading && state.disabled && (initialState === null || initialState === void 0 ? void 0 : initialState.disabled) !== true) {
                state.disabled = false;
            }
        }
    });
}
// Form controller for managing form state
export function useFormController(initialValues, options) {
    const [errors, setErrors] = useState({});
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
    const validate = useCallback((values) => {
        if (options === null || options === void 0 ? void 0 : options.onValidate) {
            const validationErrors = options.onValidate(values);
            setErrors(validationErrors || {});
            return !validationErrors || Object.keys(validationErrors).length === 0;
        }
        return true;
    }, [options === null || options === void 0 ? void 0 : options.onValidate]);
    const submit = useCallback(async () => {
        var _a;
        if (isSubmitting)
            return;
        const isValid = validate(controller.state);
        if (!isValid) {
            submitCountRef.current++;
            return;
        }
        setIsSubmitting(true);
        submitCountRef.current++;
        try {
            await ((_a = options === null || options === void 0 ? void 0 : options.onSubmit) === null || _a === void 0 ? void 0 : _a.call(options, controller.state));
            if (options === null || options === void 0 ? void 0 : options.resetOnSubmit) {
                controller.actions.reset();
                setIsDirty(false);
            }
        }
        catch (error) {
            console.error('Form submission error:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    }, [controller, validate, isSubmitting, options]);
    const reset = useCallback(() => {
        controller.actions.reset();
        setErrors({});
        setIsDirty(false);
        submitCountRef.current = 0;
    }, [controller]);
    return Object.assign(Object.assign({}, controller), { formState: {
            errors,
            isSubmitting,
            isDirty,
            submitCount: submitCountRef.current,
            isValid: Object.keys(errors).length === 0
        }, formActions: {
            submit,
            reset,
            validate,
            setErrors
        } });
}
// Theme controller for managing theme state
export function useThemeController(initialTheme) {
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
export function useListController(items, options) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);
    const controller = useController({
        sortBy: (options === null || options === void 0 ? void 0 : options.sortBy) || null,
        sortOrder: (options === null || options === void 0 ? void 0 : options.sortOrder) || 'asc',
        filter: (options === null || options === void 0 ? void 0 : options.filter) || null,
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
        if (!controller.state.sortBy)
            return 0;
        const aValue = a[controller.state.sortBy];
        const bValue = b[controller.state.sortBy];
        if (aValue === bValue)
            return 0;
        const comparison = aValue < bValue ? -1 : 1;
        return controller.state.sortOrder === 'desc' ? -comparison : comparison;
    });
    // Pagination
    const itemsPerPage = (options === null || options === void 0 ? void 0 : options.itemsPerPage) || 10;
    const totalPages = Math.ceil(processedItems.length / itemsPerPage);
    const paginatedItems = processedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const toggleSelection = useCallback((item) => {
        setSelectedItems(prev => prev.includes(item)
            ? prev.filter(i => i !== item)
            : [...prev, item]);
    }, []);
    const selectAll = useCallback(() => {
        setSelectedItems(paginatedItems);
    }, [paginatedItems]);
    const clearSelection = useCallback(() => {
        setSelectedItems([]);
    }, []);
    return Object.assign(Object.assign({}, controller), { listState: {
            items: processedItems,
            paginatedItems,
            currentPage,
            totalPages,
            selectedItems,
            isAllSelected: paginatedItems.length > 0 && paginatedItems.every(item => selectedItems.includes(item)),
            isPartiallySelected: selectedItems.length > 0 && !paginatedItems.every(item => selectedItems.includes(item))
        }, listActions: {
            setCurrentPage,
            toggleSelection,
            selectAll,
            clearSelection,
            setFilter: (filter) => controller.actions.update({ filter }),
            setSortBy: (sortBy) => controller.actions.update({ sortBy }),
            toggleSortOrder: () => controller.actions.update({
                sortOrder: controller.state.sortOrder === 'asc' ? 'desc' : 'asc'
            }),
            setSearchQuery: (searchQuery) => controller.actions.update({ searchQuery })
        } });
}
// Controller factory for creating custom controllers
export function createController(initialState, middleware) {
    return function useCustomController(options) {
        const [state, setState] = useState(initialState);
        const update = useCallback((updates) => {
            setState(prevState => {
                let newState = Object.assign(Object.assign({}, prevState), updates);
                // Apply middleware
                if (middleware) {
                    for (const middlewareFn of middleware) {
                        const result = middlewareFn(newState, updates);
                        if (result) {
                            newState = Object.assign(Object.assign({}, newState), result);
                        }
                    }
                }
                // Validate new state
                if ((options === null || options === void 0 ? void 0 : options.onValidate) && !options.onValidate(newState)) {
                    console.warn('State validation failed, not updating');
                    return prevState;
                }
                return newState;
            });
        }, [options === null || options === void 0 ? void 0 : options.onValidate]);
        const reset = useCallback(() => {
            setState(initialState);
        }, [initialState]);
        return {
            state,
            actions: { update, reset },
            hooks: {
                onChange: options === null || options === void 0 ? void 0 : options.onChange,
                onValidate: options === null || options === void 0 ? void 0 : options.onValidate
            }
        };
    };
}
//# sourceMappingURL=controller.js.map