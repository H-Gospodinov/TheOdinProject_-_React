
function InputGroup(
    { label, name, type, value, onChange, onRemove }
) {
    const fileUpload = () => {
        return (
            <>
            <input name={name} type="file" accept="image/*" onChange={onChange}
                // Key ensures input resets if value is cleared
                key={value ? 'has-file' : 'no-file'} />
            {value && <button type="button" onClick={onRemove}>Remove</button>}</>
        );
    }
    return (
        <div className="input-group">
            <label>{label}</label>
            {
                type === 'file' ? fileUpload() : type === 'textarea'
                ? <textarea name={name} value={value || ''} onChange={onChange} />
                : <input name={name} type={type} value={value || ''} onChange={onChange} />
            }
        </div>
    ); // 3 types of input: file, textarea, all others
}

function FormGroup(
    { name, fields, onChange, onUpload, onRemove, onDestroy }
) {
    const update = (field) => (e) => {
        if (field.type === 'file') {
            onUpload(name, field.name, e);
        } else {
            onChange(name, field.name, e.target.value);
        }
    }
    const remove = (field) => () => {
        onRemove(name, field.name);
    }
    return (
        <div className="form-group">
            { name && <h3>{name}</h3> }
            { name !== 'Personal' && (
                <button type="button" onClick={
                    () => onDestroy(name)}>
                    Remove Section
                </button>
            )}
            { fields.map((field) => (
                <InputGroup
                    key = { field.name }
                    { ...field } // all
                    //value = { field.value }
                    onChange = { update(field) }
                    onRemove = { remove(field) }
                />
            ))}
        </div>
    );
}
export default FormGroup