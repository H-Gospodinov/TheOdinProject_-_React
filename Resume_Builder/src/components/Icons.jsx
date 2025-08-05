import email from '../assets/email.svg'
import phone from '../assets/phone.svg'
import location from '../assets/location.svg'
import website from '../assets/website.svg'

import skillsRaw from '../assets/skills.svg?raw'
import languageRaw from '../assets/language.svg?raw'
import profileRaw from '../assets/profile.svg?raw'
import careerRaw from '../assets/career.svg?raw'
import educationRaw from '../assets/education.svg?raw'
import detailsRaw from '../assets/details.svg?raw'
import renameRaw from '../assets/rename.svg?raw'
import removeRaw from '../assets/remove.svg?raw'

const fieldsetIcons = {
    rename: () => <SvgIcon svg={renameRaw} />,
    remove: () => <SvgIcon svg={removeRaw} />,
};
const contactIcons = { email, phone, location, website };

/* "skills" and "language" are not color controlled,
they have a static color hardcoded in their markup. */

const sectionIcons = {
    skills: () => <SvgIcon svg={skillsRaw} />,
    language: () => <SvgIcon svg={languageRaw} />,
    profile: () => <SvgIcon svg={profileRaw} />,
    career: () => <SvgIcon svg={careerRaw} />,
    education: () => <SvgIcon svg={educationRaw} />,
    details: () => <SvgIcon svg={detailsRaw} />,
};
const SvgIcon = ({ svg }) => {

    return <span className="icon"
        dangerouslySetInnerHTML={{ __html: svg }}
    />; // inject raw svg code
};
export { contactIcons, sectionIcons, fieldsetIcons }