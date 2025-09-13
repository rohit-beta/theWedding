import React, { useState, useEffect } from 'react';
import type { RSVPData } from '../types';

const Admin: React.FC = () => {
    const [submissions, setSubmissions] = useState<RSVPData[]>([]);

    useEffect(() => {
        const storedSubmissions = JSON.parse(localStorage.getItem('wedding-rsvps') || '[]');
        setSubmissions(storedSubmissions);
    }, []);
    
    const handleExport = () => {
        if (submissions.length === 0) {
            alert("No submissions to export.");
            return;
        }

        const headers = [
            "Guest Name", "Email", "Phone", "Pax",
            "Arrival Date", "Arrival Time", "Arrival Mode", "Arrival Number",
            "Departure Date", "Departure Time", "Departure Mode", "Departure Number",
            "Comments"
        ];
        
        const keys: (keyof RSVPData)[] = [
            "guestName", "email", "phone", "pax",
            "arrivalDate", "arrivalTime", "arrivalMode", "arrivalNumber",
            "departureDate", "departureTime", "departureMode", "departureNumber",
            "comments"
        ];

        const csvRows = [
            headers.join(','),
            ...submissions.map(sub => 
                keys.map(key => {
                    let value = sub[key] || ''; // handle undefined comments
                    if (typeof value === 'string' && value.includes(',')) {
                        return `"${value}"`; // escape commas
                    }
                    return value;
                }).join(',')
            )
        ];

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'wedding_guest_list.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-serif text-brand-charcoal">Guest Submissions</h1>
                    <button
                        onClick={handleExport}
                        className="bg-brand-green text-white font-bold py-2 px-5 rounded-md hover:bg-opacity-90 transition-colors duration-300"
                        aria-label="Export guest data to a CSV file"
                    >
                        Export to Excel (.csv)
                    </button>
                </div>
                {submissions.length > 0 ? (
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="w-full text-sm text-left text-brand-charcoal">
                            <thead className="text-xs text-white uppercase bg-brand-green">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Contact</th>
                                    <th scope="col" className="px-6 py-3">Pax</th>
                                    <th scope="col" className="px-6 py-3">Arrival</th>
                                    <th scope="col" className="px-6 py-3">Departure</th>
                                    <th scope="col" className="px-6 py-3">Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((sub, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium whitespace-nowrap">{sub.guestName}</td>
                                        <td className="px-6 py-4">
                                            <div>{sub.email}</div>
                                            <div>{sub.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">{sub.pax}</td>
                                        <td className="px-6 py-4">
                                            <div>{sub.arrivalDate} at {sub.arrivalTime}</div>
                                            <div className="text-gray-600">{sub.arrivalMode} ({sub.arrivalNumber || 'N/A'})</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>{sub.departureDate} at {sub.departureTime}</div>
                                            <div className="text-gray-600">{sub.departureMode} ({sub.departureNumber || 'N/A'})</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-pre-wrap max-w-xs">{sub.comments || ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-10 px-6 bg-gray-50 rounded-lg">
                        <h3 className="text-2xl font-serif text-brand-charcoal">No submissions yet.</h3>
                        <p className="text-brand-taupe mt-2">Check back later to see guest responses.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Admin;