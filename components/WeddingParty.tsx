
import React from 'react';
import type { WeddingPartyMember } from '../types';

const bridesmaids: WeddingPartyMember[] = [
  { name: 'Olivia Chen', role: 'Maid of Honor', imageUrl: 'https://picsum.photos/seed/bridesmaid1/500/500' },
  { name: 'Isabella Rodriguez', role: 'Bridesmaid', imageUrl: 'https://picsum.photos/seed/bridesmaid2/500/500' },
  { name: 'Sophia Nguyen', role: 'Bridesmaid', imageUrl: 'https://picsum.photos/seed/bridesmaid3/500/500' },
  { name: 'Amelia Kim', role: 'Bridesmaid', imageUrl: 'https://picsum.photos/seed/bridesmaid4/500/500' },
];

const groomsmen: WeddingPartyMember[] = [
  { name: 'Liam Smith', role: 'Best Man', imageUrl: 'https://picsum.photos/seed/groomsman1/500/500' },
  { name: 'Noah Johnson', role: 'Groomsman', imageUrl: 'https://picsum.photos/seed/groomsman2/500/500' },
  { name: 'Elijah Williams', role: 'Groomsman', imageUrl: 'https://picsum.photos/seed/groomsman3/500/500' },
  { name: 'James Brown', role: 'Groomsman', imageUrl: 'https://picsum.photos/seed/groomsman4/500/500' },
];

const PartyMemberCard: React.FC<{ member: WeddingPartyMember }> = ({ member }) => (
    <div className="text-center group">
        <div className="overflow-hidden rounded-full w-48 h-48 mx-auto shadow-lg mb-4">
            <img 
                src={member.imageUrl} 
                alt={member.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
        </div>
        <h3 className="text-xl font-serif text-brand-charcoal">{member.name}</h3>
        <p className="text-brand-taupe uppercase tracking-wider text-sm">{member.role}</p>
    </div>
);

const WeddingParty: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-brand-charcoal mb-16">The Wedding Party</h2>
        
        <div className="mb-16">
          <h3 className="text-3xl font-serif text-center text-brand-green mb-10">Bridesmaids</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {bridesmaids.map((member) => (
              <PartyMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-3xl font-serif text-center text-brand-green mb-10">Groomsmen</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {groomsmen.map((member) => (
              <PartyMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingParty;
