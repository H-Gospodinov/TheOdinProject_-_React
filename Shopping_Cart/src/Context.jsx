import { createContext } from 'react'
import productsData from './data.json'

import noImage from './assets/images/default.webp'

const images = import.meta.glob('./assets/images/*.{jpg,webp}',
    { eager: true, query: '?url', import: 'default' }
); // import images (Vite)

const imageMap = Object.fromEntries(
    Object.entries(images).map(([path, url]) => [
        path.split('/').pop().split('.')[0], url
    ])
);
const products = productsData.map(product => ({
    ...product,
    image: imageMap[product.id] || noImage,
})).sort(() => Math.random() - 0.5);

const ProductsContext = createContext([]);

function ProductsProvider({ children }) {
    return (
        <ProductsContext.Provider value={products}>
            {children}
        </ProductsContext.Provider>
    );
}
export { ProductsContext, ProductsProvider }