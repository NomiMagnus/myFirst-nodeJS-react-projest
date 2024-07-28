import { useState } from "react";
import styles from "./Register.module.css";
import { registerService } from "../../services";
import Input from "@mui/material/Input"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom";



const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate()

  const register = () => {
    registerService({ firstName, lastName, email, phone, userName, password })
  };

  return (
    <div className={styles.registerWrapper}>
      <Input placeholder="First name" defaultValue={""} onBlur={(e) => setFirstName(e.target.value)}></Input>
      <Input placeholder="Last name" defaultValue={""} onBlur={(e) => setLastName(e.target.value)}></Input>
      <Input placeholder="Email" defaultValue={""} onBlur={(e) => setEmail(e.target.value)}></Input>
      <Input placeholder="Phone" defaultValue={""} onBlur={(e) => setPhone(e.target.value)}></Input>
      <Input placeholder="User name" defaultValue={""} onBlur={(e) => setUserName(e.target.value)}></Input>
      <Input placeholder="Password" defaultValue={""} onBlur={(e) => setPassword(e.target.value)}></Input>

      <Button onClick={() => { register(); navigate("/Login") }}>Register</Button>
    </div>
  );
};

export default Register;
