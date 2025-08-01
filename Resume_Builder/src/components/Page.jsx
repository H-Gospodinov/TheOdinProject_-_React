import { contactIcons, sectionIcons } from "./Icons";

function MainPage({ currentData }) {

    const leftCol = currentData.filter(group => {
        return group.position === 'left'
    });
    const rightCol = currentData.filter(group => {
        return group.position === 'right'
    });

    const fieldSet = (fields) => (

        <ul className="">
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
        </ul> // "Header", "Contact", "Profile", "Details"
    );

    const listStack = (entries) => (

        <ul className="entry-group">
            {entries.map((entry, index) => (

                typeof entry === 'object' ?

                <li className="multi" key={index}>
                    <div className="head">
                        <h3 className="employment">
                            <span>{entry.position}</span> <span>{entry.company}</span>
                        </h3>
                        <time className="timeframe">
                            <span>{entry.from}</span> <span>{entry.until}</span>
                        </time>
                    </div>
                    <div className="body">
                        <p>{entry.details}</p>
                    </div>
                </li> : <li className="single" key={index}><span>{entry}</span></li>
            ))}
        </ul> // "Skills", "Language", "Career", "Education"
    );

    const renderColumn = (groups) => (

        groups.map((group) => (
            <section className={'section '+ group.name.toLowerCase()} key={group.name}>

                {group.name !== 'Header' && group.name !== 'Contact' &&
                    <h2>
                        {/* {sectionIcons[group.name] && (
                            <img src={sectionIcons[group.name]} alt="" />
                        )}  */}
                        {sectionIcons[group.name] && sectionIcons[group.name]({
                            fill: '#163853', stroke: '#163853',
                        })}
                        <span>{group.name}</span>
                    </h2>
                }
                {group.name === 'Header' || group.name === 'Contact' ? fieldSet(group.fields) :
                    group.entries && group.entries.length > 0 ? listStack(group.entries) :
                    <div>
                        <p style={{whiteSpace: 'pre-line'}}>{group.fields[0].value || ''}</p>
                    </div>
                }
            </section> // ToDo: BUG fix: when all entries from a group are deleted, the app renders the "textarea" layout
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