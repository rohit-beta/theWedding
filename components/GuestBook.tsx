import React, { useState, useEffect } from 'react';
import type { GuestBookEntry } from '../types';

const noteColors = [
    'bg-yellow-200',
    'bg-pink-200',
    'bg-blue-200',
    'bg-green-200',
    'bg-purple-200',
];

const GuestBook: React.FC = () => {
    const [entries, setEntries] = useState<GuestBookEntry[]>([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [lovedNotes, setLovedNotes] = useState<string[]>([]);
    const [formError, setFormError] = useState('');
    const [hoveredNoteId, setHoveredNoteId] = useState<string | null>(null);

    useEffect(() => {
        try {
            const storedEntries = JSON.parse(localStorage.getItem('guestbook-entries') || '[]');
            const storedLoves = JSON.parse(localStorage.getItem('guestbook-loves') || '[]');

            // Migration logic for old entries without new properties
            let needsUpdate = false;
            const migratedEntries = storedEntries.map((entry: any, index: number) => {
                if (typeof entry.position === 'undefined') {
                    needsUpdate = true;
                    return {
                        ...entry,
                        color: noteColors[Math.floor(Math.random() * noteColors.length)],
                        rotation: Math.random() * 8 - 4, // -4 to 4 degrees
                        position: {
                            top: Math.random() * 70, // %
                            left: Math.random() * 75, // % to avoid overflow with note width
                        },
                        zIndex: index + 1,
                    };
                }
                return entry;
            });
            
            if (needsUpdate) {
                localStorage.setItem('guestbook-entries', JSON.stringify(migratedEntries));
            }

            setEntries(migratedEntries);
            setLovedNotes(storedLoves);
        } catch (error) {
            console.error("Failed to load from local storage", error);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) {
            setFormError('Please fill out both your name and a message.');
            return;
        }

        const newEntry: GuestBookEntry = {
            id: new Date().toISOString(),
            name,
            message,
            loves: 0,
            color: noteColors[Math.floor(Math.random() * noteColors.length)],
            rotation: Math.random() * 8 - 4,
            position: {
                top: Math.random() * 70,
                left: Math.random() * 75,
            },
            zIndex: entries.length > 0 ? Math.max(...entries.map(e => e.zIndex)) + 1 : 1,
        };

        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
        localStorage.setItem('guestbook-entries', JSON.stringify(updatedEntries));
        
        setName('');
        setMessage('');
        setFormError('');
    };

    const handleLoveClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // prevent triggering other events on the note
        if (lovedNotes.includes(id)) return; // Already loved

        const updatedEntries = entries.map(entry =>
            entry.id === id ? { ...entry, loves: entry.loves + 1 } : entry
        );

        const updatedLoves = [...lovedNotes, id];

        setEntries(updatedEntries);
        setLovedNotes(updatedLoves);
        localStorage.setItem('guestbook-entries', JSON.stringify(updatedEntries));
        localStorage.setItem('guestbook-loves', JSON.stringify(updatedLoves));
    };

    return (
        <section className="py-20 md:py-32 bg-brand-cream overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-4">Guest Book</h2>
                    <p className="text-brand-charcoal mb-10">Leave a blessing or a fond memory for us to cherish forever!</p>
                </div>
                
                <div className="relative w-full h-[70vh] min-h-[500px] md:min-h-[600px] mb-16">
                    {entries.length > 0 ? entries.map((entry) => {
                        const hasLoved = lovedNotes.includes(entry.id);
                        return (
                            <div 
                                key={entry.id} 
                                onMouseEnter={() => setHoveredNoteId(entry.id)}
                                onMouseLeave={() => setHoveredNoteId(null)}
                                className={`absolute p-4 shadow-lg flex flex-col justify-between w-56 h-auto cursor-pointer transition-all duration-300 ease-in-out ${entry.color}`}
                                style={{
                                    top: `${entry.position.top}%`,
                                    left: `${entry.position.left}%`,
                                    transform: `rotate(${entry.rotation}deg) scale(${hoveredNoteId === entry.id ? 1.15 : 1})`,
                                    zIndex: hoveredNoteId === entry.id ? 100 : entry.zIndex,
                                }}
                            >
                                <p className="text-base font-serif text-brand-charcoal flex-grow break-words">"{entry.message}"</p>
                                <div>
                                    <p className="font-sans font-bold text-brand-charcoal mt-4">- {entry.name}</p>
                                    <div className="flex items-center justify-end mt-2">
                                        <button 
                                            onClick={(e) => handleLoveClick(e, entry.id)} 
                                            disabled={hasLoved}
                                            className={`flex items-center space-x-1 focus:outline-none ${hasLoved ? 'cursor-default' : 'hover:text-pink-600'}`}
                                            aria-label={`Love message from ${entry.name}`}
                                        >
                                            <svg className={`w-6 h-6 ${hasLoved ? 'text-pink-500' : 'text-brand-taupe'}`} fill={hasLoved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"></path>
                                            </svg>
                                            <span className="text-sm font-medium text-brand-charcoal">{entry.loves}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    }) : (
                         <div className="col-span-full text-center py-10 px-6 bg-white/50 rounded-lg w-full">
                            <h3 className="text-xl font-serif text-brand-charcoal">No blessings yet.</h3>
                            <p className="text-brand-taupe mt-2">Be the first to leave a note!</p>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl font-serif text-brand-green mb-6 text-center">Add Your Note</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Your Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="mt-1 block w-full bg-white border border-brand-taupe rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" 
                                placeholder="e.g., Jane Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Your Message</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                className="mt-1 block w-full bg-white border border-brand-taupe rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green"
                                placeholder="Share your wishes here..."
                            />
                        </div>
                        {formError && <p className="text-sm text-red-600">{formError}</p>}
                        <div>
                            <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300">
                                Leave a Note
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </section>
    );
};

export default GuestBook;