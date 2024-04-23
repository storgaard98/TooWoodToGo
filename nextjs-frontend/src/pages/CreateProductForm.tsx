import { useState } from 'react';

const CreateProductForm = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Product created successfully');
        // Reset form fields
        setFormData({});
      } else {
        console.error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="id" placeholder="Product ID" onChange={handleChange} />
      <input type="text" name="name" placeholder="Product Name" onChange={handleChange} />
      <input type="text" name="description" placeholder="Product Description" onChange={handleChange} />
      <input type="number" name="price" placeholder="Product Price" onChange={handleChange} />
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProductForm;
