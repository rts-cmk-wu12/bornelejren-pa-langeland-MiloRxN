import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Hero from "../layout/Hero";
import Grid from "../layout/Grid/Grid";
import GridItem from "../layout/Grid/GridItem";
import SponsorForm from "../components/SponsorForm";
export default function SponsorPage() {
    return (
        <>
            <Header />
            <main>
                <Hero heroText="Bliv Sponsor" />
                <Grid>
                    <GridItem className="grid__item--text">

                        <h2>Tilmeding Som Sponsor</h2>
                        <p>
                            Da det er meget individuelt, hvor meget en virksomhed kan og ønsker at støtte med, har vi
                            opdelt støttemulighederne i 3 kategorier:
                        </p>

                        <h2>Børnesponsorat</h2>
                        <p>
                            Hvis din virksomhed vælger at blive børnesponsor, dækker I omkostningerne for et
                            navngivet barns ophold og transport til og fra Langeland. Prisen pr. barn varierer fra lejr til
                            lejr, men vi har fastsat en gennemsnitspris på kr. 4.000,- pr. barn for et ophold. Denne pris
                            inkluderer transport, forplejning, forsikring, udflugter, adgangsbilletter til udflugtsmålene,
                            smågaver og slik til ét barn.
                        </p>

                        <h2>Lejrsponsorat</h2>
                        <p>
                            For kr. 2.000,- kan virksomheden blive lejrsponsor og være med til at dække alle
                            omkostningerne ved børnelejren, som bl.a. omfatter ejendommens drifts- og
                            vedligeholdelsesomkostninger samt eventuelle ekstra udgifter omkring en lejr, der f.eks.
                            kan være løn til specialuddannet personale.
                        </p>

                        <h2>Støtte til foreningen</h2>
                        <p>
                            Virksomheder, der ønsker at støtte foreningens arbejde med et mindre beløb, kan vælge
                            at blive diplomsponsorer. Af administrative årsager skal der minimum støttes med kr.
                            1.000,- for at man kan modtage et trykt diplom til ophængning i virksomheden, men alle
                            støttebeløb - store som små - er naturligvis velkomne.
                        </p>

                    </GridItem>

                    <GridItem>
                        <SponsorForm />
                    </GridItem>
                </Grid>
            </main>
            <Footer />
        </>
    )
}