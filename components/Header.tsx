import React, { useState } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import type { NavLink } from '../types';


const navLinks: NavLink[] = [
    { path: '/', label: 'Home' },
    { path: '/wedding-events', label: 'Wedding Events'},
    { path: '/guest-book', label: 'Guest Book' },
    { path: '/rsvp', label: 'RSVP' },
];

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const activeLinkStyle = {
        textDecoration: 'underline',
        textUnderlineOffset: '8px',
        textDecorationColor: '#B0A295',
        textDecorationThickness: '2px'
    };

    return (
        <header className="bg-brand-cream sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-3xl font-serif text-brand-charcoal">
                    <Link to="/">V & R</Link>
                </div>
                <nav className="hidden md:flex items-center space-x-8 uppercase tracking-widest text-sm">
                    {navLinks.map((link) => (
                        <RouterNavLink
                            key={link.path}
                            to={link.path}
                            style={({ isActive }) => isActive ? activeLinkStyle : {}}
                            className="text-brand-charcoal hover:text-brand-taupe transition-colors duration-300"
                        >
                            {link.label}
                        </RouterNavLink>
                    ))}
                </nav>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-brand-charcoal focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-brand-cream pb-4">
                    <nav className="flex flex-col items-center space-y-4 uppercase tracking-widest text-sm">
                       {navLinks.map((link) => (
                        <RouterNavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            style={({ isActive }) => isActive ? activeLinkStyle : {}}
                            className="text-brand-charcoal hover:text-brand-taupe transition-colors duration-300"
                        >
                            {link.label}
                        </RouterNavLink>
                    ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;