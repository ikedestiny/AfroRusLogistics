import { useState, useEffect } from 'react';
import { spaceStore } from '../state/spaceStore';

const ModernLogisticsHomepage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [direction, setDirection] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const { all, fetchAll } = spaceStore.getState();

                if (!all || all.length === 0) {
                    await fetchAll();
                }

                // Transform the API data to match your frontend structure
                const formattedSlots = spaceStore.getState().all.map(slot => ({
                    id: slot.id,
                    type: slot.type === 'DOCUMENT_AVAILABLE' ? 'documents' : 'goods',
                    direction: `${slot.departureCity} → ${slot.arrivalCity}`,
                    departureDate: slot.availableFrom || new Date().toISOString(),
                    availableSpace: slot.weightKg ? `${slot.weightKg}kg` : 'Flexible',
                    status: slot.type.includes('AVAILABLE') ? 'available' : 'looking',
                    contact: slot.userId || 'N/A',
                    verified: slot.verifiedUser || false,
                    rawData: slot // Keep original data for reference
                }));

                setSlots(formattedSlots);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Nigerian state capitals
    const nigerianCities = [
        'Abuja', 'Abeokuta', 'Ado Ekiti', 'Akure', 'Asaba', 'Awka', 'Bauchi',
        'Benin City', 'Birnin Kebbi', 'Calabar', 'Dutse', 'Enugu', 'Gombe',
        'Gusau', 'Ibadan', 'Ikeja', 'Ilorin', 'Jalingo', 'Jos', 'Kaduna',
        'Kano', 'Katsina', 'Lafia', 'Lokoja', 'Maiduguri', 'Makurdi', 'Minna',
        'Ogbomosho', 'Ondo', 'Onitsha', 'Osogbo', 'Owerri', 'Port Harcourt',
        'Sokoto', 'Umuahia', 'Uyo', 'Warri', 'Yenagoa', 'Yola', 'Zaria'
    ];

    // Major Russian cities
    const russianCities = [
        'Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan',
        'Nizhny Novgorod', 'Chelyabinsk', 'Samara', 'Omsk', 'Rostov-on-Don',
        'Ufa', 'Krasnoyarsk', 'Perm', 'Voronezh', 'Volgograd', 'Krasnodar',
        'Saratov', 'Tyumen', 'Tolyatti', 'Izhevsk', 'Barnaul', 'Ulyanovsk',
        'Irkutsk', 'Khabarovsk', 'Yaroslavl', 'Vladivostok', 'Makhachkala',
        'Tomsk', 'Orenburg', 'Kemerovo', 'Novokuznetsk', 'Ryazan', 'Astrakhan',
        'Naberezhnye Chelny', 'Sochi', 'Penza', 'Lipetsk', 'Kirov', 'Cheboksary',
        'Tula', 'Kaliningrad', 'Balashikha', 'Kursk', 'Stavropol', 'Ulan-Ude',
        'Bryansk', 'Ivanovo', 'Magnitogorsk', 'Tver', 'Belgorod', 'Arkhangelsk'
    ];

    const filteredSlots = slots.filter(slot => {
        const typeMatch = activeTab === 'all' || slot.type === activeTab;
        const statusMatch = statusFilter === 'all' || slot.status === statusFilter;

        // Skip direction filtering if 'all' is selected
        if (direction === 'all') {
            return typeMatch && statusMatch;
        }

        // Extract city and country information
        const departureCity = slot.rawData.departureCity?.toLowerCase();
        const arrivalCity = slot.rawData.arrivalCity?.toLowerCase();

        // Determine country based on city lists
        const isDepartureNigeria = nigerianCities.some(city =>
            city.toLowerCase() === departureCity
        );
        const isDepartureRussia = russianCities.some(city =>
            city.toLowerCase() === departureCity
        );
        const isArrivalNigeria = nigerianCities.some(city =>
            city.toLowerCase() === arrivalCity
        );
        const isArrivalRussia = russianCities.some(city =>
            city.toLowerCase() === arrivalCity
        );

        // Handle direction filtering
        let directionMatch = false;
        if (direction === 'russia-nigeria') {
            directionMatch = (isDepartureRussia && isArrivalNigeria) ||
                (departureCity === 'russia' && arrivalCity === 'nigeria');
        } else if (direction === 'nigeria-russia') {
            directionMatch = (isDepartureNigeria && isArrivalRussia) ||
                (departureCity === 'nigeria' && arrivalCity === 'russia');
        }

        return typeMatch && directionMatch && statusMatch;
    });

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading slots...</div>;
    }

    return (
        <div className="min-h-screen bg-neutral-50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Filters - Three-tier system */}
                <div className="mb-12 space-y-4">
                    {/* Status filters */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {['all', 'available', 'looking'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-5 py-2 text-sm rounded-full transition-all ${statusFilter === status
                                    ? 'bg-black text-white'
                                    : 'bg-transparent text-neutral-600 hover:bg-neutral-100'
                                    }`}
                            >
                                {status === 'all' ? 'All Statuses' :
                                    status === 'available' ? 'Space Available' : 'Needing Space'}
                            </button>
                        ))}
                    </div>

                    {/* Type filters */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {['all', 'documents', 'goods'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 text-sm rounded-full transition-all ${activeTab === tab
                                    ? 'bg-black text-white'
                                    : 'bg-transparent text-neutral-600 hover:bg-neutral-100'
                                    }`}
                            >
                                {tab === 'all' ? 'All Types' : tab}
                            </button>
                        ))}
                    </div>

                    {/* Direction filters */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {['all', 'russia-nigeria', 'nigeria-russia'].map((dir) => (
                            <button
                                key={dir}
                                onClick={() => setDirection(dir)}
                                className={`px-5 py-2 text-sm rounded-full transition-all ${direction === dir
                                    ? 'bg-black text-white'
                                    : 'bg-transparent text-neutral-600 hover:bg-neutral-100'
                                    }`}
                            >
                                {dir === 'all' ? 'All Directions' : dir.replace('-', ' → ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Slots Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredSlots.length > 0 ? (
                        filteredSlots.map((slot) => (
                            <div
                                key={slot.id}
                                className="bg-white rounded-none border border-neutral-200 hover:border-neutral-300 transition-colors"
                            >
                                <div className="p-5 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`text-xs uppercase tracking-wider ${slot.type === 'documents' ? 'text-blue-600' : 'text-purple-600'
                                            }`}>
                                            {slot.type}
                                        </span>
                                        <span className={`text-xs px-2 py-1 ${slot.status === 'available'
                                            ? 'bg-green-50 text-green-700'
                                            : 'bg-orange-50 text-orange-700'
                                            }`}>
                                            {slot.status === 'available' ? 'Space available' : 'Needs space'}
                                        </span>
                                    </div>

                                    <div className="mb-4 flex-grow">
                                        <h3 className="text-xl font-light mb-3">
                                            {slot.direction}
                                        </h3>

                                        <div className="space-y-2 text-sm text-neutral-600">
                                            <div className="flex justify-between border-b border-neutral-100 pb-2">
                                                <span>Departure</span>
                                                <span className="font-medium">
                                                    {new Date(slot.departureDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Capacity</span>
                                                <span className="font-medium">{slot.availableSpace}</span>
                                            </div>
                                            {slot.verified && (
                                                <div className="flex justify-between">
                                                    <span>Verified</span>
                                                    <span className="font-medium">✓</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button className="mt-auto w-full py-2.5 text-sm border border-black bg-black text-white hover:bg-white hover:text-black transition-all">
                                        {slot.status === 'available' ? 'Book Space' : 'Offer Space'}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-16">
                            <p className="text-neutral-400">No matching slots found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModernLogisticsHomepage;