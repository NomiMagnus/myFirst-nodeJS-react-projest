import React from "react"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProductsService } from "../../services"
import Button from "@mui/material/Button";
import Product from "../../components/Product";

// import UserContext from "../../components/User/UserContext";

const Store = () => {
    const [products, setProducts] = useState([])
    // const { user } = useContext(UserContext);
    const navigate = useNavigate()

    useEffect(() => {
        if(products)
            showProducts()
    }, [products])

    const showProducts = () => {
        getAllProductsService().then(res => setProducts(res.data))
    }
  let arrProducts = products &&  products.length > 0 && products.map((item, i) =>item._id &&  <Product key={i} item={item}></Product>)

    return (
    <>
        <h1>Welcome to the toy store!!!</h1>
        <br />
        {localStorage.getItem("role") === 'User' && (<Button onClick={() => { navigate("/Store/Cart") }}>Go Shopping!</Button>)}
        <br />
        {localStorage.getItem("role") === 'Admin' && (<Button onClick={() => { navigate("/Store/Add") }}>Add</Button>)}
        <br />
      {<div style={{ display: "flex" }}>{arrProducts ? arrProducts : "Add new products"}</div>}
        
    </>)
}

export default Store