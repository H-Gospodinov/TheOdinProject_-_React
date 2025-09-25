import icon from '../assets/organic.png'

function AboutPage() {

    return (
        <section className="section demo">
            <h1 className="section-title title">
                <span>About Organic food store</span>
            </h1>
            <div className="section-body content">
                <img src={icon} className="image" width="150" height="150" alt="" />
                <p className="text">Just a demo of a single-page Shopping Cart application, not a real online food store. Thanks for visiting.</p>
                <p className="text">Check source code on {''}
                    <a href="https://github.com/H-Gospodinov/TheOdinProject_-_React" target="_blank" rel="noopener">GitHub</a>
                </p>
            </div>
        </section>
    );
}
export default AboutPage