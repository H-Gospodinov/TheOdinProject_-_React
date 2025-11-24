import { useRef, useState } from 'react'

function LabelDialog({ labels, update, setUpdate, onCreate, onUpdate, setModal }) {

    const input = useRef(null);
    const [error, setError] = useState(null);

    function setLabel() {
        const value = input.current.value.trim();
        if (!value) return;
        const taken = labels.some(label =>
            label.toLowerCase() == value.toLowerCase()
        );
        if (taken) {
            return setError(`"${value}" is already added.`);
        }
        if (update) {
            onUpdate([update, value]); setUpdate(null);
        } else {
            onCreate(value);
        }
        setModal(null);
    }
    return (
        <div className="box">
            <h3 className="title">{update ? 'Edit label' : 'Create label'}</h3>
            <p className="hint">Data fileds marked with <strong className="required">*</strong> are mandatory.</p>
            <form onSubmit={(e) => {e.preventDefault(); setLabel()}}>
                <div className="form-input">
                    <div className="input-group">
                        <label className="label">Label <strong className="required">*</strong></label>
                        <input className="input" type="text" defaultValue={update ? update : ''} ref={input} required />
                    </div>
                </div>
                <div className="form-action">
                    {error && <p className="error">{error}</p>}
                    <button className="submit" type="submit">{update ? 'Edit label' : 'Create label'}</button>
                </div>
            </form>
            <button className="close" type="button" aria-label="close"
                onClick={() => {setModal(null); setUpdate(null)}}>
            </button>
        </div>
    );
}
export default LabelDialog