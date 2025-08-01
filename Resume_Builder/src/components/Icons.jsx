import email from '../assets/email.svg'
import phone from '../assets/phone.svg'
import location from '../assets/location.svg'
import website from '../assets/website.svg'

import profileRaw from '../assets/profile.svg?raw'
import careerRaw from '../assets/career.svg?raw'
import detailsRaw from '../assets/details.svg?raw'

const contactIcons = { email, phone, location, website };

const sectionIcons = {
    Profile: (props) => <SvgIcon svg={profileRaw} {...props} />,
    Career: (props) => <SvgIcon svg={careerRaw} {...props} />,
    Details: (props) => <SvgIcon svg={detailsRaw} {...props} />,
};

const SvgIcon = ({ svg, fill, stroke }) => {

    return <span dangerouslySetInnerHTML={{ __html:
        svg // inject raw
        .replace(/fill=".*?"/g, `fill="${fill}"`)
        .replace(/stroke=".*?"/g, `stroke="${stroke}"`)
     }} />;
};

export {contactIcons, sectionIcons}