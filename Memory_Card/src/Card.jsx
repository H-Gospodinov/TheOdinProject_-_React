import { useState, useEffect } from 'react';

function Card({ cardStack, stackLoaded, selectCard }) {

    const [loaded, setLoaded] = useState(0);
    const total = cardStack.length;

    useEffect(() => {loaded == total &&
        stackLoaded(true)}, [loaded]
    );
    return (
        cardStack.map(([path, src]) => {

            const fileName = path.split('/').pop();
            const filePath = src.default ?? src;

            return (
                <div className="card" key={fileName}
                    onClick={() => selectCard(fileName)}>
                    <img src={filePath} alt="card image"
                        onLoad={() => setLoaded(num => num + 1)} />
                </div>
            );
        })
    );
} export default Card