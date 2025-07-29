import { useState } from 'react'
import SampleData from './assets/data.json'
import RestoreData from './components/Restore.jsx'
import DataForm from './components/Form.jsx'
import Page from './components/Page.jsx'

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
            <div className="data-form">
                <DataForm
                    currentData={currentData}
                    setCurrentData={setCurrentData}
                />
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
            <Page currentData={currentData} />
        </>
    );
}
export default App