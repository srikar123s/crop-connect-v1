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
        setCartItems(prevItems => {
            const itemExists = prevItems.find(cartItem => cartItem.id === item.id);
            if (itemExists) {
                return prevItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    // Function to adjust item quantity
    const changeQuantity = (id, amount) => {
        setCartItems(prevItems => {
            return prevItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + amount } : item
            ).filter(item=>item.quantity>0);
        });
    };

    // Function to remove items from cart
    const removeItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Function to clear the cart
    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, changeQuantity, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
