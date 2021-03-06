import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
`

const Products = ({category, filters, sort}) => {
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    console.log(category, filters, sort)
    console.log(filterProducts)
    console.log(products)

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(category ? `http://localhost:5000/api/products?category=${category}` : "http://localhost:5000/api/products");
                setProducts(res.data);
                console.log(res)
            } catch (err) {

            }
        };
        getProducts();
    }, [category]);

    useEffect(() => {
        category && 
            setFilterProducts(
                products.filter((item) => 
                    Object.entries(filters).every(([key, value]) => 
                        item[key].includes(value)
                    )
                )
            )
    }, [products, filters, category]);

    useEffect(() => {
    if (sort === "newest") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    } else {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    }
  }, [sort]);


    return (

        <Container>
            {
                category ? filterProducts.map((item) => (
                    <Product item={item} key={item.id} />
                ))
                : products.map((item) => (
                    <Product item={item} key={item.id} />
                ))
            }
        </Container>
    );
};

export default Products;