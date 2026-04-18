import { createContext, useState, useContext } from "react";
import { getProductById } from "../products/products";


const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(id) {    
        const existing = cartItems.find(item => item.id === id);

        if (existing) {
            
            const updatedCartItems = cartItems.map(item => item.id === id ? {id:item.id , quantity: item.quantity + 1} : {id: item.id, quantity: item.quantity});
            setCartItems(updatedCartItems);

        } else {
            
            setCartItems([...cartItems, {id:id, quantity: 1}]);
        }
    }

    function removeFromCart(id) {
        const existing = cartItems.find(item => item.id === id);
        if (existing.quantity === 1) {
            removeCompletelyFromCart(id);
            return;
        }
        if (existing) {
            
            const updatedCartItems = cartItems.map(item => item.id === id ? {id:item.id , quantity: item.quantity - 1} : {id: item.id, quantity: item.quantity});
            setCartItems(updatedCartItems);
        }   
    }

    function removeCompletelyFromCart(id) {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
    }

    function getCartItemswithDetails() {
        
        return cartItems.map(cartItem => (
            {...cartItem, product: getProductById(cartItem.id)}
        )).filter(item => item.product);
    }

    function emptyCart() {
        setCartItems([]);
    }


    function getTotalCartPrice() {
        const cartItemsWithDetails = getCartItemswithDetails();
        return cartItemsWithDetails.reduce((total, item) => total + (item ? item.product.price * item.quantity : 0), 0);
    }



    return (
        <CartContext.Provider value={{addToCart, removeFromCart, cartItems, getCartItemswithDetails, removeCompletelyFromCart, getTotalCartPrice, emptyCart}}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}