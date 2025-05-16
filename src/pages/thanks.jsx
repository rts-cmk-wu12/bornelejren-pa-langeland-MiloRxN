import SponsorList from "../components/SponsorList";
import Grid from "../layout/Grid/Grid";
import GridItem from "../layout/Grid/GridItem";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Hero from "../layout/Hero";
import PeopleImage from '@assets/downloaded/people.png';

export default function ThanksPage() {
    return (
        <>
            <Header />
            <main>
                <Hero heroText="Børnelejren takker" />

                <Grid className="grid--thanks">
                    <GridItem className="grid__item--smallImage">
                        <img src={PeopleImage} alt="Personer"/>
                    </GridItem>
                    <GridItem className="grid__item--text">
                        <p>
                            Børnelejren på Langeland takker alle, der på den ene eller anden måde, har støttet
                            foreningens arbejde med at sende dårligt stillede børn på et ophold på Søgård Hovedgård
                            - det være sig ved naturaliesponsorater eller økonomisk støtte fra støttemedlemmer,
                            virksomhedssponsorer og donationer fra fonde.
                        </p>
                    </GridItem>
                </Grid>
                <SponsorList/>
            </main>
            <Footer/>
        </>
    )
}