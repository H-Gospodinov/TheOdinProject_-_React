import email from '../assets/email.svg'
import phone from '../assets/phone.svg'
import location from '../assets/location.svg'
import website from '../assets/website.svg'

const contactIcons = { email, phone, location, website };

/* section icons use raw svg code for dynamic color control.
"skills" and "language" shouldn't be controlled but to save
some extra logic their static color is just hardcoded in the files */

import skillsRaw from '../assets/skills.svg?raw'
import languageRaw from '../assets/language.svg?raw'

import profileRaw from '../assets/profile.svg?raw'
import careerRaw from '../assets/career.svg?raw'
import educationRaw from '../assets/education.svg?raw'
import detailsRaw from '../assets/details.svg?raw'

const sectionIcons = {
    Skills: () => <SvgIcon svg={skillsRaw} />,
    Language: () => <SvgIcon svg={languageRaw} />,
    Profile: () => <SvgIcon svg={profileRaw} />,
    Career: () => <SvgIcon svg={careerRaw} />,
    Education: () => <SvgIcon svg={educationRaw} />,
    Details: () => <SvgIcon svg={detailsRaw} />,
};
const SvgIcon = ({ svg }) => {

    return <span className="icon"
        dangerouslySetInnerHTML={{ __html: svg }}
    />; // inject raw svg code
};
import renameRaw from '../assets/rename.svg?raw'
import removeRaw from '../assets/remove.svg?raw'

const fieldseIcons = {
    rename: (props) => <SvgIcon svg={renameRaw} />,
    remove: (props) => <SvgIcon svg={removeRaw} />,
};
export { contactIcons, sectionIcons, fieldseIcons }