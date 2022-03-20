import {iCategory} from "./Interfaces";

export class Category {

    id?: string;
    name?: string;

    constructor() {

    }

    async getCategories(id?: string) : Promise<Category[]> {

        const result = await fetch("https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/", {  method: "GET" });
        const items = await result.json();

        let array: Category[] = [];
        array.push({
            id: undefined,
            name: "all"
        } as Category);
        items.map((item: iCategory) => {
            array.push({
                id: item.id,
                name: item.name
            } as Category);
        })

        return array;
    }

}