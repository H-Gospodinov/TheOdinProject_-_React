import { contactIcons, sectionIcons } from "./Icons";

function MainPage({ currentData }) {

    const leftCol = currentData.filter(group => {
        return group.position === 'left'
    });
    const rightCol = currentData.filter(group => {
        return group.position === 'right'
    });

    const fieldSet = (fields) => (

        <ul className="list">
            {fields.map((field) => field.value &&
                <li key={field.name} className={field.name}>
                    {field.type !== 'file' ?
                    <>
                        {contactIcons[field.name] &&
                            <img src={contactIcons[field.name]} alt="" />
                        }
                        <span>{field.value || ''}</span>
                    </> :
                    <img src={field.value} alt="Your photo" />}
                </li>
            )}
        </ul> // Identity, Contact
    );

    const listStack = (entries) => (

        <ul className="stack">
            {entries.map((entry, index) => (

                typeof entry === 'object' ? // multi || single

                <li className="multi" key={index}>
                    <div className="head">
                        <h3 className="names">
                            <strong>{entry.company || entry.school}</strong>
                            <span>{entry.position || entry.degree}</span>
                        </h3>
                        <div className="years">
                            {entry.from && <span>{entry.from} -</span>}
                            <span>{entry.until || entry.year}</span>
                        </div>
                    </div> {entry.details && <div className="body">
                        <p className="text">{entry.details}</p>
                    </div>}
                </li> : <li className="single" key={index}><span>{entry}</span></li>
            ))}
        </ul> // Skills, Language, Career, Education
    );

    const renderColumn = (groups) => (

        groups.map((group) => (
            <section className={'section ' + group.name.toLowerCase()} key={group.name}>
                {group.primary ? // Identity, Contact
                    group.fields.some(field => field.value) && fieldSet(group.fields) : <>
                    <h2 className="title">
                        {sectionIcons[group.icon] && sectionIcons[group.icon]()}
                        <span>{group.name}</span>
                    </h2>
                    {group.entries ? // Skills, Language, Career, Education
                        group.entries.length > 0 && listStack(group.entries) :
                        <div className="block">
                            <p className="text">{group.fields[0].value || ''}</p>
                        </div>
                    }</> // Profile, Details
                }
            </section> // all sections
        ))
    );
    return (
        <div className="page">
            <div className="column left-column">
                {renderColumn(leftCol)}
            </div>
            <div className="column right-column">
                {renderColumn(rightCol)}
            </div>
        </div>
    );
}
export default MainPage