import { useState } from 'react';
import Navbar from '../componets/navbar';

const ModernLogisticsHomepage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [direction, setDirection] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Sample data
    const waybillSlots = [
        {
            id: 1,
            type: 'documents',
            direction: 'russia-nigeria',
            departureDate: '2023-11-15',
            availableSpace: '3kg',
            status: 'available',
            contact: 'contact@example.com'
        },
        {
            id: 2,
            type: 'goods',
            direction: 'nigeria-russia',
            departureDate: '2023-11-18',
            availableSpace: '15kg',
            status: 'available',
            contact: 'contact@example.com'
        },
        {
            id: 3,
            type: 'documents',
            direction: 'russia-nigeria',
            departureDate: '2023-11-20',
            availableSpace: '5kg',
            status: 'looking',
            contact: 'contact@example.com'
        },
        {
            id: 4,
            type: 'goods',
            direction: 'nigeria-russia',
            departureDate: '2023-11-22',
            availableSpace: '25kg',
            status: 'available',
            contact: 'contact@example.com'
        },
    ];

    const filteredSlots = waybillSlots.filter(slot => {
        const typeMatch = activeTab === 'all' || slot.type === activeTab;
        const directionMatch = direction === 'all' || slot.direction === direction;
        const statusMatch = statusFilter === 'all' || slot.status === statusFilter;
        return typeMatch && directionMatch && statusMatch;
    });

    return (
        <div className="min-h-screen bg-neutral-50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Filters - Three-tier system */}
                <div className="mb-12 space-y-4">
                    {/* Status filters (new) */}
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
                                            {slot.direction.split('-').map((city, i) => (
                                                <span key={city}>
                                                    {i > 0 && <span className="mx-1">→</span>}
                                                    <span className="font-medium">{city === 'russia' ? 'RU' : 'NG'}</span>
                                                </span>
                                            ))}
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