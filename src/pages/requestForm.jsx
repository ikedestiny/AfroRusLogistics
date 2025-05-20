import { useState } from 'react';

const ClientLogisticsForm = () => {
    const [formData, setFormData] = useState({
        type: 'documents',
        direction: 'russia-nigeria',
        departureDate: '',
        weight: '',
        description: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        serviceType: 'standard'
    });

    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Client form submitted:', formData);
        setSubmissionStatus('success');
        setTimeout(() => setSubmissionStatus(null), 3000);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Request Logistics Service</h2>
            {submissionStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                    Your logistics request has been submitted successfully!
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="type">Shipment Type</label>
                        <select
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
                        <label htmlFor="direction">Direction</label>
                        <select
                            name="direction"
                            value={formData.direction}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded"
                        >
                            <option value="russia-nigeria">Russia → Nigeria</option>
                            <option value="nigeria-russia">Nigeria → Russia</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="departureDate">Preferred Departure Date</label>
                        <input
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
                        <label htmlFor="weight">Estimated Weight (kg)</label>
                        <input
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
                    <label htmlFor="serviceType">Service Type</label>
                    <select
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
                    <label htmlFor="description">Shipment Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border px-4 py-2 rounded"
                        placeholder="Provide any special instructions or content details..."
                    />
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="contactName">Full Name</label>
                            <input
                                type="text"
                                name="contactName"
                                value={formData.contactName}
                                onChange={handleChange}
                                required
                                className="w-full border px-4 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="contactEmail">Email Address</label>
                            <input
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
                        <label htmlFor="contactPhone">Phone Number</label>
                        <input
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
                        Request Service
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClientLogisticsForm;
