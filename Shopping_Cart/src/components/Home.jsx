import { Link } from 'react-router-dom'
import banner from '../assets/banner.jpg'

function HomePage() {

    return (
        <>
            <section className="section">
                <h1 className="section-title"><span>Shopping Cart Demo</span></h1>
                <div className="big-banner">
                    <Link to="/about">
                        <img src={banner} alt="" width="1600" height="500" />
                    </Link>
                </div>
            </section>
            <section className="section">
                <h2 className="section-title"><span>Featured Products</span></h2>
            </section>
        </>
    )
}
export default HomePage