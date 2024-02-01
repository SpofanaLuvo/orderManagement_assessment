import { useState, useEffect } from "react";
import axios from "axios";
import "./orders.css";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [email, setEmail] = useState("");
    const [userOrders, setUserOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const base_url = "https://localhost:7168/api/";

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${base_url}Order`);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${base_url}Product`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching Products:", error);
            }
        };

        fetchOrders();
        fetchProducts();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredOrders = orders.filter(
            (order) => order.clientEmail === email
        );
        setUserOrders(filteredOrders);
    };

    const handleCheckboxChange = (productId) => {
        const updatedSelectedItems = selectedItems.includes(productId)
            ? selectedItems.filter((item) => item !== productId)
            : [...selectedItems, productId];
        setSelectedItems(updatedSelectedItems);
    };

    const handleUpdateOrder = async (
        orderId,
        clientId,
        clientEmail,
        products
    ) => {
        const currentProductsSet = new Set(selectedItems);
        const updatedProducts = products.filter(
            (item) => !currentProductsSet.has(item)
        );

        if (selectedItems.length > 0) {
            console.log(selectedItems);

            try {
                const updatedOrder = {
                    orderId: orderId,
                    clientId: clientId,
                    clientEmail: clientEmail,
                    products: updatedProducts,
                    quantity: selectedItems.length,
                };

                await axios.put(`${base_url}Order/${orderId}`, updatedOrder);

                alert("The Order has been updated");
                location.reload();
            } catch (error) {
                console.error("Error updating order:", error);
            }
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`${base_url}Order/${orderId}`);
            alert("The Order has been deleted");
            location.reload();
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    return (
        <div className='orders-container'>
            <div className='order-search'>
                <h4 className='orders-page-heading'>
                    Search for orders using your email:
                </h4>
                <form className='order-email-form' onSubmit={handleSubmit}>
                    <input
                        type='email'
                        id='email'
                        placeholder='Enter your email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className='btn order-search-button' type='submit'>
                        Search
                    </button>
                </form>
            </div>

            {userOrders && userOrders.length > 0 && (
                <ul className='orders-list'>
                    {userOrders.map((order) => (
                        <li className='orders-list-item' key={order.clientId}>
                            <div className='order-details'>
                                <p>Ordered Products:</p>
                                <ul>
                                    {order.products.map((productId) => {
                                        const product = products.find(
                                            (p) => p.productId === productId
                                        );

                                        return (
                                            <li
                                                key={productId}
                                                className='order-item'
                                            >
                                                <input
                                                    type='checkbox'
                                                    onChange={() => {
                                                        handleCheckboxChange(
                                                            productId
                                                        );
                                                    }}
                                                    checked={selectedItems.includes(
                                                        productId
                                                    )}
                                                />
                                                {product
                                                    ? `${product.name} - R${product.price}`
                                                    : "Product not found"}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div className='order-actions'>
                                <button
                                    className='btn-update'
                                    onClick={() =>
                                        handleUpdateOrder(
                                            order.orderId,
                                            order.clientId,
                                            order.clientEmail,
                                            order.products
                                        )
                                    }
                                >
                                    Update Order
                                </button>
                                <button
                                    className='btn-delete'
                                    onClick={() =>
                                        handleDeleteOrder(order.orderId)
                                    }
                                >
                                    Cancel Order
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
