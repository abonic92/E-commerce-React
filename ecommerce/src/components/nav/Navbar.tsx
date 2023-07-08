import { Link } from "react-router-dom"
import "./nav.css"

function Nav(){
    return(
        <nav>
            <input type="checkbox" id="toggle" />
            <div className="logo">
                <Link to="/">
                    <ul>
                        <li><i className="fa-solid fa-bag-shopping"></i></li>
                        <li>E-Commerce</li>
                    </ul>
                </Link>
                
            </div>
                <ul className="list">
                    <li><Link to={"/"}>Inicio</Link></li>
                    <li><Link to={"/categories"}>Categorías</Link></li>
                    <li><Link to={"/products"}>Productos</Link></li>
                    <li><Link to={"/cart-detail"}><i className="fa-solid fa-cart-shopping"></i></Link></li>
                </ul>
                <label htmlFor="toggle" className="icon-bars">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>                   
                </label>            
        </nav>
        
    )
}

export default Nav