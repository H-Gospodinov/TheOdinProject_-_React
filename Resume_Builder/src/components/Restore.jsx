
function RestoreData({ sampleData, currentData, setCurrentData }) {

    const deletedData = sampleData.filter(
        group => !currentData.some(cg => cg.name === group.name)
    );
    if (deletedData.length < 1) return;

    const handleRestore = (groupName) => {

        const restoreGroup = sampleData.find(
            group => group.name === groupName
        );
        const order = sampleData.map(group => group.name);
        const index = currentData.reduce((count, group) => {
            
            if (order.indexOf(group.name) < order.indexOf(groupName)) {
                return count + 1;
            }
            else return count;
        }, 0);
        const updatedData = [...currentData];
        updatedData.splice(index, 0, { ...restoreGroup });
        setCurrentData(updatedData);
    };
    return (
        <select className="select" id="restore" defaultValue=""
            onChange={e => {
            if (e.target.value) {
                handleRestore(e.target.value);
                e.target.value = '';
            }}}>
            <option value="" disabled>Restore data</option>
            {deletedData.map(s => ( // s = section
                <option key={s.name} value={s.name}>{s.name}</option>
            ))}
        </select>
    );
}
export default RestoreData