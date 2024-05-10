const { getAllProducts, addProduct, updateProduct, deleteProduct, acceptPrice, rejectPrice, setPrice } = require("./db");



describe("API Tests", () => {
  beforeEach(() => {
    // Mock the fetch function
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );
  });


  test("getAllProducts should call fetch with the correct endpoint", async () => {
    await getAllProducts();
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:9000/api/products",
      undefined
    );
  });

  test("addProduct should call fetch with the correct endpoint and options", async () => {
    const productData = {
      title: "Product Title",
      description: "Product Description",
      quantity: "10",
      productId: "123",
    };
    await addProduct(productData);
    expect(fetch).toHaveBeenCalledWith("http://localhost:9000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
  });

  test("updateProduct should call fetch with the correct endpoint, productId, and options", async () => {
    const productId = "123";
    const productData = {
      title: "Updated Product Title",
      description: "Updated Product Description",
      quantity: "20",
      productId: "123",
    };
    await updateProduct(productId, productData);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:9000/api/products/123",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );
  });

  test("deleteProduct should call fetch with the correct endpoint and options", async () => {
    const productId = "123";
    await deleteProduct(productId);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:9000/api/products/123",
      {
        method: "DELETE",
      }
    );
  });

  test("acceptPrice should call fetch with the correct endpoint and options", async () => {
    const productId = "123";
    await acceptPrice(productId);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:9000/api/products/123/acceptPrice",
      {
        method: "PUT",
      }
    );
  });

  test("rejectPrice should call fetch with the correct endpoint and options", async () => {
    const productId = "123";
    await rejectPrice(productId);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:9000/api/products/123/rejectPrice",
      {
        method: "PUT",
      }
    );
  });

  test("setPrice should call fetch with the correct endpoint, productId, price, and options", async () => {
    const productId = "123";
    const price = 9.99;
    await setPrice(productId, price);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:9000/api/products/123/setPrice",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      }
    );
  });
});
