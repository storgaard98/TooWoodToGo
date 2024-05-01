
// pages/index.tsx
import React from "react";
import ValidateUserForm from "./components/ValidateUserForm";
import CreateUserForm from "./components/CreateUserForm";
import CreateProductForm from "./components/CreateProductForm";
import DeleteProductForm from "./components/DeleteProductForm";

import type { Metadata } from 'next'

import './globals.css'


// These styles apply to every route in the application

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
