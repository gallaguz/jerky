export interface IRawEntity {
    uuid: string;
    title: string;
    description: string;
    price: number;
    categoryUuid: string;
}

export interface IRawProps {
    title?: string | null;
    description?: string | null;
    price?: number | null;
    categoryUuid?: string | null;
}
