export interface ICategoryEntity {
    uuid: string;
    title: string;
    description: string;
}

export interface ICategoryProps {
    title?: string | null;
    description?: string | null;
}
