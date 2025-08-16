import { useState } from 'react';

const images = import.meta.glob('./assets/*.{jpg,jpeg}',
    { eager: true } // import images (Vite)
);
const shuffle = (order) => {
    return order.slice().sort(() => Math.random() - 0.5);
};

function Card({ selectCard }) {

    const [cardOrder, setCardOrder] = useState(() => {
        return shuffle(Object.entries(images));
    });

    const handleClick = (card) => {
        selectCard(card);
        setCardOrder(shuffle(cardOrder));
    };

    return (
        cardOrder.map(([path, src]) => {
            const fileName = path.split('/').pop();
            return (
                <div className="card" key={fileName}
                    onClick={() => handleClick(fileName)}>
                    <img src={src.default ?? src} alt={fileName} />
                </div>
            );
        })
    );
} export default Card