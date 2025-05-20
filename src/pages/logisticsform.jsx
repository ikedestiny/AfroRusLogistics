import { useState } from 'react';
import Navbar from '../componets/navbar';
const LogisticsForm = ({ userType }) => {
    const [formData, setFormData] = useState({
        type: 'documents',
        direction: 'russia-nigeria',
        departureDate: '',
        weight: '',
        description: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        ...(userType === 'provider' && {
            companyName: '',
            capacity: '',
            availableRoutes: [],
            serviceType: 'standard'
        })
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
        // Here you would typically send the data to your backend API
        console.log('Form submitted:', formData);
        setSubmissionStatus('success');

        // Reset form after submission (or don't, depending on your workflow)
        setTimeout(() => {
            setSubmissionStatus(null);
            // If you want to clear the form after successful submission:
            // setFormData({...initialState});
        }, 3000);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {userType === 'client' ? 'Request Logistics Service' : 'Offer Logistics Service'}
            </h2>

            {submissionStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                    {userType === 'client'
                        ? 'Your request has been submitted successfully!'
                        : 'Your service offering has been submitted successfully!'}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Common fields for both clients and providers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                            Shipment Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="documents">Documents</option>
                            <option value="goods">Goods</option>
                            <option value="parcel">Parcel</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="direction" className="block text-sm font-medium text-gray-700 mb-1">
                            Direction
                        </label>
                        <select
                            id="direction"
                            name="direction"
                            value={formData.direction}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="russia-nigeria">Russia → Nigeria</option>
                            <option value="nigeria-russia">Nigeria → Russia</option>
                            <option value="both">Both Directions</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">
                            {userType === 'client' ? 'Preferred Departure Date' : 'Next Available Date'}
                        </label>
                        <input
                            type="date"
                            id="departureDate"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div>
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                            {userType === 'client' ? 'Estimated Weight (kg)' : 'Available Capacity (kg)'}
                        </label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder={userType === 'client' ? 'e.g. 5' : 'e.g. 20'}
                            required
                            min="0.1"
                            step="0.1"
                        />
                    </div>
                </div>

                {/* Provider-specific fields */}
                {userType === 'provider' && (
                    <>
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                                Company Name
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your company name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Available Routes
                            </label>
                            <div className="space-y-2">
                                {['russia-nigeria', 'nigeria-russia'].map((route) => (
                                    <div key={route} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`route-${route}`}
                                            name="availableRoutes"
                                            value={route}
                                            checked={formData.availableRoutes.includes(route)}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor={`route-${route}`} className="ml-2 block text-sm text-gray-700">
                                            {route.replace('-', ' → ')}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                                Service Type
                            </label>
                            <select
                                id="serviceType"
                                name="serviceType"
                                value={formData.serviceType}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="standard">Standard</option>
                                <option value="express">Express</option>
                                <option value="premium">Premium</option>
                            </select>
                        </div>
                    </>
                )}

                {/* Description field */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        {userType === 'client' ? 'Additional Request Details' : 'Service Description'}
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder={
                            userType === 'client'
                                ? 'Describe what you need to ship (e.g. document type, goods description)'
                                : 'Describe your service offerings (e.g. special handling, customs assistance)'
                        }
                    />
                </div>

                {/* Contact information */}
                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="contactName"
                                name="contactName"
                                value={formData.contactName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="contactEmail"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="contactPhone"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                            placeholder="Include country code (e.g. +234 or +7)"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        {userType === 'client' ? 'Submit Request' : 'Offer Service'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogisticsForm;