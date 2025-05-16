import { useState, useEffect, useRef } from 'react';
import { debounce } from '../utils/interaction-utils';

export default function ImageSlider({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef(null);
    const lastInteractionTimeRef = useRef(new Date());

    useEffect(() => {
        const startTimer = () => {
            return setInterval(() => {
                const now = new Date();
                const timeSinceLastInteraction = now - lastInteractionTimeRef.current;

                if (!isPaused && timeSinceLastInteraction >= 3000) {
                    setCurrentIndex((prevIndex) =>
                        prevIndex === images.length - 1 ? 0 : prevIndex + 1
                    );
                }
            }, 5000);
        };

        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = startTimer();

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [images.length, isPaused]);

    const goToNextSlide = debounce(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        lastInteractionTimeRef.current = new Date();
    }, 200);

    const goToPrevSlide = debounce(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        lastInteractionTimeRef.current = new Date();
    }, 200);

    const goToSlide = debounce((index) => {
        setCurrentIndex(index);
        lastInteractionTimeRef.current = new Date();
    }, 200);

    return (
        <div
            className="slider"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="slider__container">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`slider__item ${index === currentIndex ? 'slider__item--active' : ''}`}
                        style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
                    >
                        <img src={image} alt={`Slide ${index + 1}`} className="slider__image" />
                    </div>
                ))}
            </div>

            <button className="slider__control slider__control--prev" onClick={goToPrevSlide} aria-label="Previous slide">
                &lt;
            </button>
            <button className="slider__control slider__control--next" onClick={goToNextSlide} aria-label="Next slide">
                &gt;
            </button>

            <div className="slider__indicators">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`slider__indicator ${index === currentIndex ? 'slider__indicator--active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}