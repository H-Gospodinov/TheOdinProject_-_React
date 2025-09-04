import icon from '../assets/organic.png'

function AboutPage() {

    return (
        <div className="demo">
            <img src={icon} width="150" height="150" className="icon" alt="" />
            <p className="text">Just a demo of a single-page Shopping Cart application, not a real online food store. Thanks for visiting.</p>
            <p className="text">Check source code on
                <a href="https://github.com/H-Gospodinov/TheOdinProject_-_React" target="_blank" rel="noopener">GitHub</a>
            </p>
        </div>
    )
}
export default AboutPage