import { useState } from 'react';
import Card from './Card'

function App() {

    const [selected, setSelected] = useState([]);
    const [nowScore, setNowScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    function selectCard(cardId) {

        if (selected.includes(cardId)) {

            setNowScore(0); setSelected([]);
            if (nowScore > highScore) {
                setHighScore(nowScore);
            }
        } else {
            setNowScore(score => score + 1);
            setSelected(cards => [...cards, cardId]);
        }
    }
    return (
        <>
            <header className="header">
                <h1 className="title">Memory Game</h1>
                <div className="score">
                    <span className="current">{nowScore}</span>
                    <span className="highest">{highScore}</span>
                </div>
            </header>
            <main className="main">
                <Card selectCard={selectCard} />
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