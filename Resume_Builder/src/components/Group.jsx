import { useState } from 'react'
import { InputGroup, ListGroup } from './Fields';

function FormGroup(
    { name, fields, entries, onChange, onListing,
      onUpload, onCancel, onDestroy }
) {
    const [listEntry, setlistEntry] = useState('');

    const updateList = () => ({

        insert: () => {
            const text = listEntry.trim();
            if (!text) return;

            const taken = entries.some((entry) =>
                Object.values(entry)[0] === text
            );
            if (taken) {setlistEntry(''); return;}

            const newEntry = { [fields[0].name]: text };
            onListing(name, [...entries, newEntry]);
            setlistEntry('');
        },
        remove: (value) => {
            const newEntries = entries.filter((entry) =>
                Object.values(entry)[0] !== value
            );
            onListing(name, newEntries);
        },
    });
    const updateField = (field) => ({

        change: (e) => {
            if (field.type === 'file') {
                onUpload(name, field.name, e);
            } else {
                onChange(name, field.name, e.target.value);
            }
        },
        remove: () => {
            onCancel(name, field.name); // file
        },
    });
    return (
        <div className="form-group">
            { name && <h3>{name}</h3> }
            { name !== 'Personal' && (
                <button type="button" onClick={
                    () => onDestroy(name)}>
                    Remove Section
                </button>
            )}
            { entries ? <InputGroup
                key = { fields[0].name }
                { ...fields[0] }
                entry = { listEntry }
                onChange = { e =>
                    setlistEntry(e.target.value) }
                onEntry = { updateList().insert }
            />
            : fields.map((field) =>
                <InputGroup
                    key = { field.name }
                    { ...field } // all
                    onChange = { updateField(field).change }
                    onRemove = { updateField(field).remove }
                />
            )}
            { entries && <ListGroup
                    entries = { entries }
                    onRemove = { updateList().remove }
            /> }
        </div>
    );
}
export default FormGroup