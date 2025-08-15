import Card from './Card'

function App() {

    return (
        <>
            <header className="header">
                <h1 className="title">Memory Game</h1>
            </header>
            <main className="main">
                <Card />
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