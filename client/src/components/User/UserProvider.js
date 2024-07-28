import { useEffect, useState } from "react";
import { loginService } from "../../services";
import UserContext from "./UserContext";


const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const userName = localStorage.getItem("userName");
    const password = localStorage.getItem("password");
    if (userToken) {
      setUser({ userToken, userName, password });
    }
  }, []);

  const userLogin = (user) => {
    return new Promise((resolve, reject) => {
      loginService(user).then((response) => {
        if (response.loginStatus === "ok") {
          localStorage.setItem("userToken", response.userToken);
          localStorage.setItem("userName", response.name);
          localStorage.setItem("_id", response._id);
          localStorage.setItem("role", response.role);
          setUser({ userToken: response.userToken, userName: response.name, _id: response._id, role: response.role });
          resolve(response.data);
        }
        if (response.loginStatus === "unknown") {
          reject(new Error("unknown user"));
        }
      });
    });
  };

  return (
    <UserContext.Provider value={{ user, userLogin }}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserProvider;
