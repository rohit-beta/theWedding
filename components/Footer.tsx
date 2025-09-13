import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white py-8">
            <div className="container mx-auto px-6 text-center text-brand-taupe relative">
                <p className="font-serif text-2xl mb-2">V & R</p>
                <p className="text-sm tracking-wider uppercase">November 25, 2025 • Nokha, Rajasthan</p>
                <p className="text-sm mt-4">&copy; {new Date().getFullYear()} Varsha & Rohit. All rights reserved.</p>
                <div className="absolute bottom-2 right-4">
                    <Link to="/admin" className="text-xs text-gray-400 hover:text-brand-green">Admin</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
