import { NavLink, Outlet } from "react-router-dom";
import cinemagic from '../components/img/cinemagic.png'
import cart from '../components/img/cart.png';

export default function RootLayout() {

  return (
    <div className="root-layout">
        <header>
            <nav>
                <NavLink to="/">
                  <img src={cinemagic} alt="Logo"/>
                </NavLink>
                <div>
                  <NavLink to="/" id="home">Movies</NavLink>
                  <NavLink to="/favorites">Favorite Movies</NavLink>
                  <NavLink to="/checkout">
                    <img src={cart} id="cart-img"alt="Cart"/>
                  </NavLink>
                </div>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}
