
import React from 'react';
import type { Photo } from '../types';

const photos: Photo[] = [
  { id: 1, imageUrl: 'https://picsum.photos/seed/gallery1/600/800', alt: 'Couple smiling' },
  { id: 2, imageUrl: 'https://picsum.photos/seed/gallery2/600/400', alt: 'Couple holding hands' },
  { id: 3, imageUrl: 'https://picsum.photos/seed/gallery3/600/900', alt: 'Couple on a scenic view' },
  { id: 4, imageUrl: 'https://picsum.photos/seed/gallery4/600/600', alt: 'Close-up of the couple' },
  { id: 5, imageUrl: 'https://picsum.photos/seed/gallery5/600/450', alt: 'Couple laughing' },
  { id: 6, imageUrl: 'https://picsum.photos/seed/gallery6/600/850', alt: 'Formal portrait of the couple' },
  { id: 7, imageUrl: 'https://picsum.photos/seed/gallery7/600/500', alt: 'Couple on vacation' },
  { id: 8, imageUrl: 'https://picsum.photos/seed/gallery8/600/750', alt: 'Couple walking in a park' },
];

const Photos: React.FC = () => {
    return (
        <section className="py-20 md:py-32 bg-brand-cream">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-serif text-center text-brand-charcoal mb-12">Moments We Cherish</h2>
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {photos.map((photo) => (
                        <div key={photo.id} className="overflow-hidden rounded-lg shadow-lg break-inside-avoid">
                            <img 
                                src={photo.imageUrl} 
                                alt={photo.alt} 
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Photos;
