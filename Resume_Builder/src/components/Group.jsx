import { useState } from 'react'
import { fieldsetIcons } from './Icons';
import { InputGroup, OutputGroup } from './Fields';

function FormGroup(
    { name, fields, entries, onChange, onListing,
      onUpload, onCancel, onRename, onDestroy }
) {
    const [renaming, setRenaming] = useState(false);
    const [newName, setNewName] = useState(name);

    const [listEntry, setlistEntry] = useState(''); // single
    const [entryList, setEntryList] = useState({}); // multi

    const [hasError, setHasError] = useState(false);

    const updateList = () => ({

        insert: () => { // multi || single

            if (fields.length > 1) {
                const hasValue = Object.values(
                    entryList).some(value => value.trim());
                if (!hasValue) return;

                const first = fields[0].name;
                const required = entryList[first] || '';
                if (!(required.trim())) {
                    setHasError(true); return;
                }
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

    const prepareInput = (field, index) => {

        switch (true) {

            case entries && fields.length > 1: {

                const update = (field, value) => {
                    setEntryList((prev) => (
                        { ...prev, [field.name]: value }
                    ));
                    if (field.name === fields[0].name) {
                        if (value.trim()) setHasError(false);
                    }
                }; return {
                value: entryList[field.name] || '',
                onChange: e => update(field, e.target.value),
                onError: index === 0 && hasError,}
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
    const renameGroup = () => {

        if (newName.trim() && newName !== name) {
            onRename(name, newName.trim());
        }
        setRenaming(false);
    }

    return (
        <fieldset className="fieldset">
            <div className="head">
                {renaming &&
                    <input className="edit" type="text" value={newName}
                        onChange={e => setNewName(e.target.value)}
                        onKeyDown={e => {
                            e.key === 'Enter' && renameGroup();
                            e.key === 'Escape' && setRenaming(false);
                        }}
                        onBlur={() => renameGroup()} autoFocus
                    />
                }
                {name && <h3 className="title">{name}</h3>}
                {name !== 'Identity' && name !== 'Contact' &&
                <div className="buttons">
                    <button className="rename" type="button" title="Rename"
                        onClick={() => setRenaming(true)}>{fieldsetIcons.rename()}
                    </button>
                    <button className="exclude" type="button" title="Remove"
                        onClick={() => onDestroy(name)}>{fieldsetIcons.remove()}
                    </button>
                </div>}
            </div>
            <div className="body">
                <ul className="input-group">
                    {fields.map((field, index) =>
                        <InputGroup
                            key={field.name} {...field}
                            {...prepareInput(field, index)}
                        /> // input line
                    )}
                </ul>
                {entries && fields.length > 1 &&
                    <button className="add-new" type="button"
                        onClick={updateList().insert}>Add
                    </button>
                }
                {entries && <OutputGroup
                    entries={entries}
                    onRemove={updateList().remove}
                />}
            </div>
        </fieldset>
    );
}
export default FormGroup