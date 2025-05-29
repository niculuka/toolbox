import { Brand } from './brand';
import { Category } from './category';
import { CustomFields } from './custom-fields';

export interface ProductFeature {
    name: string;
    value: string;
}

export interface ProductFeaturesSection {
    name: string;
    features: ProductFeature[];
}



export interface ProductAttributeValue {
    name: string;
    slug: string;
    customFields: CustomFields;
}

export interface ProductAttribute {
    name: string;
    slug: string;
    featured: boolean;
    values: ProductAttributeValue[];
    customFields: CustomFields;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    categories: string[];
    brand: string;
    price: number;
    oldPrice: number | null;
    badges: string;
    rating: number;
    reviews: number;
    availability: string;
    colors: string[];
    attributes: ProductAttribute[];
    images: string[];
    small_images: string[];
}

export class MyProduct {
    id: number = 0;
    name: string = "";
    slug: string = "";
    description: string = "";
    categories: string[] = [];
    brand: string = "";
    price: number = 0;
    oldPrice: number | null = null;
    badges: string = "";
    rating: number = 0;
    reviews: number = 0;
    availability: string = "";
    colors: string[] = [];
    attributes: ProductAttribute[] = [];
    images: string[] = [];
    small_images: string[] = [];
}
