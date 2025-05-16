
import BurgerMenuButton from "./BurgerMenuButton"
import { NavLink } from "react-router-dom"

export default function BurgerMenu({ burgerMenuOpen, setBurgerMenuOpen, links, customclassName }) {
    return (
        <div
            className={`burger-menu ${burgerMenuOpen ? 'burger-menu--open' : ''}`}
            role="dialog"
            aria-modal={burgerMenuOpen}
            aria-label="Navigation menu"
        >
            <div className="burger-menu__header">
                <h2 className="burger-menu__title">Menu</h2>
                <BurgerMenuButton
                    burgerMenuOpen={burgerMenuOpen}
                    setBurgerMenuOpen={setBurgerMenuOpen}
                    className={`burger-menu__close ${customclassName}`}
                    aria-label="Close menu"
                />
            </div>
            <nav className="burger-menu__nav">
                <ul className="burger-menu__list">
                    {links && links.map((link, index) => (
                        <li key={index} className="burger-menu__item">
                            <NavLink
                                to={link.path}
                                className="burger-menu__link"
                                onClick={() => setBurgerMenuOpen(false)}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}