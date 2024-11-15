'use client'
import React, {ChangeEvent, useState} from 'react';
import productsData from '@/data/products.json'
import ProductForm from "@/app/products/ProductForm";

const ProductPage = ()=> {
    const categories = Array.from(new Set(productsData.map((product)=>product.category)))

    const [selectedCategory, setSelectedCategory] = useState("")
    const [products, setProducts] = useState(productsData)
    const [editProducts, setEditProducts] = useState(null)

    const handleChangeCategory = (e:any) => {
        setSelectedCategory(e.target.value)
    }
    const addProduct = (newProduct: { id: number; name: string; category: string; amount: number; unitPrice: number; dateAdded: string; supplier: string; })=>{
        setProducts((prevProducts)=>[...prevProducts, newProduct])
    }

    const updateProduct = (updatedProduct: any) => {
        setProducts((prevProducts)=> prevProducts.map((product)=>
            product.name === updatedProduct.name ? updatedProduct : product
        ))
        setEditProducts(null)
    }
    const handleEdit = (product: any)=>{
        setEditProducts(product)
    }

    return (
        <div style={{padding: "20px"}} className="products">
            <ProductForm onAddProduct={addProduct} onUpdateProduct={updateProduct} editProducts={editProducts} />

            <h1 style={{fontSize:"35px"}}>Products</h1>

            <label htmlFor="categories">Filter by Category:</label>
            <select
                id="categories"
                value={selectedCategory}
                onChange={handleChangeCategory}
            >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <h2 style={{padding:"20px"}}>Product List</h2>
            <ul>
                {products
                    .filter(
                        (product) => !selectedCategory || product.category === selectedCategory
                    )
                    .map((product, index) => (
                        <li key={index}>
                            <strong>{product.name}</strong> - {product.category} - {product.amount} units -
                            ${product.unitPrice}
                            <button onClick={() => handleEdit(product)} style={{marginLeft: "10px"}}>Edit</button>
                        </li>
                    ))}
            </ul>

        </div>
    )
}
export default ProductPage;
