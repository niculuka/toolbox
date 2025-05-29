export interface CategoryDef {
    name: string;
    slug: string;
    image?: string;
    items?: any;
    children?: CategoryDef[];
}
