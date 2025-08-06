import { useRef } from 'react';

function InputGroup(
    { label, name, type, value, entry,
      onChange, onError, onEntry, onRemove }
) {
    const sharedProps = {
        'id': name, 'name': name, 'type': type,
        'className': 'input', 'onChange': onChange,
    }
    const fileInputRef = useRef(null);
    const fileRemove = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // clear the actual input value
        } onRemove();
    };

    const renderInput = () => ({

        listInput: () => (<>
            <input {...sharedProps} value={entry} onKeyDown={e => {
                if (e.key !== 'Enter') return;
                e.preventDefault(); onEntry();
            }}/><button className="add-new" type="button" onClick={onEntry}>Add</button></>
        ),
        fileInput: () => (<>
            <input {...sharedProps} accept="image/*" ref={fileInputRef} /> {value &&
            <button className="remove" type="button" title="Remove" onClick={fileRemove}></button>}</>
        ),
        numericInput: () => (
            <input {...sharedProps} value={value || ''} placeholder="(year)" onKeyDown={e => {
                if (e.key === 'e' || e.key === 'E') e.preventDefault() }} />
        ),
        blockInput: () => {
            const { type, ...textareaProps } = sharedProps;
            return <textarea {...textareaProps} value={value || ''} />
        },
        defaultInput: () => {
            const { className, ...defaultProps } = sharedProps;
            return (<input className={className + (onError ? ' error' : '')}
            {...defaultProps} value={value || ''} placeholder={onError?' required':''} />);
        },
    })

    return (
        <li className="input-line">
            <label htmlFor={name}>{label}</label>
            {
                onEntry ? renderInput().listInput() :
                (() => {switch (type) {
                    case 'file': return renderInput().fileInput();
                    case 'number': return renderInput().numericInput();
                    case 'textarea': return renderInput().blockInput();
                    default: return renderInput().defaultInput();
                }})()
            }
        </li> // types: file, number, textarea, all others
    );
}
function OutputGroup({ entries, onRemove }) {
    return (
        entries.length > 0 &&
        <ul className="output-group">
            {entries.map((entry, index) => (
                <li className="entry" key={index}>
                    <span>{typeof entry !== 'object' ?
                        entry : entry.company || entry.school}
                    </span>
                    <button className="remove" type="button" onClick={() => onRemove(entry)}></button>
                </li>
            ))} {/* single or multi */}
        </ul>
    );
}
export { InputGroup, OutputGroup }