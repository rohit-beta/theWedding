import React, { useState, useEffect } from 'react';

const Home: React.FC = () => {
    const calculateTimeLeft = () => {
        const weddingDate = new Date('2025-11-25T00:00:00');
        const difference = +weddingDate - +new Date();
        
        let timeLeft: { [key: string]: number } = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="flex flex-col items-center mx-3 md:mx-5">
            <span className="font-serif text-3xl md:text-5xl">{value}</span>
            <span className="font-sans uppercase tracking-widest text-xs md:text-sm">{interval}</span>
        </div>
    ));

    return (
        <div className="relative h-[calc(100vh-80px)] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://picsum.photos/seed/weddingcouple/1920/1080"
                    alt="Couple celebrating their wedding"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>
            <div className="relative z-10 p-8 flex flex-col items-center">
                <h1 className="font-serif text-5xl md:text-8xl mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    Varsha & Rohit
                </h1>
                <p className="font-sans tracking-widest uppercase text-lg md:text-xl mb-6" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                    We are getting married
                </p>
                <div className="font-serif text-2xl md:text-4xl mb-8" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                    November 25, 2025
                </div>

                {/* Countdown Timer */}
                <div className="flex justify-center" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                    {timerComponents.length ? timerComponents : <span className="font-serif text-3xl">The day is here!</span>}
                </div>
            </div>
        </div>
    );
};

export default Home;
