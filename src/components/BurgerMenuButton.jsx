import { GrClose } from "react-icons/gr"
import { IoIosMenu } from "react-icons/io"

export default function BurgerMenuButton({ burgerMenuOpen, setBurgerMenuOpen, className = "" }) {
    return (
        <button
            className={`burger-menu-button ${className}`}
            onClick={() => setBurgerMenuOpen(prevState => !prevState)}
            aria-expanded={burgerMenuOpen}
            aria-label={burgerMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
        >
            {burgerMenuOpen ? <GrClose aria-hidden="true" /> : < IoIosMenu size={'2rem'} aria-hidden="true" />}
            <span className="visually-hidden">{burgerMenuOpen ? "Close menu" : "Open menu"}</span>
        </button>
    )
}