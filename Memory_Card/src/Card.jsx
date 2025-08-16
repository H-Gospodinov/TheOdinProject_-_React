import { useState } from 'react';

const images = import.meta.glob('./assets/*.{jpg,jpeg}',
    { eager: true } // import images (Vite)
);
const shuffle = (order) => {
    let arr = order.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr; // random order
};

function Card({ onClick }) {

    const [cardOrder, setCardOrder] = useState(() => {
        return shuffle(Object.entries(images));
    });

    const handleClick = () => {
        setCardOrder(shuffle(cardOrder));
    };

    return (
        cardOrder.map(([path, src]) => {
            const fileName = path.split('/').pop();
            return (
                <div className="card" id={fileName} key={fileName}
                    onClick={() => handleClick()}>
                    <img src={src.default ?? src} alt={fileName} />
                </div>
            );
        })
    );
} export default Card