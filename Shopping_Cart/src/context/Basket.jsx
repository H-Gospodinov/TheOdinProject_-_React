import { createContext, useState, useEffect } from 'react'

const BasketContext = createContext();

function BasketProvider({ children }) {

    const [basket, setBasket] = useState(() => {
        const stored = sessionStorage.getItem('basket');
        return stored ? JSON.parse(stored) : []
    });

    useEffect(() => {sessionStorage
        .setItem('basket', JSON.stringify(basket));
    }, [basket]); // store in browser


    // add product to basket

    function insert(product, quantity) {
        setBasket(current => {
            const alreadyAdded = current.find(item => {
                return item.id === product.id
            });
            const newBasket = alreadyAdded ?
                current.map(item => item.id === product.id ?
                    // if already added -> increase quantity
                    { ...item, quantity: item.quantity + quantity } : item
                ) : [...current, { ...product, quantity }];
            return newBasket;
        });
    }
    // update product quantity

    function update(productId, quantity) {
        setBasket(current => (
            current.map(product => (
                product.id !== productId ? product
            : { ...product, quantity }))
        ));
    }
    // remove product(s) from basket

    function remove(productId) {
        setBasket(current => (
            productId ? current.filter(product => (
                product.id !== productId
            )) : [] // if no ID -> remove all
        ));
    }
    // provide basket data and tools

    return (
        <BasketContext.Provider
            value={{ basket, insert, update, remove }}
        > {children}
        </BasketContext.Provider>
    );
}
export { BasketContext, BasketProvider }