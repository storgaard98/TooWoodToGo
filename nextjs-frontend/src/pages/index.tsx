// pages/index.tsx
import React from "react";
import ValidateUserForm from "./ValidateUserForm";
import CreateUserForm from "./CreateUserForm";
import CreateProductForm from "./CreateProductForm";
import DeleteProductForm from "./DeleteProductForm";

const HomePage = () => {
    return (
      <div>
        <h1>Welcome to My Next.js App</h1>
        <p>This is the homepage of my Next.js application.</p>
        <ValidateUserForm/>
        <CreateUserForm/>
        <CreateProductForm/>
        <DeleteProductForm productId={""}/>
        
      </div>
    );
  };
  
  export default HomePage;
   