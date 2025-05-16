import heroImage from "@assets/images/house-view.jpg";

export default function Hero({heroText="Remember to be awesome"}) {

    console.log(heroText);
    
    return (
        <>
        <section className="hero">
            <h2 className="hero__heading">
                {heroText}
            </h2>
            <img className="hero__image" src={heroImage} alt="forside af hovedhuset"/>
        </section>
        </>
    )
}