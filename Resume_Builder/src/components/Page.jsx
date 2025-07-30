
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
    function renderEntries(entries) {

        return (
            entries.length > 0 &&
            <ul>
                {entries.map((entry, index) => (
                    <li key={index}>
                        {typeof entry === "string" ? <span>{entry}</span> :
                        <div>
                            <strong>{entry.position}</strong>
                            <span>at {entry.company}</span>
                            <span>{entry.from} {entry.until}</span>
                            <span>{entry.details}</span>
                        </div>}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="page">
            {currentData.map((group) => {

                return (
                    <section className={'section '+ group.name.toLowerCase()} key={group.name}>
                        { <h2>{group.name}</h2> }
                        { group.name === 'Personal' ? personDetails(group.fields) :
                        group.entries ? renderEntries(group.entries) :
                        <div>
                            <p style={{whiteSpace: 'pre-line'}}>{group.fields[0].value || ''}</p>
                        </div>
                        }
                    </section>
                )
            })}
        </div>
    );
}
export default MainPage