// CartContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    // Save cart to localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Function to add items to cart
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            // Check if an item with the same ID exists in the cart
            const itemExists = prevItems.find((cartItem) => cartItem._id === item._id);
            if (itemExists) {
                // If the item exists, increase the quantity only for the matched item
                return prevItems.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // If the item is new, add it to the cart with quantity set to 1
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };    
    
    // Function to adjust item quantity
    const changeQuantity = (id, amount) => {
        setCartItems(prevItems => {
            return prevItems.map(item =>
                item._id === id ? { ...item, quantity: item.quantity + amount } : item
            ).filter(item=>item.quantity>0);
        });
    };

    // Function to remove items from cart
    const removeItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== id));
    };

    // Function to clear the cart
    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, changeQuantity, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
