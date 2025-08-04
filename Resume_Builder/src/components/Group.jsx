import { useState } from 'react'
import { fieldseIcons } from './Icons';
import { InputGroup, ListGroup } from './Fields';

function FormGroup(
    { name, fields, entries, onChange, onListing,
      onUpload, onCancel, onDestroy }
) {
    const [listEntry, setlistEntry] = useState(''); // single
    const [entryList, setEntryList] = useState({}); // multi

    const updateList = () => ({

        insert: () => { // multi || single

            if (fields.length > 1) {
                const hasValue = Object.values(
                    entryList).some(value => value.trim());
                if (!hasValue) return;

                onListing(name, [...entries, entryList]);
                setEntryList({});
            }
            else {
                if (!listEntry.trim()) return;

                if (entries.includes(listEntry)) {
                    setlistEntry(''); return;
                }
                onListing(name, [...entries, listEntry]);
                setlistEntry('');
            }
        },
        remove: (target) => {
            const newEntries = entries.filter((entry) =>
                entry !== target
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

    const prepareInput = (field) => {

        switch (true) {

            case entries && fields.length > 1:

                const update = (field, value) => {
                    setEntryList((prev) => (
                        { ...prev, [field.name]: value }
                    ));
                }; return {
                value: entryList[field.name] || '',
                onChange: e => update(field, e.target.value),
            };

            case !!entries: return {

                entry: listEntry,
                onChange: e => setlistEntry(e.target.value),
                onEntry: updateList().insert,
            };

            case !entries: return {

                onChange: updateField(field).change,
                onRemove: updateField(field).remove,
            };
        }
    };
    return (
        <fieldset className="fieldset">
            <div className="head">
                {name && <h3 className="title">{name}</h3>}
                {name !== 'Identity' && name !== 'Contact' &&
                <div className="buttons">
                    <button className="rename" type="button" title="Rename"
                        onClick={() => onRename(name)}>{fieldseIcons.rename()}
                    </button>
                    <button className="exclude" type="button" title="Remove"
                        onClick={() => onDestroy(name)}>{fieldseIcons.remove()}
                    </button>
                </div>}
            </div>
            <div className="body">
                <ul className="input-group">
                    {fields.map(field =>
                        <InputGroup
                            key={field.name} {...field}
                            {...prepareInput(field)}
                        /> // input line
                    )}
                </ul>
                {entries && fields.length > 1 &&
                    <button className="add-new" type="button" onClick={
                        updateList().insert}>Add</button>
                }
                {entries && <ListGroup
                    entries={entries}
                    onRemove={updateList().remove}
                />}
            </div>
        </fieldset>
    );
}
export default FormGroup