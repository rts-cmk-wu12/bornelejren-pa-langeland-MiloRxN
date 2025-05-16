import { currentYear } from "../utils/date-utils";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content">
                <small>{currentYear} Børnelejren på langeland &copy;  All rights reserved.</small>
            </div>
        </footer>
    )
}