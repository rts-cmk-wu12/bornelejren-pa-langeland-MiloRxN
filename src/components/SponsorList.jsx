import { useState, useEffect } from "react";
import { formatDate, sortByDate } from "../utils/date-utils";

export default function SponsorList() {
    const [sponsors, setSponsors] = useState([]);
    const [filteredSponsors, setFilteredSponsors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                const response = await fetch('/api/sponsors');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Sort sponsors by date, newest first
                const sortedSponsors = [...data].sort(sortByDate('createdAt'));
                setSponsors(sortedSponsors);
                setFilteredSponsors(sortedSponsors);
                setLoading(false);
            } catch (error) {
                setError('Der opstod en fejl ved hentning af sponsorer');
                setLoading(false);
                console.error('Failed to fetch sponsors:', error);
            }
        };

        fetchSponsors();
    }, []);

    useEffect(() => {
        if (activeFilter === "all") {
            setFilteredSponsors(sponsors);
        } else {
            const filtered = sponsors.filter(sponsor =>
                sponsor.supportType === activeFilter
            );
            setFilteredSponsors(filtered);
        }
    }, [activeFilter, sponsors]);

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    if (loading) return <p>Indlæser sponsorer...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="sponsor-list">
            <h2>En særlig tak til:</h2>

            <div className="sponsor-list__filters">
                <button
                    className={`sponsor-list__filter ${activeFilter === "all" ? "sponsor-list__filter--active" : ""}`}
                    onClick={() => handleFilterChange("all")}
                >
                    Alle
                </button>
                <button
                    className={`sponsor-list__filter ${activeFilter === "børnesponsorat" ? "sponsor-list__filter--active" : ""}`}
                    onClick={() => handleFilterChange("børnesponsorat")}
                >
                    Børnesponsorat
                </button>
                <button
                    className={`sponsor-list__filter ${activeFilter === "lejrsponsorat" ? "sponsor-list__filter--active" : ""}`}
                    onClick={() => handleFilterChange("lejrsponsorat")}
                >
                    Lejrsponsorat
                </button>
                <button
                    className={`sponsor-list__filter ${activeFilter === "støtte til foreningen" ? "sponsor-list__filter--active" : ""}`}
                    onClick={() => handleFilterChange("støtte til foreningen")}
                >
                    Støtte til foreningen
                </button>
            </div>

            {sponsors.length === 0 ? (
                <p className="sponsor-list__empty">Ingen sponsorer fundet. Vær den første til at støtte vores arbejde!</p>
            ) : filteredSponsors.length === 0 ? (
                <p className="sponsor-list__empty">Ingen sponsorer i denne kategori endnu.</p>
            ) : (
                <ul className="sponsor-list__items">
                    {filteredSponsors.map((sponsor) => (
                        <li key={sponsor._id} className="sponsor-list__item">
                            <div className="sponsor-list__details">
                                <span className="sponsor-list__date">
                                    {formatDate(sponsor.createdAt, { format: 'short', locale: 'da-DK' })}
                                </span>
                                <span className="sponsor-list__name">
                                    {sponsor.companyName}
                                </span>
                                <span className="sponsor-list__amount">
                                    {sponsor.amount} kr.
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}