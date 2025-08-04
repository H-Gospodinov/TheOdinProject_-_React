import { useRef } from 'react';

function InputGroup(
    { label, name, type, value, entry,
      onChange, onEntry, onRemove }
) {
    const listInput = () => (
        <>
            <input className="input" id={name} name={name} type="text" value={entry}
                onChange={onChange} onKeyDown={e => {
                    if (e.key !== 'Enter') return;
                    e.preventDefault(); onEntry();
                }}
            /><button className="add-new" type="button" onClick={onEntry}>Add</button>
        </>
    );
    const fileInputRef = useRef(null);
    const fileRemove = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // clear the actual input value
        } onRemove();
    };
    const fileInput = () => (
        <>
            <input className="input" id={name} name={name} type="file" accept="image/*"
                onChange={onChange} ref={fileInputRef} />
            {value && <button className="remove" type="button" title="Remove" onClick={fileRemove}>X</button>}
        </>
    );
    return (
        <li className="input-line">
            <label htmlFor={name}>{label}</label>
            {
                onEntry ? listInput() : type === 'file' ? fileInput() : type === 'textarea'
                ? <textarea className="input" id={name} name={name} value={value || ''} onChange={onChange} />
                : <input className="input" id={name} name={name} type={type} value={value || ''} onChange={onChange} />
            }
        </li>
    ); // input types: file, textarea, all others
}

function ListGroup({ entries, onRemove }) {
    return (
        entries.length > 0 &&
        <ul className="output-group">
            {entries.map((entry, index) => (
                <li className="entry" key={index}>
                    <span>{typeof entry !== 'object' ?
                        entry : entry.company || entry.school}
                    </span>
                    <button className="remove" type="button" onClick={() => onRemove(entry)}>X</button>
                </li>
            ))} {/* single or multi */}
        </ul>
    );
}
export { InputGroup, ListGroup }