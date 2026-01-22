// Assigning type options to const array facilitates runtime validation
export const CAT_TYPES = [ 
    'work',
    'family',
    'exercise',
    'housework',
    'cooking',
    'study',
    'lifestyle'
];

export type CategoryType = (typeof CAT_TYPES)[number];

export interface Category {
    id: number;
    type: CategoryType;
    name: string;
    createdAt: Date|string;
    details?: string;
}

export interface Todo {
    id: number;
    category: CategoryType;
    isComplete: boolean;
    createdAt: Date|string;
    updatedAt: Date|string;
    title: string;
    body?: string;
}