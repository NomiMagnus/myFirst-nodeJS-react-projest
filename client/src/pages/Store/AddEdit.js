import { useEffect, useState } from "react"
import Input from "@mui/material/Input"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useLocation, useNavigate } from "react-router-dom"
import { addNewProductService, updateProductService } from '../../services'
import { style } from "@mui/system"

const AddEdit = () => {
    const location = useLocation();
    let prod = location.state
    const navigate = useNavigate()
    const [newName, setNewName] = useState(prod ? prod.name : "")
    const [newPrice, setNewPrice] = useState(prod ? prod.price : 1)
    const [newPicture, setNewPicture] = useState(prod ? prod.picture : "nopicture.png")
    const [newAgeMatch, setNewAgeMatch] = useState(prod ? prod.ageMatch : [0, 120])
    const [newCategory, setNewCategory] = useState(prod ? prod.category : "Box")
    const [newDescription, setNewDescription] = useState(prod ? prod.description : "")
    const [newDeliverPrice, setNewDeliverPrice] = useState(prod ? prod.deliverPrice : 0)

    useEffect(() => setProperties(), [])

    const add = () => {
        //add new product to the store.
        addNewProductService({ newName, newPrice, newPicture, newAgeMatch, newCategory, newDescription, newDeliverPrice })
        navigate("/Store")
    }

    const edit = () => {
        //edit a product in the store.
        //check validations:
        if (newName==="") {
            console.log("Name is required!")//////////////////////////////////validation
        }
        const _id = prod._id
        updateProductService({ _id, newName, newPrice, newPicture, newAgeMatch, newCategory, newDescription, newDeliverPrice })
        navigate('/Store')
    }

    const checkType = () => {
        //check if we got a product to edit or we have to create a new one.
        prod ? edit() : add();
    }
    const setProperties = () => {
        if (prod) {
            setNewName(prod.name)
            setNewPrice(prod.price)
            setNewPicture(prod.picture)
            setNewAgeMatch(prod.ageMatch)
            setNewCategory(prod.category)
            setNewDescription(prod.description)
        }
    }
    return (
        <>
        {/*returns a setted product*/}
            <h4>name</h4>
            <Input defaultValue={newName} onChange={(e) => setNewName(e.target.value)}></Input>

            <h4>price</h4>
            <Input type="number" defaultValue={newPrice} onChange={(e) => setNewPrice(e.target.value)}></Input>

            <h4>deliver price</h4>
            <Input type="number" defaultValue={newDeliverPrice} onChange={(e) => setNewDeliverPrice(e.target.value)}></Input>

            <h4>category</h4>
            <Input defaultValue={newCategory} onChange={(e) => setNewCategory(e.target.value)}></Input>

            <h4>age match</h4>
            <Input type="number" style={{ width: "5%" }} defaultValue={newAgeMatch[0]} onChange={(e) => setNewAgeMatch([e.target.value, newAgeMatch[1]])}></Input>
            <span>   -   </span>
            <Input type="number" style={{ width: "5%" }} defaultValue={newAgeMatch[1]} onChange={(e) => setNewAgeMatch([newAgeMatch[0], e.target.value])}></Input>

            <h4>description</h4>
            <TextField maxLength={100} defaultValue={newDescription} onChange={(e) => setNewAgeMatch([newAgeMatch[0], e.target.value])}></TextField>

            <h4>picture</h4>
            <Input id="pic" defaultValue={newPicture} onChange={(e) => { setNewPicture(e.target.value) }}></Input>
            <br />
            <img style={{width:"10%"}} src={`http://localhost:3000/${newPicture}` }></img>
            <br></br>
            <br></br>
            <Button onClick={checkType}>save</Button>
            <Button onClick={() => { navigate("/Store") }}>cancel</Button>
        </>
    )
}
export default AddEdit