import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import App from "../App";
import { SignIn, SignUp, Main, Category, Products, Workers, Single } from "@pages";

const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Main />}>
            <Route index element={<Category />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Single />} />
            <Route path="/workers" element={<Workers />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default Index;
