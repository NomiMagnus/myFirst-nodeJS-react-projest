import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "../components/User/UserContext";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PageNotExist from "../pages/PageNotExist/PageNotExist";

import Store from "../pages/Store/Store";
import AddEdit from "../pages/Store/AddEdit"
import Cart from "../pages/Store/Cart"

const AppRoutes = () => {
  const authorizedRoutes = [{ path: "/store/:storeId", Component: Store }];

  const { user } = useContext(UserContext);

  
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      
      <Route path="/Store" element={<Store/>}></Route>
      <Route path="/Store/Edit" element={<AddEdit/>}></Route>
      <Route path="/Store/Add" element={<AddEdit/>}></Route>
      <Route path="/Store/Cart" element={<Cart/>}></Route>

      {authorizedRoutes.map((route) => {
        const userLoggedIn = !!user?.userToken;
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              userLoggedIn ? (
                <route.Component></route.Component>
              ) : (
                <Login></Login>
              )
            }
          />
        );
      })}
      <Route path="*" element={<PageNotExist />}></Route>
    </Routes>
  );
};

export default AppRoutes;
