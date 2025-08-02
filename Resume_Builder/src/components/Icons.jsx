import email from '../assets/email.svg'
import phone from '../assets/phone.svg'
import location from '../assets/location.svg'
import website from '../assets/website.svg'

const contactIcons = { email, phone, location, website };

/* section icons use raw svg code for dynamic color control.
"skills" and "language" shouldn't be controlled but to save
some extra logic their color is just hardcoded in the files */

import skillsRaw from '../assets/skills.svg?raw'
import languageRaw from '../assets/language.svg?raw'

import profileRaw from '../assets/profile.svg?raw'
import careerRaw from '../assets/career.svg?raw'
import detailsRaw from '../assets/details.svg?raw'

const sectionIcons = {
    Skills: (props) => <SvgIcon svg={skillsRaw} {...props} />,
    Language: (props) => <SvgIcon svg={languageRaw} {...props} />,
    Profile: (props) => <SvgIcon svg={profileRaw} {...props} />,
    Career: (props) => <SvgIcon svg={careerRaw} {...props} />,
    Details: (props) => <SvgIcon svg={detailsRaw} {...props} />,
};
const SvgIcon = ({ svg, style }) => {

    return <span style={style}
        dangerouslySetInnerHTML={{ __html: svg }}
    />; // inject raw svg code
};
export { contactIcons, sectionIcons }