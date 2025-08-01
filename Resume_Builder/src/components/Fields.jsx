
function InputGroup(
    { label, name, type, value, entry,
      onChange, onEntry, onRemove }
) {
    const listInput = () => (
        <>
            <input name={name} type="text" value={entry}
                onChange={onChange} onKeyDown={e => {
                    if (e.key !== 'Enter') return;
                    e.preventDefault(); onEntry();
                }}
            /><button type="button" onClick={onEntry}>Add</button>
        </>
    );
    const fileInput = () => (
        <>
            <input name={name} type="file" accept="image/*"
                onChange={onChange} key={value ? 'has-file' : 'no-file'} />
                {/* key ensures input resets if value is cleared */}
            {value && <button type="button" onClick={onRemove}>X</button>}
        </>
    );
    return (
        <div className="input-group">
            <label>{label}</label>
            {
                onEntry ? listInput() : type === 'file' ? fileInput() : type === 'textarea'
                ? <textarea name={name} value={value || ''} onChange={onChange} />
                : <input name={name} type={type} value={value || ''} onChange={onChange} />
            }
        </div>
    ); // input types: file, textarea, all others
}

function ListGroup({ entries, onRemove }) {
    return (
        entries.length > 0 &&
        <ul className="list-group">
            {entries.map((entry, index) => (
                <li key={index}>
                    <span>{typeof entry !== 'object' ?
                        entry : `${entry.position} @ ${entry.company}`}
                    </span>
                    <button type="button" onClick={() => onRemove(entry)}>X</button>
                </li>
            ))} {/* single or multi */}
        </ul>
    );
}
export { InputGroup, ListGroup }