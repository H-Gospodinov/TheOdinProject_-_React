
function MainPage({ currentData }) {

    function personDetails(fields) {

        const field = fields[0]; return (
            <>
                { field.type === 'file' && field.value &&
                    <div>
                        <img src={field.value} alt={field.label} />
                    </div>
                } <ul>
                    {fields.map((field) => field.type !== 'file' &&
                        <li key={field.name}>
                            <strong>{ field.label }:</strong>
                            <span>{field.value || ''}</span>
                        </li>
                    )}
                </ul>
            </>
        );
    }
    function renderSingle(group) {

        const field = group.fields[0];

        return (
            !group.entries ?
            <div>
                <p style={{whiteSpace: 'pre-line'}}>
                    {field.value || ''}</p>
            </div>
            :
            group.entries.length > 0 &&
            <ul>
                {group.entries.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
        );
    }

    return (
        <div className="page">
            {currentData.map((group) => (
                <section className={'section '+ group.name.toLowerCase()} key={group.name}>
                    { <h2>{group.name}</h2> }
                    { group.fields.length > 1 ? personDetails(group.fields) : renderSingle(group)}
                </section>
            ))}
        </div>
    );
}
export default MainPage