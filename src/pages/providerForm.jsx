import { useState } from 'react';

const ProviderLogisticsForm = () => {
    const [formData, setFormData] = useState({
        type: 'documents',
        direction: 'russia-nigeria',
        departureDate: '',
        weight: '',
        description: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        companyName: '',
        availableRoutes: [],
        serviceType: 'standard'
    });

    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            const updatedRoutes = checked
                ? [...formData.availableRoutes, value]
                : formData.availableRoutes.filter(route => route !== value);
            setFormData(prev => ({ ...prev, availableRoutes: updatedRoutes }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Provider form submitted:', formData);
        setSubmissionStatus('success');
        setTimeout(() => setSubmissionStatus(null), 3000);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Offer Logistics Service</h2>
            {submissionStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                    Your service offering has been submitted successfully!
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
                        <label htmlFor="direction" className="block mb-1">Direction</label>
                        <select
                            id="direction"
                            name="direction"
                            value={formData.direction}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded"
                        >
                            <option value="russia-nigeria">Russia → Nigeria</option>
                            <option value="nigeria-russia">Nigeria → Russia</option>
                            <option value="both">Both</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="departureDate" className="block mb-1">Next Available Date</label>
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
                        <label htmlFor="weight" className="block mb-1">Available Capacity (kg)</label>
                        <input
                            id="weight"
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                            min="0.1"
                            step="0.1"
                            className="w-full border px-4 py-2 rounded"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="companyName" className="block mb-1">Company Name</label>
                    <input
                        id="companyName"
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full border px-4 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2">Available Routes</label>
                    {['russia-nigeria', 'nigeria-russia'].map((route) => (
                        <div key={route} className="flex items-center">
                            <input
                                id={`route-${route}`}
                                type="checkbox"
                                name="availableRoutes"
                                value={route}
                                checked={formData.availableRoutes.includes(route)}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor={`route-${route}`}>{route.replace('-', ' → ')}</label>
                        </div>
                    ))}
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

                <div>
                    <label htmlFor="description" className="block mb-1">Service Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border px-4 py-2 rounded"
                    />
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="contactName" className="block mb-1">Full Name</label>
                            <input
                                id="contactName"
                                type="text"
                                name="contactName"
                                value={formData.contactName}
                                onChange={handleChange}
                                required
                                className="w-full border px-4 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="contactEmail" className="block mb-1">Email Address</label>
                            <input
                                id="contactEmail"
                                type="email"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                required
                                className="w-full border px-4 py-2 rounded"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="contactPhone" className="block mb-1">Phone Number</label>
                        <input
                            id="contactPhone"
                            type="tel"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleChange}
                            required
                            placeholder="e.g. +234..."
                            className="w-full border px-4 py-2 rounded"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                    >
                        Offer Service
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProviderLogisticsForm;