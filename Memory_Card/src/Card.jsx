import { useState, useEffect } from 'react';

const images = import.meta.glob('./assets/*.{jpg,jpeg}',
    { eager: true } // import images (Vite)
);
const shuffle = (order) => {
    return order.slice().sort(() => Math.random() - 0.5);
};

function Card({ cardStack, stackLoaded, selectCard }) {

    const [loaded, setLoaded] = useState(0);

    const [cardOrder, setCardOrder] = useState(() => {
        return shuffle(Object.entries(images));
    });
    const total = cardOrder.length;

    const handleClick = (card) => {
        selectCard(card);
        setCardOrder(shuffle(cardOrder));
    };

    useEffect(() => {
        cardStack(total)}, [] // constant
    );
    useEffect(() => {loaded == total &&
        stackLoaded(true)}, [loaded]
    );

    return (
        cardOrder.map(([path, src]) => {

            const fileName = path.split('/').pop();
            const filePath = src.default ?? src;

            return (
                <div className="card" key={fileName}
                    onClick={() => handleClick(fileName)}>
                    <img src={filePath} alt="card image"
                        onLoad={() => setLoaded(num => num + 1)} />
                </div>
            );
        })
    );
} export default Card