export interface IProductEntity {
    uuid: string;
    title: string;
    description: string;
    price: number;
}

export interface IProductProps {
    title?: string | null;
    price?: number | null;
    description?: string | null;
}
