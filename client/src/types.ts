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
    createdAt: Date;
    details?: string;
}

export interface Todo {
    id: number;
    category: CategoryType;
    isComplete: boolean;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    body?: string;
}