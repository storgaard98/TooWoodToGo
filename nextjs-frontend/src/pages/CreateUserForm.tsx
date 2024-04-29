import { useState } from 'react';

interface createUserFormProps {
  // Add props here
  nodeUrl: string | undefined;
}

const CreateUserForm = ({ nodeUrl }: createUserFormProps) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Creating user:', formData);
    try {
      const response = await fetch(`api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('User created successfully');
        // Reset form fields
        setFormData({});
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
