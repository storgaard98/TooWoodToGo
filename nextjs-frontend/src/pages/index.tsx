// pages/index.tsx
import React from "react";
import ValidateUserForm from "./ValidateUserForm";
import CreateUserForm from "./CreateUserForm";
import CreateProductForm from "./CreateProductForm";
import DeleteProductForm from "./DeleteProductForm";

const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL;


const HomePage = () => {
  const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL;
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <p>This is the homepage of my Next.js application.</p>
      <ValidateUserForm  nodeUrl={nodeUrl}/>
      <CreateUserForm nodeUrl={nodeUrl}/>
      <CreateProductForm />
      <DeleteProductForm productId={""} nodeUrl={nodeUrl} />
    </div>
  );
};


export default HomePage;
