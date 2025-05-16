import Header from "../layout/Header";

export default function ErrorPage() {
    return (
        <>
            <Header />
            <h1>404</h1>
            <p>Page not found</p>
            <p>Go back to the <a href="/">home page</a>.</p>
        </>
    )
}