// import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import '../pages/Store/Store.css'
import { useNavigate } from "react-router-dom";
import { DeleteProductService, AddToCartService } from '../services'

const Product = (props) => {
    const navigate = useNavigate()

    return (
        <>
            <div className="prods" >
                <img className="img" src={'http://localhost:3000/' + props.item.picture} alt="prodPic" ></img>
                <br />
                <h2 className="name">{props.item.name}</h2>
                <h4 className="description">
                    Age match: {props.item.ageMatch[0]} - {props.item.ageMatch[1]},
                    Category: {props.item.category}
                </h4>
                <h5>{props.item.description}</h5>
                <h3 className="price">Price: {props.item.price}</h3>
                <h3 className="deliverPrice">deliverPrice: {props.item.deliverPrice}</h3>

                {localStorage.getItem("role") === 'Admin' && (<> <Button onClick={() => navigate("/Store/Edit", {
                    state: {
                        _id: props.item._id,
                        name: props.item.name,
                        price: props.item.price,
                        picture: props.item.picture,
                        ageMatch: props.item.ageMatch,
                        category: props.item.category,
                        description: props.item.description,
                        deliverPrice: props.item.deliverPrice
                    }
                })}>Edit</Button>
                    <Button onClick={() => DeleteProductService(props.item._id)}>Delete</Button>
                </>)}
                {localStorage.getItem("role") === 'User' && !props.item.amount && (<Button onClick={() => { AddToCartService(props.item._id) }}>🛒</Button>)}
            </div >
            <br />
        </>
    )
}
export default Product;