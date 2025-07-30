import { useState } from 'react'
import SampleData from './assets/data.json'
import RestoreData from './components/Restore.jsx'
import DataForm from './components/Form.jsx'
import MainPage from './components/Page.jsx'

function App() {

    const [currentData, setCurrentData] = useState(() => {
        // load stored or use default
        const stored = localStorage.getItem('resumeData');
        return stored ? JSON.parse(stored) : SampleData;
    });

    const storeCurrentData = () => {
        localStorage.setItem('resumeData', JSON.stringify(currentData));
        alert('Resume data saved!');
    };

    return (
        <>
            <header className="header">
                <h1 className="title">CV Builder</h1>
                <button type="button">Download</button>
            </header>
            <main className="main">
                <div className="data-form">
                    <DataForm
                        currentData={currentData}
                        setCurrentData={setCurrentData}
                    />
                    <div className="buttons">
                        <button
                            onClick={storeCurrentData}
                            type="button">Save
                        </button>
                        <RestoreData
                            sampleData={SampleData}
                            currentData={currentData}
                            setCurrentData={setCurrentData}
                        />
                    </div>
                </div>
                <div className="main-page">
                    <MainPage
                        currentData={currentData}
                    />
                </div>
            </main>
            <footer className="footer">
            </footer>
        </>
    );
}
export default App