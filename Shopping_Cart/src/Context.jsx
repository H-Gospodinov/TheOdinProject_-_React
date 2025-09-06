import { createContext } from 'react'
import catalogData from './data.json'

import noImage from './assets/images/default.webp'

const images = import.meta.glob('./assets/images/*.{jpg,webp}',
    { eager: true, query: '?url', import: 'default' }
); // import images (Vite)

const imageMap = Object.fromEntries(
    Object.entries(images).map(([path, url]) => [
        path.split('/').pop().split('.')[0], url])
);
const categorySet = new Set();

// map products and categories

const products = catalogData.map(product => {
    categorySet.add(product.category);
    return {
        ...product, image: imageMap[product.id] || noImage,
    }
}).sort(() => Math.random() - 0.5);

const categories = [...categorySet].map(category => ({
    name: category,
    image: imageMap[category] || noImage,
})).sort(() => Math.random() - 0.5);

// provide content globally

const ContentContext = createContext({
    products: [],
    categories: [],
});

function ContentProvider({ children }) {
    return (
        <ContentContext.Provider value={{ products, categories }}>
            {children}
        </ContentContext.Provider>
    );
}
export { ContentContext, ContentProvider }