import FormGroup from './Group'

function DataForm({ currentData, setCurrentData }) {

    const handleInputChange = (groupName, fieldName, value) => {
        const updatedData = currentData.map(group => {

            if (group.name !== groupName) return group;

            const update = group.fields.map(field =>
                field.name === fieldName ? { ...field, value } : field);
            return { ...group, fields: update };
        });
        setCurrentData(updatedData);
    };

    const handleListChange = (groupName, newEntries) => {
        const updatedData = currentData.map(group =>
            group.name === groupName ?
                { ...group, entries: newEntries } : group
        );
        setCurrentData(updatedData);
    };

    const handleFileUpload = (groupName, fieldName, e) => {
        const file = e.target.files[0];

        if (!file) return; // no file

        const reader = new FileReader();

        reader.onload = (event) => {
            const result = event.target.result;
            // pass base64 string
            handleInputChange(groupName, fieldName, result);
        };
        reader.readAsDataURL(file);
    };

    const handleFileRemove = (groupName, fieldName) => {
        handleInputChange(groupName, fieldName, '');
    };

    const handleGroupRemove = (groupName) => {
        const updatedData = currentData.filter(group =>
            group.name !== groupName
        );
        setCurrentData(updatedData);
    };

    return ( // render current
        <form>
            {currentData.map((group) => (
                <FormGroup
                    key = { group.name }
                    name = { group.name }
                    fields = { group.fields }
                    entries = { group.entries }
                    onChange = { handleInputChange }
                    onListing = { handleListChange }
                    onUpload = { handleFileUpload }
                    onCancel = { handleFileRemove }
                    onDestroy = { handleGroupRemove }
                />
            ))}
        </form>
    );
}
export default DataForm