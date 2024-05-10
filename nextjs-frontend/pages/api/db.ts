// pages/api/db.ts

import { NextApiRequest, NextApiResponse } from 'next';

interface product {
    title: string;
    description: string
    quantity: string
    productId: string
}

const BACKEND_URL = 'http://localhost:9000'; // Change this to your backend URL

async function fetchFromBackend(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${BACKEND_URL}/api/${endpoint}`, options);
  const data = await response.json();
  return data;
}

export async function getAllProducts() {
  return fetchFromBackend('products');
}

export async function addProduct(productData: product) {
  return fetchFromBackend('products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
}

export async function updateProduct(productId: string, productData: product) {
  return fetchFromBackend(`products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
}

export async function deleteProduct(productId: string) {
  return fetchFromBackend(`products/${productId}`, {
    method: 'DELETE',
  });
}

export async function acceptPrice(productId: string) {
  return fetchFromBackend(`products/${productId}/acceptPrice`, {
    method: 'PUT',
  });
}

export async function rejectPrice(productId: string) {
  return fetchFromBackend(`products/${productId}/rejectPrice`, {
    method: 'PUT',
  });
}

export async function setPrice(productId: string, price: number) {
  return fetchFromBackend(`products/${productId}/setPrice`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ price }),
  });
}
