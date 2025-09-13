import React from 'react';
import type { WeddingEvent } from '../types';

const events: WeddingEvent[] = [
    {
        name: 'Phoolo ki Holi',
        dateTime: '24 Nov, 11 AM',
        venueName: 'Saraswati Bhawan',
        venueLink: 'https://maps.app.goo.gl/6yYQ76dmwpdXTU4q6'
    },
    {
        name: 'Mayra',
        dateTime: '24 Nov, 3 PM',
        venueName: 'Saraswati Bhawan',
        venueLink: 'https://maps.app.goo.gl/6yYQ76dmwpdXTU4q6'
    },
    {
        name: 'Mehandi',
        dateTime: '24 Nov, 6 PM',
        venueName: 'Saraswati Bhawan',
        venueLink: 'https://maps.app.goo.gl/6yYQ76dmwpdXTU4q6'
    },
    {
        name: 'Wedding Reception',
        dateTime: '25 Nov, 5 PM',
        venueName: 'Saraswati Bhawan',
        venueLink: 'https://maps.app.goo.gl/6yYQ76dmwpdXTU4q6'
    }
];

const WeddingEvents: React.FC = () => {
    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-serif text-center text-brand-charcoal mb-20">Wedding Events</h2>
                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-brand-taupe" aria-hidden="true"></div>
                    
                    {events.map((event, index) => {
                        // If index is even, card is on the right. If odd, on the left.
                        const isRightSide = index % 2 === 0;

                        return (
                            <div key={index} className="relative mb-16 flex items-center">
                                
                                {/* Card on the LEFT, or empty space */}
                                <div className="w-1/2 pr-8">
                                    {!isRightSide && (
                                        <div className="bg-brand-cream p-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105 text-right">
                                            <h3 className="text-2xl font-serif text-brand-green mb-2">{event.name}</h3>
                                            <p className="text-brand-charcoal font-semibold">{event.dateTime}</p>
                                            <a 
                                                href={event.venueLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-brand-taupe hover:text-brand-green transition-colors duration-300 mt-2 inline-flex items-center flex-row-reverse"
                                            >
                                                <span>{event.venueName}</span>
                                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Dot in the middle */}
                                <div className="absolute left-1/2 -ml-2.5 w-5 h-5 bg-brand-green rounded-full z-10 border-4 border-white"></div>
                                
                                {/* Card on the RIGHT, or empty space */}
                                <div className="w-1/2 pl-8">
                                     {isRightSide && (
                                        <div className="bg-brand-cream p-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105 text-left">
                                            <h3 className="text-2xl font-serif text-brand-green mb-2">{event.name}</h3>
                                            <p className="text-brand-charcoal font-semibold">{event.dateTime}</p>
                                            <a 
                                                href={event.venueLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-brand-taupe hover:text-brand-green transition-colors duration-300 mt-2 inline-flex items-center"
                                            >
                                                <span>{event.venueName}</span>
                                                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WeddingEvents;