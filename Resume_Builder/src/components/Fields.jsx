
function InputGroup(
    { label, name, type, value, entry,
      onChange, onEntry, onRemove }
) {
    const listInput = () => {
        return (<>
            <input name={name} type="text" value={entry}
                onChange={onChange} onKeyDown={e => {
                    if (e.key !== 'Enter') return;
                    e.preventDefault(); onEntry();
                }}
            /><button type="button" onClick={onEntry}>Add</button>
        </>);
    }
    const fileInput = () => {
        return (<>
            <input name={name} type="file" accept="image/*"
                onChange={onChange} key={value ? 'has-file' : 'no-file'} />
                {/* key ensures input resets if value is cleared */}
            {value && <button type="button" onClick={onRemove}>X</button>}
        </>);
    }
    return (
        <div className="input-group">
            <label>{label}</label>
            {
                onEntry ? listInput() : type === 'file' ? fileInput() : type === 'textarea'
                ? <textarea name={name} value={value || ''} onChange={onChange} />
                : <input name={name} type={type} value={value || ''} onChange={onChange} />
            }
        </div>
    ); // input types are: file, textarea, all others
}

function ListGroup({ entries, onRemove }) {
    return(
        <ul>
            {entries.map((entry, index) => (
                <li key={index}>
                    {typeof entry === "string" ? <span>{entry}</span> : <>
                        <strong>{entry.position}</strong>
                        <span>at {entry.company}</span>
                    </>}
                    <button type="button" onClick={() => onRemove(entry)}>X</button>
                </li>
            ))}
        </ul> // entries can be singular or groups
    );
}
export { InputGroup, ListGroup }