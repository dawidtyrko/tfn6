import React, {useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import productsData from '../../data/products.json';
const ProductSchema = Yup.object().shape({
    name: Yup.string().min(3,"Minimum 3 characters").required(),
    category: Yup.string().required(),
    amount: Yup.number().positive().required(),
    unitPrice: Yup.number().positive().required(),
    supplier: Yup.string().min(3,"Minimum 3 characters").required()
})

const ProductForm = ({onAddProduct,onUpdateProduct,editProducts})=>{
    console.log(editProducts);
    let initialValues = editProducts || {
        name: "",
        category: "",
        amount: "",
        unitPrice: "",
        supplier: "",
    };
    const categories = Array.from(new Set(productsData.map((product) => product.category)));

    const handleSubmit = (values, { resetForm }) => {
        if (editProducts) {
            onUpdateProduct({ ...editProducts, ...values }); // Update product
        } else {
            const newProduct = { ...values, dateAdded: new Date().toISOString()}; // Add new product
            onAddProduct(newProduct);
        }
        resetForm();
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ProductSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form className="form">
                    <div>
                        <label htmlFor="name">Name:</label>
                        <Field name="name" type="text" />
                        <ErrorMessage name="name" component="div" style={{ color: "red" }} />
                    </div>
                    <div>
                        <label htmlFor="category">Category:</label>
                        <Field as="select" name="category">
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="category" component="div" style={{ color: "red" }} />
                    </div>
                    <div>
                        <label htmlFor="amount">Amount:</label>
                        <Field name="amount" type="number" />
                        <ErrorMessage name="amount" component="div" style={{ color: "red" }} />
                    </div>
                    <div>
                        <label htmlFor="unitPrice">Unit Price:</label>
                        <Field name="unitPrice" type="number" step="0.01" />
                        <ErrorMessage name="unitPrice" component="div" style={{ color: "red" }} />
                    </div>
                    <div>
                        <label htmlFor="supplier">Supplier:</label>
                        <Field name="supplier" type="text" />
                        <ErrorMessage name="supplier" component="div" style={{ color: "red" }} />
                    </div>
                    <button type="submit" style={{ marginTop: "10px", width:"100px" }}>
                        {editProducts ? "Update product" : "Add Product"}
                    </button>
                </Form>
            )}
        </Formik>
    );
}
export default ProductForm;