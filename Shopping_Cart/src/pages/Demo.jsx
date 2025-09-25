import icon from '../assets/react.png'

function DemoPage() {

    return (
        <section className="section demo">
            <h1 className="section-title title">
                <span>Just a shopping cart demo</span>
            </h1>
            <div className="section-body content">
                <img src={icon} className="image animate" width="150" height="150" alt="" />
                <p className="text">As of now only the Catalog and Shopping Cart functionalities are implemented.
                    Other content, blog, checkout, may be added to the application later.</p>
                <p className="text">Check source code on {''}
                    <a href="https://github.com/H-Gospodinov/TheOdinProject_-_React" target="_blank" rel="noopener">GitHub</a>
                </p>
            </div>
        </section>
    )
}
export default DemoPage