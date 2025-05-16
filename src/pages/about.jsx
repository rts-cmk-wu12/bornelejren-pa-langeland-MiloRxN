import { useState, useEffect } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Hero from "../layout/Hero";
import ImageSlider from "../components/ImageSlider";
import { loadImages } from "../utils/image-loader";

// Fallback images in case loading fails
import houseView from "@assets/images/house-view.jpg";
import houseView2 from "@assets/images/house-view2.jpg";

export default function About() {
    const [sliderImages, setSliderImages] = useState([houseView, houseView2]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const images = await loadImages('/src/assets/images/');
                if (images && images.length > 0) {
                    setSliderImages(images);
                }
            } catch (error) {
                console.error('Failed to load images:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <>
            <Header />
            <main>
                <Hero heroText="Om os" />

                <div className="about__container">
                    {loading ? (
                        <div className="about__loading">Loading images...</div>
                    ) : (
                        <ImageSlider images={sliderImages} />
                    )}

                    <div className="about__text">
                        <p>
                            Børnelejren på Langeland er en velgørende, non-profit forening, som afholder
                            finansierede lejre for dårligt stillede børn og unge fra hele landet. Børnelejrene bliver
                            afholdt på foreningens bondegård, Søgård Hovedgård, som ligger i naturskønne
                            omgivelser på sydspidsen af Langeland. Samtlige omkostninger til alle børns ophold og
                            transport til/fra lejren bliver finansieret af foreningen, og det er et krav fra foreningens
                            side, at der ikke opkræves brugerbetaling af børnenes forældre for opholdet på Søgård.
                        </p>
                        <p>
                            Foreningens bestyrelse og frivillige hjælpere arbejder ulønnet for Foreningen.
                            Medarbejderne fra institutionerne på foreningens lejre, får ikke kolonitillæg udbetalt af
                            Foreningen.
                        </p>
                        <p>
                            Det er primært virksomheder og støttemedlemmer, der finansierer foreningens drift og
                            aktiviteter. Vi har heldigvis erfaret, at rigtig mange virksomheder er villige til at bakke op
                            omkring lejren, ligesom vi håber på endnu flere private, passive støttemedlemmer.
                        </p>
                        <p>
                            Alle skriftlige henvendelser vedrørende Foreningen Børnelejren på Langeland og Søgård
                            Hovedgård bedes venligst sendt til Knud Bro Alle 1, st. mf., 3660 Stenløse. Telefoniske
                            henvendelser bedes ligeledes rettet til sekretariatet på telefon 38711260. Foreningens
                            formand er dagligt at træffe i sekretariatet.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}