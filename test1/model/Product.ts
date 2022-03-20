import {iAddProduct, iCategory, iProduct} from "./Interfaces";

export class Product {

    name?: string;
    avatar?: string;
    description?: string;
    price?: number;
    category?: string;
    id?: string;

    constructor() {

    }

    async getProducts(id?: string) : Promise<Product[]> {

        const result = await fetch("https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/", {  method: "GET" });
        let items = await result.json();

        let array: Product[] = [];
        items.map((item: iProduct) => {
            let p = {
                name: item.name,
                avatar: item.avatar,
                description: item.description,
                price: item.price,
                category: item.category,
                id: item.id,
            } as Product;

            if (id == undefined || id == "all" || id == p.category) {
                array.push(p);
            }
        })

        return array;
    }

    async deleteProduct(id?: string) : Promise<Product> {

        const result = await fetch("https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/" + id, {  method: "DELETE" });
        const item: Promise<Product> = await result.json();

        return item;
    }

    async addProduct(item: iAddProduct) : Promise<Product> {

        const result = await fetch("https://62286b649fd6174ca82321f1.mockapi.io/case-study/products", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    Name: item.Name,
                    Price: item.Price,
                    Category: item.Category,
                    Description: item.Description,
                    Image: item.Image,
                    DeveloperEmail: item.DeveloperEmail,
                    name: item.Name,
                    avatar: item.Image,
                    description: item.Description,
                    price: item.Price,
                    category: item.Category
                })
        });
        const i: Promise<Product> = await result.json();

        return i;
    }


}