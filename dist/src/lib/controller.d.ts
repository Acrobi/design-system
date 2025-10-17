/**
 * Architectural Standards: Controller Pattern for Complex Components
 *
 * This file implements the controller pattern for managing complex component state
 * following architectural standards with separation of concerns.
 */
import { ComponentController } from './types';
export declare function useController<T extends Record<string, any>>(initialState: T, options?: {
    onChange?: (state: T) => void;
    onValidate?: (state: T) => boolean;
    persistKey?: string;
}): ComponentController<T>;
export declare function useButtonController(initialState?: {
    loading?: boolean;
    disabled?: boolean;
    clicked?: boolean;
}): ComponentController<{
    loading: boolean;
    disabled: boolean;
    clicked: boolean;
}>;
export declare function useFormController<T extends Record<string, any>>(initialValues: T, options?: {
    onSubmit?: (values: T) => void | Promise<void>;
    onValidate?: (values: T) => Record<string, string> | null;
    resetOnSubmit?: boolean;
}): {
    formState: {
        errors: Record<string, string>;
        isSubmitting: boolean;
        isDirty: boolean;
        submitCount: number;
        isValid: boolean;
    };
    formActions: {
        submit: () => Promise<void>;
        reset: () => void;
        validate: (values: T) => boolean;
        setErrors: import("react").Dispatch<import("react").SetStateAction<Record<string, string>>>;
    };
    state: T;
    actions: {
        update: (updates: Partial<T>) => void;
        reset: () => void;
    };
    hooks: {
        onChange?: ((state: T) => void) | undefined;
        onValidate?: ((state: T) => boolean) | undefined;
    };
};
export declare function useThemeController(initialTheme?: string): ComponentController<{
    theme: string;
    resolvedTheme: string;
    isDark: boolean;
}>;
export declare function useListController<T>(items: T[], options?: {
    sortBy?: keyof T;
    sortOrder?: 'asc' | 'desc';
    filter?: (item: T) => boolean;
    itemsPerPage?: number;
}): {
    listState: {
        items: T[];
        paginatedItems: T[];
        currentPage: number;
        totalPages: number;
        selectedItems: T[];
        isAllSelected: boolean;
        isPartiallySelected: boolean;
    };
    listActions: {
        setCurrentPage: import("react").Dispatch<import("react").SetStateAction<number>>;
        toggleSelection: (item: T) => void;
        selectAll: () => void;
        clearSelection: () => void;
        setFilter: (filter: (item: T) => boolean) => void;
        setSortBy: (sortBy: keyof T) => void;
        toggleSortOrder: () => void;
        setSearchQuery: (searchQuery: string) => void;
    };
    state: {
        sortBy: keyof T | null;
        sortOrder: "desc" | "asc";
        filter: ((item: T) => boolean) | null;
        searchQuery: string;
    };
    actions: {
        update: (updates: Partial<{
            sortBy: keyof T | null;
            sortOrder: "desc" | "asc";
            filter: ((item: T) => boolean) | null;
            searchQuery: string;
        }>) => void;
        reset: () => void;
    };
    hooks: {
        onChange?: ((state: {
            sortBy: keyof T | null;
            sortOrder: "desc" | "asc";
            filter: ((item: T) => boolean) | null;
            searchQuery: string;
        }) => void) | undefined;
        onValidate?: ((state: {
            sortBy: keyof T | null;
            sortOrder: "desc" | "asc";
            filter: ((item: T) => boolean) | null;
            searchQuery: string;
        }) => boolean) | undefined;
    };
};
export declare function createController<T extends Record<string, any>>(initialState: T, middleware?: Array<(state: T, updates: Partial<T>) => Partial<T> | null>): (options?: {
    onChange?: (state: T) => void;
    onValidate?: (state: T) => boolean;
}) => {
    state: T;
    actions: {
        update: (updates: Partial<T>) => void;
        reset: () => void;
    };
    hooks: {
        onChange: ((state: T) => void) | undefined;
        onValidate: ((state: T) => boolean) | undefined;
    };
};
//# sourceMappingURL=controller.d.ts.map