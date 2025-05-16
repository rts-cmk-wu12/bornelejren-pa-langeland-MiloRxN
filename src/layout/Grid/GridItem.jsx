export default function GridItem({ children, className = "" }) {
    return (
        <div className={`grid__item ${className}`}>
            {children}
        </div>
    )
}