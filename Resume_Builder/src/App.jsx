import { useState } from 'react'
import sampleData from './data.json'
import logoIcon from './assets/logo.svg'
import saveIcon from './assets/save.svg?raw'
import printIcon from './assets/print.svg?raw'
import RestoreData from './components/Restore.jsx'
import DataForm from './components/Form.jsx'
import MainPage from './components/Page.jsx'

function App() {

    const [currentData, setCurrentData] = useState(() => {
        // load stored or use default
        const stored = localStorage.getItem('resumeData');
        return stored ? JSON.parse(stored) : sampleData;
    });

    const [colorScheme, setColorScheme] = useState(() => {
        // load stored or use default
        const stored = localStorage.getItem('colorScheme');
        if (stored) document.body.style.setProperty('--main-color', stored);
        return stored || '#163853';
    });

    const storeCurrentData = () => {
        localStorage.setItem('resumeData', JSON.stringify(currentData));
        localStorage.setItem('colorScheme', colorScheme);
        alert('Data saved in your current browser.');
    };

    const colorPicker = (e) => {
        // only raw svg icons get the new color applied
        document.body.style.setProperty('--main-color', e.target.value);
        setColorScheme(e.target.value);
    }

    return (<>
        <header className="header">
            <h1 className="title">
                <span className="icon"><img src={logoIcon} alt="" /></span>
                <span className="text">CVBuilder</span>
            </h1>
            <div className="actions">
                <RestoreData
                    sampleData={sampleData}
                    currentData={currentData}
                    setCurrentData={setCurrentData}
                />
                <span className="color" title="Color scheme">
                    <input type="color" value={colorScheme} aria-label="Color" onChange={colorPicker} />
                </span>
                <button className="button" id="save" type="button" title="Save changes"
                    onClick={storeCurrentData}
                    dangerouslySetInnerHTML={{ __html: saveIcon }}>
                </button>
                <button className="button" id="print" type="button" title="Download or print"
                    onClick={() => window.print()}
                    dangerouslySetInnerHTML={{ __html: printIcon }}>
                </button>
            </div>
        </header>
        <main className="main">
            <div className="data-form">
                <div className="scroller">
                    <DataForm
                        currentData={currentData}
                        setCurrentData={setCurrentData}
                    />
                </div>
            </div>
            <div className="preview">
                <MainPage currentData={currentData} />
            </div>
        </main>
        <footer className="footer">
            <span>Check source code on</span>
            <a target="_blank" rel="noopener"
                href="https://h-gospodinov.github.io/H-Gospodinov/">GitHub
            </a>
        </footer>
    </>);
}
export default App