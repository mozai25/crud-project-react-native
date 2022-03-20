import {Category} from "./Category";

export interface iCategoryItem {
    item: Category,
    callback: (i: iClickCategory)=>{},
}

export interface iAddProduct {
    Name: string,
    Price: number,
    Category: string,
    Description: string,
    Image: string,
    DeveloperEmail: string,
}

export interface iProduct {
    name: string;
    avatar: string;
    description: string;
    price: number;
    category: string;
    id: string;
}

export interface iDeleteProduct {
    id?: string
}

export interface iCategory {
    name: string,
    id: string,
}

export interface iClickCategory {
    id?: string
}

export interface ClickFunc {
    done: boolean
}

export interface HelloInterfaceFromAndroid {
    [index: number]: { action: string }
}

