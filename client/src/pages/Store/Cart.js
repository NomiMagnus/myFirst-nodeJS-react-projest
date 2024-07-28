import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { getCartsByUserService, updateCountService, deleteCartProdByIDService } from "../../services"
import Product from "../../components/Product";

const Cart = () => {
  const [carts, setCarts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getCartsByUserService().then(res => setCarts(res.data))
  }, [carts])

  const logOut = () => {
    localStorage.clear()
    navigate("/Login")
  }

  // const empty = () => arrCarts ? <h2>You still not push products to your cart</h2> : <></>

  const updateCount = (productId, amount) => {
    if (amount >= 1) {
      updateCountService(productId, amount)
      navigate("/Store/Cart")
    }
    else {
      alert("Amount is less than 1.")
    }
  }

  let arrCarts = carts && carts.length > 0 && carts.map((item) =>
    <span> {item.productId && <Product  item={{
      name: item.productId.name,
      price: item.productId.price,
      picture: item.productId.picture,
      ageMatch: item.productId.ageMatch,
      category: item.productId.category,
      description: item.productId.description,
      amount: item.productId.amount
    }}></Product>}

      <h3 id={item._id}>Amount: {item.amount} </h3>
      <Button onClick={() => updateCount(item.productId, item.amount + 1)}> + </Button>
      <Button onClick={() => updateCount(item.productId, item.amount - 1)}> - </Button>
      <br />
      <Button onClick={() => { deleteCartProdByIDService(item._id); navigate("/Store/Cart") }}>Remove</Button>
    </span>)

  return (<>
    <Button onClick={() => logOut()}>Log out</Button>
    <h1>Hello {localStorage.getItem("userName")},</h1>
    <h2>here is your cart!</h2>
    <br />
    {/* {empty()} */}
    <Button onClick={() => { navigate("/Store") }}>Continue Shopping!</Button>
    <br />

    <div style={{ display: "flex" }}>{arrCarts ? arrCarts : <div>
      <h2>You still not push products to your cart</h2>
      <h3>Buy new products to see them  here.</h3>
    </div>}</div>
  </>)
}

export default Cart