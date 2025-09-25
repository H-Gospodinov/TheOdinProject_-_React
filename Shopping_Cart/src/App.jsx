import { HashRouter, Link } from 'react-router-dom'
import { ContentProvider } from './context/Catalog.jsx'
import { BasketProvider } from './context/Basket.jsx'
import NavBar from './partials/Navigation.jsx'
import NavRoutes from './Routes.jsx'
import SearchBox from './partials/Search.jsx'

import logo from './assets/logo.png'
import basket from './assets/icons/basket.svg'

function App() {

    return (
        <HashRouter>
            <ContentProvider>
                <BasketProvider>
                    <header className="header">
                        <div className="logo">
                            <Link to="/">
                                <img src={logo} alt="logo" width="200" height="68" />
                            </Link>
                        </div>
                        <NavBar />
                        <div className="actions">
                            <SearchBox />
                            <div className="basket">
                                <Link to="/cart">
                                    <img src={basket} alt="" width="42" height="42" />
                                </Link>
                            </div>
                        </div>
                    </header>
                    <main className="main">
                        <NavRoutes />
                    </main>
                    <footer className="footer">
                        <span>Check source code on </span>
                        <a target="_blank" rel="noopener"
                            href="https://h-gospodinov.github.io/H-Gospodinov/">GitHub
                        </a>
                    </footer>
                </BasketProvider>
            </ContentProvider>
        </HashRouter>
    );
}
export default App