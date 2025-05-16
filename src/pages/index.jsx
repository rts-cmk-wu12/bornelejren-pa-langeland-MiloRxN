import Footer from "../layout/Footer";
import Grid from "../layout/Grid/Grid";
import GridItem from "../layout/Grid/GridItem";
import Header from "../layout/Header";
import Hero from "../layout/Hero";

import image from "@assets/images/house-view2.jpg";

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <Hero heroText="Velkommen" />

                <Grid>
                    <GridItem className="grid__item--image">
                        <img src={image} alt="Børnelejren på Langeland" className="grid__image" />
                    </GridItem>
                    <GridItem className="grid__item--text">
                        <p>
                            Børnelejren på Langeland er en forening, der udelukkende har til formål at sende dårligt
                            stillede børn og unge sammen med deres pædagoger på et ophold i landlige omgivelser på
                            det naturskønne Sydlangeland. 
                        </p>
                        <p>
                            Der er mange børn i verden, der ikke har det så godt, som de burde have det. Det gælder
                            desværre også i Danmark. Der er børn med medfødte handicap, børn der er blevet
                            alvorligt syge, børn der lider under omsorgssvigt eller bliver udsat for overgreb, børn der
                            har mistet én af eller begge deres forældre, børn der er tvangsfjernet fra deres hjem og
                            familie, børn der bliver mobbet i skolen, børn der vokser op i meget fattige familier, børn
                            fra skilsmisse- og sammenbragte familier - vi kender allesammen et barn, der tilhører en af
                            disse grupper, og det er disse børn, vi gerne vil gøre noget for.
                        </p>
                        <p>
                            Foreningen Børnelejren på Langeland samler penge ind fra erhvervslivet, fonde og private
                            til at sende dårligt stillede børn på et velfortjent lejrophold på Søgård. <b>Hjælp os med at
                                hjælpe dem!</b>
                        </p>
                    </GridItem>
                </Grid>
            </main>
            <Footer />
        </>
    );
}