import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./productList.css";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const base_image_url = "../../public/images/";
    const base_url = "https://localhost:7168/api/";
    const sectionRef = useRef(null);

    const handleCheckoutClick = () => {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const [client, setClient] = useState({
        Name: "",
        Surname: "",
        ClientEmail: "",
        AddressType: "Homeless",
        StreetAddress: "",
        Suburb: "",
        City: "",
        PostalCode: "",
    });

    const placeOrder = (newClientId, clientEmail, products, quantity) => {
        const order = {
            ClientId: newClientId,
            ClientEmail: clientEmail,
            Products: products,
            Quantity: quantity,
        };

        console.log(order);

        axios
            .post(base_url + "Order", order)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleInputChange = (event) => {
        setClient({
            ...client,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = async () => {
        axios
            .post(base_url + "Client", client)
            .then((response) => {
                const latestClientId = response.data.clientId;
                placeOrder(
                    latestClientId,
                    client.ClientEmail,
                    selectedProducts,
                    selectedProducts.length
                );
            })
            .catch((error) => {
                console.error(error);
                // handle error
            });

        alert(
            "Order has been created, Navigate to My orders to update or cancel the order"
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(base_url + "Product");
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleProductClick = (product) => {
        if (selectedProducts.includes(product.productId)) {
            setSelectedProducts(
                selectedProducts.filter((id) => id !== product.productId)
            );
        } else {
            setSelectedProducts([...selectedProducts, product.productId]);
        }
    };

    const removeFromCart = (index) => {
        setSelectedProducts(selectedProducts.filter((i) => i !== index));
        console.log(selectedProducts.length);
    };

    const cartItemsList = selectedProducts.map((selectedProductId) => {
        const product = products.find((p) => p.productId === selectedProductId);
        return (
            <li key={product.productId} className='cart-item'>
                <div className='cart-item-name'>
                    <span className='cart-product-name'>{product.name}</span>
                </div>
                <div className='cart-action'>
                    <button
                        className='btn remove-from-cart'
                        onClick={() => removeFromCart(product.productId)}
                    >
                        Remove
                    </button>
                </div>
            </li>
        );
    });

    const [isOpen, setIsOpen] = useState(false);
    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className='shop-container'>
                <h1>Shop</h1>
                <div className='shopping-cart'>
                    <div className='cart-section'>
                        <div className='cart-quantity'>
                            {" "}
                            You have{" "}
                            <span className='quantity-amount'>
                                {selectedProducts.length}
                            </span>{" "}
                            items in your shopping cart
                        </div>
                        <button
                            className=' btn cart-toggle'
                            onClick={toggleCart}
                        >
                            View my shopping cart
                        </button>
                    </div>
                    <div className={`cart-menu ${isOpen ? "open" : ""}`}>
                        <button
                            className='close-button'
                            onClick={() => setIsOpen(false)}
                        >
                            X
                        </button>
                        <h2 className='minicart-title'>Shopping Cart:</h2>
                        <ul id='cart-items'>{cartItemsList}</ul>
                        <div className='cart-actions'>
                            <button
                                className='btn checkout'
                                onClick={handleCheckoutClick}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
                <ul className='product-list'>
                    {products.map((product) => (
                        <li key={product.productId} className='product-row'>
                            <div className='product-item'>
                                <div className='product-info'>
                                    <h4>{product.name}</h4>
                                    <div className='product-image'>
                                        <img
                                            src={
                                                base_image_url +
                                                product.imageUrl
                                            }
                                            alt={product.name}
                                            width={200}
                                            height={150}
                                        />
                                    </div>
                                    <div className='product-details'>
                                        <span className='price'>
                                            {" "}
                                            R{product.price}
                                        </span>
                                        <span className='description'>
                                            {product.description}
                                        </span>
                                    </div>
                                    <div className='product-actions'>
                                        <button
                                            className='btn add-to-cart'
                                            onClick={() =>
                                                handleProductClick(product)
                                            }
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <div
                    id='checkoutForm'
                    ref={sectionRef}
                    className='checkout-form'
                >
                    <h1>{"Who's placing the order?"}</h1>
                    <form onSubmit={handleFormSubmit} className='form'>
                        <div className='form-group'>
                            <label htmlFor='Name'>Name:</label>
                            <div className='form-input'>
                                <input
                                    type='text'
                                    name='Name'
                                    value={client.Name || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='Surname'>Surname:</label>
                            <div className='form-input'>
                                {" "}
                                <input
                                    type='text'
                                    name='Surname'
                                    value={client.Surname || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='Email'>Email:</label>
                            <div className='form-input'>
                                {" "}
                                <input
                                    type='text'
                                    name='ClientEmail'
                                    value={client.ClientEmail || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='AddressType'>Address Type:</label>
                            <div className='form-input'>
                                <select
                                    name='AddressType'
                                    value={client.AddressType}
                                    onChange={handleInputChange}
                                >
                                    <option value='Homeless'>Homeless</option>
                                    <option value='Residential'>
                                        Residential
                                    </option>
                                    <option value='Commercial'>
                                        Commercial
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='StreetAddress'>
                                Street Address:
                            </label>
                            <div className='form-input'>
                                <input
                                    type='text'
                                    name='StreetAddress'
                                    value={client.StreetAddress || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='Suburb'>Suburb:</label>
                            <div className='form-input'>
                                <input
                                    type='text'
                                    name='Suburb'
                                    value={client.Suburb || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            {" "}
                            <label htmlFor='City'>City:</label>
                            <div className='form-input'>
                                <input
                                    type='text'
                                    name='City'
                                    value={client.City || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='PostalCode'>Postal Code:</label>
                            <div className='form-input'>
                                <input
                                    type='text'
                                    name='PostalCode'
                                    value={client.PostalCode || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='form-actions'>
                            <button className='btn form-submit' type='submit'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
