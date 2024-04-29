import React, { useState, ChangeEvent, FormEvent } from 'react';



interface DeleteProductFormState  {
    productId: string;
}

// Define the prop types
interface DeleteProductFormProps {
    nodeUrl: string | undefined;
}
type Props = DeleteProductFormProps & DeleteProductFormState;

    const DeleteProductForm: React.FC<Props> = ({ nodeUrl}) => {
        const [productId, setProductId] = useState<string>('');


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProductId(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${nodeUrl}/products/${productId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Product deleted successfully');
                // Reset form fields
                setProductId('');
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="productId" placeholder="Product ID" value={productId} onChange={handleChange} />
            <button type="submit">Delete Product</button>
        </form>
    );
};

export default DeleteProductForm;
