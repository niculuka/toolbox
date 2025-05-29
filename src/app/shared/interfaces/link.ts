export interface Link {
    label: string;
    url?: string;
    cols?: string;
    view?: string;
    external?: boolean;
    target?: '_self'|'_blank';
}
