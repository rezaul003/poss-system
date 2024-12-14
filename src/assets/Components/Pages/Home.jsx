import React, { useState } from 'react';
import Swal from 'sweetalert2';
import HeadBAr from './HeadBAr';
import Products from './Products';
import Cart from './Cart';
import BottomBar from './BottomBar';

const Home = () => {
    const [cartItems, setCartItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState("DIVERSE PRODUKTER"); // Set default category

    const addToCart = (product) => {
        setCartItems((prevCart) => {
            const existingItem = prevCart.find((item) => item.name === product.name);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.name === product.name
                        ? { ...item, quantity: item.quantity + 1, price: item.price + product.price }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const handleCancel = () => {
        setCartItems([]); // Clear cart
        console.log("Cart cleared");
    };

    const handlePay = () => {
        if (cartItems.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No Items in Cart',
                text: 'Please add items to your cart before proceeding with the payment.',
            });
            return;
        }

        // Calculate the total price (if needed)
        const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
        const totalItems = cartItems.length;

        // Order confirmation logic with SweetAlert
        Swal.fire({
            icon: 'success',
            title: 'Order Confirmed!',
            text: `You have ${totalItems} item(s) in your cart. Total: $${totalPrice.toFixed(2)}`,
            confirmButtonText: 'OK',
        }).then(() => {
            // Clear the cart after confirmation
            setCartItems([]);
        });
    };

    return (
        <div>
            <HeadBAr />
            <div className="bg-slate-200">
                <div className="flex p-2">
                    <Products addToCart={addToCart} activeCategory={activeCategory} />
                    <Cart cartItems={cartItems} />
                </div>
                <BottomBar onCancel={handleCancel} onPay={handlePay} setActiveCategory={setActiveCategory} />
            </div>
        </div>
    );
};

export default Home;
