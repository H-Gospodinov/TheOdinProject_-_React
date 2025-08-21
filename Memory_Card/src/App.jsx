import { useState, useRef } from 'react';
import icon from './assets/kiki-jiji.svg'
import Card from './Card'

const images = import.meta.glob('./assets/images/*.{jpg,webp}',
    { eager: true } // import images (Vite)
);
const shuffle = (order) => {
    return order.slice().sort(() => Math.random() - 0.5);
};

function App() {

    const [cards, setCards] = useState(() => {
        return shuffle(Object.entries(images));
    });
    const [loaded, setLoaded] = useState(false);
    const [selected, setSelected] = useState([]);

    const [nowScore, setNowScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const [message, setMessage] = useState('');
    const dialogRef = useRef(null);


    function selectCard(cardId) {

        if (selected.includes(cardId)) {

            gameOver(0); // game lost

            if (nowScore > highScore) {
                setHighScore(nowScore);
            }
            setNowScore(0); setSelected([]);
        }
        else {
            const update = (score) => {

                const newScore = score + 1;

                if (newScore === cards.length) {
                    gameOver(1); // game won
                    setHighScore(newScore);
                }
                return newScore;
            };
            setNowScore(score => update(score));
            setSelected(cards => [...cards, cardId]);
        }
        setCards(shuffle(cards));
    }

    function gameOver(outcome) {

        setMessage(outcome ? 'Great, you win the game' :
                             'Wrong card, try again');
        const close = dialogRef.current.querySelector('.close');

        dialogRef.current.showModal();

        close.onclick = () => {
            dialogRef.current.close();
            setNowScore(0); setSelected([]);
            outcome && setHighScore(0);
        };
    } // win or loss

    return (
        <>
            <header className="header">
                <h1 className="title">Memory Card Game</h1>
                <p className="rules">
                    Try clicking on every card <u>only once</u>.
                    If the same card is clicked twice the game starts over.
                    You win the game if you click on all 18 cards.
                </p>
                <img className="icon" src={icon} alt="" width="60" height="58" />
                <div className="score">
                    <div className="display current">
                        <label>now</label> <span>{nowScore}</span>
                    </div>
                    <div className="display highest">
                        <label>max</label> <span>{highScore}</span>
                    </div>
                </div>
            </header>

            <main className="main">
                <div className="grid">
                    <Card
                        cardStack={cards}
                        stackLoaded={setLoaded}
                        selectCard={selectCard}
                    />
                </div>
                <dialog className="modal" ref={dialogRef}>
                    <span className="text">{message}</span>
                    <button className="close">OK</button>
                </dialog>
                {!loaded && <span className="loader" />}
            </main>

            <footer className="footer">
                <span>Check source code on</span>
                <a target="_blank" rel="noopener"
                    href="https://h-gospodinov.github.io/H-Gospodinov/">GitHub
                </a>
            </footer>
        </>
    );
}
export default App