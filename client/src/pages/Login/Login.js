import { useContext, useState } from "react";
import UserContext from "../../components/User/UserContext";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import {Box,Paper} from '@mui/material/';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { userLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const login = () => {
    if (!userName || !password) {
      return;
    }
    userLogin({ userName, password })
      .then(() => {
        navigate("/Store");
      })
      .catch((error) => {
        if (error.message === "unknown user") {
          navigate("/register");
        }
      });
  };

  return (
    <div className={styles.loginWrapper}>
          {/* <Box style={{zindex:999}}><Paper><h1>חלון צף</h1></Paper></Box> */}

      <Input
        placeholder="User name"
        onBlur={(e) => setUserName(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        onBlur={(e) => setPassword(e.target.value)}
      />
      <Button onClick={() => login()}>Login</Button>
    </div>
  );
};

export default Login;
