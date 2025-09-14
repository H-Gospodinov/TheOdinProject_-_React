import { HashRouter, Link } from 'react-router-dom'
import { ContentProvider } from './Context.jsx'
import NavBar from './partials/Navigation.jsx'
import NavRoutes from './Routes.jsx'

import logo from './assets/logo.png'
import search from './assets/icons/search.svg'
import basket from './assets/icons/basket.svg'

function App() {

    return (
        <HashRouter>
            <ContentProvider>

                <header className="header">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="logo" width="200" height="68" />
                        </Link>
                    </div>
                    <NavBar />
                    <div className="actions">
                        <button type="button" aria-label="Search">
                            <img src={search} alt="" width="36" height="36" />
                        </button>
                        <Link to="/cart">
                            <img src={basket} alt="" width="42" height="42" />
                        </Link>
                    </div>
                </header>

                <main className="main">
                    <NavRoutes />
                </main>

                <footer className="footer">
                    <span>Check source code on</span>
                    <a target="_blank" rel="noopener"
                        href="https://h-gospodinov.github.io/H-Gospodinov/">GitHub
                    </a>
                </footer>

            </ContentProvider>
        </HashRouter>
    );
}
export default App