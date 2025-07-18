import { useState } from 'react';
import { spaceStore } from '../state/spaceStore';

const ClientLogisticsForm = () => {
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

    const { addNeededSpaceForDoc, addNeededSpaceForLoad } = spaceStore.getState();

    const [formData, setFormData] = useState({
        departureCountry: '',
        departureCity: '',
        arrivalCountry: '',
        arrivalCity: '',
        departureDate: '',
        weightKg: '',
        description: '',
        serviceType: 'standard',
        type: 'documents'
    });

    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (formData.type === 'documents') {
                await addNeededSpaceForDoc(formData);
            } else {
                await addNeededSpaceForLoad(formData);
            }

            setSubmissionStatus('success');
            // Reset form after successful submission
            setFormData({
                departureCountry: '',
                departureCity: '',
                arrivalCountry: '',
                arrivalCity: '',
                departureDate: '',
                weightKg: '',
                description: '',
                serviceType: 'standard',
                type: 'documents'
            });
        } catch (error) {
            setSubmissionStatus('error');
            console.error('Submission error:', error);
        } finally {
            setIsLoading(false);
            setTimeout(() => setSubmissionStatus(null), 3000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Request Logistics Service</h2>

            {submissionStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                    Your logistics request has been submitted successfully!
                </div>
            )}

            {submissionStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                    There was an error submitting your request. Please try again.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="type" className="block mb-1">Shipment Type</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded"
                        >
                            <option value="documents">Documents</option>
                            <option value="goods">Goods</option>
                            <option value="parcel">Parcel</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="serviceType" className="block mb-1">Service Type</label>
                        <select
                            id="serviceType"
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded"
                        >
                            <option value="standard">Standard</option>
                            <option value="express">Express</option>
                            <option value="premium">Premium</option>
                        </select>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Route Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="departureCountry" className="block mb-1">Departure Country</label>
                            <select
                                id="departureCountry"
                                name="departureCountry"
                                value={formData.departureCountry}
                                onChange={handleChange}
                                required
                                className="w-full border px-4 py-2 rounded"
                            >
                                <option value="">Select country</option>
                                <option value="russia">Russia</option>
                                <option value="nigeria">Nigeria</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="departureCity" className="block mb-1">Departure City</label>
                            <select
                                id="departureCity"
                                name="departureCity"
                                value={formData.departureCity}
                                onChange={handleChange}
                                required
                                className="w-full border px-4 py-2 rounded"
                                disabled={!formData.departureCountry}
                            >
                                <option value="">Select city</option>
                                {formData.departureCountry === 'russia' ? (
                                    russianCities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))
                                ) : formData.departureCountry === 'nigeria' ? (
                                    nigerianCities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))
                                ) : null}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label htmlFor="arrivalCountry" className="block mb-1">Arrival Country</label>
                            <select
                                id="arrivalCountry"
                                name="arrivalCountry"
                                value={formData.arrivalCountry}
                                onChange={handleChange}
                                required
                                className="w-full border px-4 py-2 rounded"
                            >
                                <option value="">Select country</option>
                                <option value="russia">Russia</option>
                                <option value="nigeria">Nigeria</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="arrivalCity" className="block mb-1">Arrival City</label>
                            <select
                                id="arrivalCity"
                                name="arrivalCity"
                                value={formData.arrivalCity}
                                onChange={handleChange}
                                required
                                className="w-full border px-4 py-2 rounded"
                                disabled={!formData.arrivalCountry}
                            >
                                <option value="">Select city</option>
                                {formData.arrivalCountry === 'russia' ? (
                                    russianCities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))
                                ) : formData.arrivalCountry === 'nigeria' ? (
                                    nigerianCities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))
                                ) : null}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="departureDate" className="block mb-1">Preferred Departure Date</label>
                        <input
                            id="departureDate"
                            type="date"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full border px-4 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="weightKg" className="block mb-1">Estimated Weight (kg)</label>
                        <input
                            id="weightKg"
                            type="number"
                            name="weightKg"
                            value={formData.weightKg}
                            onChange={handleChange}
                            required
                            min="0.1"
                            step="0.1"
                            className="w-full border px-4 py-2 rounded"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block mb-1">Shipment Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border px-4 py-2 rounded"
                        placeholder="Provide any special instructions or content details..."
                    />
                </div>

                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Submitting...' : 'Request Service'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClientLogisticsForm;