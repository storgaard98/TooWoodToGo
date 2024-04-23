import { useState, ChangeEvent, FormEvent } from 'react';



interface DeleteProductFormState {
    productId: string;
}

const DeleteProductForm: React.FC<DeleteProductFormState> = () => {
    const [productId, setProductId] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProductId(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9000/api/products/${productId}`, {
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
