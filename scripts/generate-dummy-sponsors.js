import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI;
console.log('Connecting to MongoDB at:', URI);

const companyNames = [
    'NordiskByg A/S',
    'Dansk Teknologi ApS',
    'Hansen Industries',
    'SuperBrugsen',
    'MøllerGruppen',
    'Scandi Design',
    'Grøn Energi Danmark',
    'Petersen & Søn',
    'Cafe Solskin',
    'Andersen Transport',
    'FjordFisk',
    'Københavns Kontor',
    'DanBolig',
    'Svendsen Teknik',
    'Vestjysk Bank',
    'Jørgens Bageri',
    'EcoHaven',
    'LysTech',
    'Nordsjællands Catering',
    'Digital Vækst'
];

const getRandomDate = () => {
    const now = new Date();
    const pastYear = new Date(now);
    pastYear.setFullYear(now.getFullYear() - 1);

    return new Date(
        pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime())
    );
};

const getRandomAmount = (supportType) => {
    switch (supportType) {
        case 'børnesponsorat':
            return Math.max(4000, Math.floor(Math.random() * 3000) + 4000);
        case 'lejrsponsorat':
            return Math.max(2000, Math.floor(Math.random() * 2000) + 2000);
        case 'støtte til foreningen':
            return Math.max(1000, Math.floor(Math.random() * 1500) + 1000);
        default:
            return 1000;
    }
};

const cleanCompanyNameForEmail = (name) => {
    return name
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/&/g, 'and')
        .replace(/æ/g, 'ae')
        .replace(/ø/g, 'oe')
        .replace(/å/g, 'aa')
        .replace(/[^a-z0-9]/g, ''); 
};

const sponsorSchema = new mongoose.Schema({
    supportType: {
        type: String,
        required: true,
        enum: ['børnesponsorat', 'lejrsponsorat', 'støtte til foreningen']
    },
    companyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    trophy: {
        type: Boolean,
        default: false,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

async function generateDummyData() {
    try {
        await mongoose.connect(URI, { dbName: 'bornelejren' });
        console.log('Connected to MongoDB');

        const Sponsor = mongoose.model('Sponsor', sponsorSchema);

        const count = await Sponsor.countDocuments();
        if (count > 0) {
            console.log(`Database already has ${count} sponsors. Adding more...`);
        }

        const sponsors = [];
        const supportTypes = ['børnesponsorat', 'lejrsponsorat', 'støtte til foreningen'];

        for (let i = 0; i < companyNames.length; i++) {
            const supportType = supportTypes[Math.floor(Math.random() * supportTypes.length)];
            const cleanName = cleanCompanyNameForEmail(companyNames[i]);

            sponsors.push({
                supportType,
                companyName: companyNames[i],
                email: `kontakt@${cleanName}.dk`,
                phone: `${Math.floor(Math.random() * 90000000 + 10000000)}`,
                amount: getRandomAmount(supportType),
                trophy: Math.random() > 0.5,
                createdAt: getRandomDate()
            });
        }

        const result = await Sponsor.insertMany(sponsors);
        console.log(`Successfully added ${result.length} dummy sponsors to database`);

        console.log('Sample of inserted data:');
        console.log(result.slice(0, 3).map(sponsor => ({
            companyName: sponsor.companyName,
            email: sponsor.email,
            supportType: sponsor.supportType,
            amount: sponsor.amount
        })));

    } catch (error) {
        console.error('Error generating dummy data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

generateDummyData();