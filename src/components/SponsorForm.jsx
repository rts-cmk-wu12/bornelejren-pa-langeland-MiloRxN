import { useState, useEffect } from 'react';

export default function SponsorForm() {
    const [formData, setFormData] = useState({
        supportType: '',
        companyName: '',
        email: '',
        address: '',
        postalCode: '',
        phone: '',
        amount: '',
        trophy: false
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState(null);

    // Auto-hide 3sec
    useEffect(() => {
        if (submitResult) {
            const timer = setTimeout(() => {
                setSubmitResult(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [submitResult]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'supportType') {
            let newamount = formData.amount;

            if (value === 'børn' && (Number(formData.amount) < 4000 || formData.amount === '')) {
                newamount = 4000;
            }
            else if (value === 'lejr' && (Number(formData.amount) < 2000 || formData.amount === '')) {
                newamount = 2000;
            }

            setFormData({
                ...formData,
                [name]: value,
                amount: newamount
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.supportType) newErrors.supportType = 'Vælg venligst en støttetype';
        if (!formData.companyName) newErrors.companyName = 'Firmanavn er påkrævet';
        if (!formData.email) newErrors.email = 'Email er påkrævet';
        if (!formData.address) newErrors.address = 'Adresse er påkrævet';
        if (!formData.postalCode) newErrors.postalCode = 'Postnummer er påkrævet';
        if (!formData.phone) newErrors.phone = 'Telefonnummer er påkrævet';
        if (!formData.amount) newErrors.amount = 'Beløb er påkrævet';

        if (formData.postalCode && !/^\d{4}$/.test(formData.postalCode)) {
            newErrors.postalCode = 'Postnummer skal bestå af 4 cifre';
        }

        if (formData.phone && !/^\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Indtast venligst et gyldigt telefonnummer';
        }

        if (formData.amount && (isNaN(formData.amount) || Number(formData.amount) <= 0)) {
            newErrors.amount = 'Beløbet skal være et positivt tal';
        }

        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setSubmitResult(null);

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitting(false);
            return;
        }

        const data = {
            ...formData,
            supportType: mapSupportType(formData.supportType)
        };

        try {
            const response = await fetch('/api/sponsors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setSubmitResult({ success: true });

            // reset
            setFormData({
                supportType: '',
                companyName: '',
                email: '',
                address: '',
                postalCode: '',
                phone: '',
                amount: '',
                trophy: false
            });
        } catch (error) {
            setSubmitResult({ success: false });
        } finally {
            setSubmitting(false);
        }
    };

    const mapSupportType = (type) => {
        const mapping = {
            'børn': 'børnesponsorat',
            'lejr': 'lejrsponsorat',
            'forening': 'støtte til foreningen'
        };
        return mapping[type] || type;
    };

    return (
        <form onSubmit={handleSubmit} className="sponsor-form">
            {submitResult && (
                <div className={`form-message ${submitResult.success ? 'form-message--success' : 'form-message--error'}`}>
                    {submitResult.success ?
                        <>
                            <p>Vi har modtaget din tilmelding.</p>
                            <p>Tak for din støtte!</p>
                        </> : submitResult.message || 'Der opstod en fejl. Prøv venligst igen.'
                    }
                </div>
            )}

            <label>
                Støttetype
                <select
                    name="supportType"
                    id="supportType"
                    value={formData.supportType}
                    onChange={handleChange}
                >
                    <option value="">Vælg støttetype</option>
                    <option value="børn">Børnesponsorat</option>
                    <option value="lejr">Lejrsponsorat</option>
                    <option value="forening">Støtte til foreningen</option>
                </select>
                {errors.supportType && <span className="error-message">{errors.supportType}</span>}
            </label>

            <label>
                Firmanavn
                <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                />
                {errors.companyName && <span className="error-message">{errors.companyName}</span>}
            </label>

            <label>
                Email
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
            </label>

            <label>
                Adresse
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
            </label>

            <label>
                Postnummer
                <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    maxLength="4"
                />
                {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
            </label>

            <label>
                Telefon
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
            </label>

            <label>
                Beløb
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    min={formData.supportType === 'børn' ? 4000 : formData.supportType === 'lejr' ? 2000 : 0}
                    value={formData.amount}
                    onChange={handleChange}
                />
                {errors.amount && <span className="error-message">{errors.amount}</span>}
            </label>

            <button type="submit" disabled={submitting}>
                {submitting ? 'Donerer...' : 'Donér'}
            </button>
        </form>
    );
}