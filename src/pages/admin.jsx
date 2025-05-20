import { useState } from 'react';

const AdminDashboard = () => {
    // State for tabs and filters
    const [activeTab, setActiveTab] = useState('pending');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample data - replace with real data from your backend
    const [requests, setRequests] = useState([
        {
            id: 1,
            type: 'documents',
            direction: 'russia-nigeria',
            departureDate: '2023-11-15',
            weight: '3kg',
            status: 'pending',
            client: {
                name: 'Ibrahim Musa',
                email: 'ibrahim@example.com',
                phone: '+2348012345678'
            },
            provider: null
        },
        {
            id: 2,
            type: 'goods',
            direction: 'nigeria-russia',
            departureDate: '2023-11-18',
            weight: '15kg',
            status: 'matched',
            client: {
                name: 'Olga Petrova',
                email: 'olga@example.com',
                phone: '+79161234567'
            },
            provider: {
                name: 'DHL International',
                email: 'dhl@example.com',
                phone: '+79167654321'
            }
        },
        {
            id: 3,
            type: 'documents',
            direction: 'russia-nigeria',
            departureDate: '2023-11-20',
            weight: '5kg',
            status: 'pending',
            client: {
                name: 'Amina Lawal',
                email: 'amina@example.com',
                phone: '+2348023456789'
            },
            provider: null
        },
    ]);

    const [providers, setProviders] = useState([
        {
            id: 1,
            name: 'DHL International',
            email: 'dhl@example.com',
            phone: '+79167654321',
            capacity: '20kg',
            routes: ['russia-nigeria', 'nigeria-russia'],
            status: 'available'
        },
        {
            id: 2,
            name: 'EMS Russian Post',
            email: 'ems@example.com',
            phone: '+79168765432',
            capacity: '15kg',
            routes: ['russia-nigeria'],
            status: 'available'
        },
        {
            id: 3,
            name: 'Nigerian Customs Broker',
            email: 'customs@example.com',
            phone: '+2348034567890',
            capacity: '30kg',
            routes: ['nigeria-russia'],
            status: 'available'
        },
    ]);

    // Filter requests based on tab and search
    const filteredRequests = requests.filter(request => {
        const statusMatch = activeTab === 'all' || request.status === activeTab;
        const searchMatch = searchQuery === '' ||
            request.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.client.phone.includes(searchQuery);
        return statusMatch && searchMatch;
    });

    // Function to match a request with a provider
    const matchRequest = (requestId, providerId) => {
        setRequests(requests.map(request => {
            if (request.id === requestId) {
                const provider = providers.find(p => p.id === providerId);
                return {
                    ...request,
                    status: 'matched',
                    provider: provider
                };
            }
            return request;
        }));
    };

    // Function to mark a shipment as completed
    const completeRequest = (requestId) => {
        setRequests(requests.map(request => {
            if (request.id === requestId) {
                return {
                    ...request,
                    status: 'completed'
                };
            }
            return request;
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-medium text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600">Manage Russia-Nigeria logistics connections</p>
                </header>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    {['pending', 'matched', 'completed', 'all'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search clients..."
                        className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Requests Table */}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRequests.length > 0 ? (
                                filteredRequests.map((request) => (
                                    <tr key={request.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{request.client.name}</div>
                                            <div className="text-sm text-gray-500">{request.client.email}</div>
                                            <div className="text-sm text-gray-500">{request.client.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${request.type === 'documents' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                                                    }`}>
                                                    {request.type}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500">{request.direction.replace('-', ' → ')}</div>
                                            <div className="text-sm text-gray-500">Departure: {request.departureDate}</div>
                                            <div className="text-sm text-gray-500">Weight: {request.weight}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                request.status === 'matched' ? 'bg-green-100 text-green-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {request.status}
                                            </span>
                                            {request.provider && (
                                                <div className="mt-1 text-sm text-gray-500">
                                                    Provider: {request.provider.name}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {request.status === 'pending' ? (
                                                <div className="space-y-2">
                                                    <select
                                                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                                        onChange={(e) => matchRequest(request.id, parseInt(e.target.value))}
                                                        defaultValue=""
                                                    >
                                                        <option value="" disabled>Select provider</option>
                                                        {providers
                                                            .filter(provider => provider.routes.includes(request.direction))
                                                            .map(provider => (
                                                                <option key={provider.id} value={provider.id}>
                                                                    {provider.name} ({provider.capacity} available)
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                            ) : request.status === 'matched' ? (
                                                <button
                                                    onClick={() => completeRequest(request.id)}
                                                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    Mark as Completed
                                                </button>
                                            ) : (
                                                <span className="text-gray-400">Completed</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No requests found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Providers Section */}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Service Providers</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {providers.map((provider) => (
                            <div key={provider.id} className="px-6 py-4 flex justify-between items-center">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                                    <div className="text-sm text-gray-500">{provider.email} • {provider.phone}</div>
                                    <div className="mt-1">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Capacity: {provider.capacity}
                                        </span>
                                        <span className="ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            Routes: {provider.routes.join(', ').replace(/-/g, '→')}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${provider.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {provider.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;