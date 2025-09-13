
import React from 'react';

const OurStory: React.FC = () => {
    return (
        <section className="py-20 md:py-32 bg-brand-cream">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-serif text-center text-brand-charcoal mb-12">Our Story</h2>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <img 
                            src="https://picsum.photos/seed/ourstory/800/1000" 
                            alt="Couple in a loving embrace" 
                            className="rounded-lg shadow-xl w-full h-auto object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 text-left text-brand-charcoal space-y-6 leading-relaxed">
                        <h3 className="font-serif text-3xl text-brand-green">The Beginning</h3>
                        <p>
                            It all started on a crisp autumn evening at a local coffee shop. A shared love for obscure literature and perfectly brewed lattes sparked a conversation that lasted for hours. We didn't know it then, but that was the first page of our forever story.
                        </p>
                        <h3 className="font-serif text-3xl text-brand-green">The Journey</h3>
                        <p>
                            From spontaneous road trips along the coast to quiet nights spent building elaborate Lego castles, our journey has been filled with laughter, adventure, and unwavering support. We've navigated challenges together, celebrated triumphs, and built a life rooted in mutual respect and deep affection.
                        </p>
                         <h3 className="font-serif text-3xl text-brand-green">The Proposal</h3>
                        <p>
                            Under a canopy of stars on our favorite hiking trail, one of us got down on one knee. It was a simple, heartfelt moment that felt both surreal and inevitable. The easiest "yes" ever spoken. We're so excited to start this next chapter and celebrate with all of you!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
