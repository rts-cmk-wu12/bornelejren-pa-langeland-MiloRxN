import { NavLink } from "react-router-dom";
import BurgerMenuButton from "../components/BurgerMenuButton";
import BurgerMenu from "../components/BurgerMenu";
import { useState, useEffect } from "react";

export default function Header() {
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const links = [
        { name: "Hjem", path: "/" },
        { name: "Om os", path: "/about" },
        { name: "Bliv sponsor", path: "/sponsor" },
        { name: "Børnelejren takker", path: "/thanks" }
    ];

    useEffect(() => {
        if (burgerMenuOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }

        return () => {
            document.body.classList.remove('menu-open');
        };
    }, [burgerMenuOpen]);

    return (
        <header className='header'>
            <h1 className="header__heading">Børnelejren på langeland</h1>
            <div className="header__logo">
                <img src='/logo.svg' alt="sidens logo" />
            </div>
            <nav className="header__navigation" aria-label="Main navigation">
                <BurgerMenuButton
                    burgerMenuOpen={burgerMenuOpen}
                    setBurgerMenuOpen={setBurgerMenuOpen}
                />
                <ul className="header__navigation-list" id="desktop-menu">
                    {links.map((link, index) => (
                        <li key={index} className="header__navigation-item">
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "header__navigation-link header__navigation-link--active"
                                        : "header__navigation-link"
                                }
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <BurgerMenu
                burgerMenuOpen={burgerMenuOpen}
                setBurgerMenuOpen={setBurgerMenuOpen}
                links={links}
                customclassName="burger-menu__close--mobile"
            />
        </header>
    )
}