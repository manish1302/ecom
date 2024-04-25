import React, { Children, createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartUpdate, setCartUpdate] = useState(false);

    const toggleCartUpdate = () => {
        setCartUpdate(!cartUpdate);
    }

    return (
        <CartContext.Provider value={{cartUpdate, toggleCartUpdate}}>
            {children}
        </CartContext.Provider>
    )
 
}

export default CartContext