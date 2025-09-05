import { createContext } from 'react'
import productsData from './data.json'

import noImage from './assets/images/default.webp'

const images = import.meta.glob('./assets/images/*.{jpg,webp}',
    { eager: true, query: '?url', import: 'default' }
); // import images (Vite)

const products = productsData.map(product => {

    const image = Object.entries(images).find(([path]) =>
        path.includes(`${product.id}.`)
    );
    return {
        ...product, image: image ? image[1] : noImage
    };
}).sort(() => Math.random() - 0.5);

const ProductsContext = createContext([]);

function ProductsProvider({ children }) {

    return (
        <ProductsContext.Provider value={products}>
            {children}
        </ProductsContext.Provider>
    );
}
export { ProductsProvider, ProductsContext }