import React, { useState } from 'react';
import type { RSVPData } from '../types';

type FormState = 'idle' | 'submitting' | 'submitted' | 'error';

const initialFormData: Omit<RSVPData, 'phone'> & { phone: string } = {
    guestName: '',
    phone: '',
    email: '',
    pax: 1,
    arrivalDate: '',
    arrivalTime: '',
    arrivalMode: 'Train',
    arrivalNumber: '',
    departureDate: '',
    departureTime: '',
    departureMode: 'Train',
    departureNumber: '',
    comments: '',
};

const RSVP: React.FC = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [formState, setFormState] = useState<FormState>('idle');
    const [phoneError, setPhoneError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '');
            if (numericValue.length <= 10) {
                setFormData(prev => ({ ...prev, phone: numericValue }));
                if (numericValue.length === 10) {
                    setPhoneError('');
                } else {
                    setPhoneError('Phone number must be 10 digits.');
                }
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.phone.length !== 10) {
            setPhoneError('Please enter a valid 10-digit phone number.');
            return;
        }
        
        setPhoneError('');
        setFormState('submitting');
        
        // Simulate API call and save to localStorage
        setTimeout(() => {
            try {
                const submissionData = {
                    ...formData,
                    phone: `+91 ${formData.phone}` // Prepend country code before saving
                };
                const existingSubmissions = JSON.parse(localStorage.getItem('wedding-rsvps') || '[]');
                localStorage.setItem('wedding-rsvps', JSON.stringify([...existingSubmissions, submissionData]));
                setFormState('submitted');
            } catch (error) {
                console.error("Failed to save RSVP:", error);
                setFormState('error');
            }
        }, 1500);
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setPhoneError('');
        setFormState('idle');
    };

    if (formState === 'submitted') {
        return (
            <div className="py-20 md:py-32 bg-brand-cream flex items-center justify-center">
                <div className="text-center p-8">
                    <h2 className="text-4xl font-serif text-brand-green mb-4">Thank You!</h2>
                    <p className="text-lg text-brand-charcoal mb-8">Your information has been received. We can't wait to see you!</p>
                    <button
                        onClick={resetForm}
                        className="bg-brand-green text-white font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors duration-300"
                    >
                        Submit Another Response
                    </button>
                </div>
            </div>
        )
    }
    
    if (formState === 'error') {
        return (
             <div className="py-20 md:py-32 bg-brand-cream flex items-center justify-center">
                <div className="text-center p-8">
                    <h2 className="text-4xl font-serif text-red-500 mb-4">Something Went Wrong</h2>
                    <p className="text-lg text-brand-charcoal">We couldn't save your RSVP. Please try again later or contact us directly.</p>
                </div>
            </div>
        )
    }

    return (
        <section className="py-20 md:py-32 bg-brand-cream">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-4">Travel & Accomodation Form</h2>
                    <p className="text-brand-charcoal mb-10">Please share your travel details with us so we can make your stay comfortable. We kindly request you to fill this form by September 1st, 2025.</p>
                </div>
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
                    
                    {/* Guest Information */}
                    <fieldset className="border border-brand-taupe p-6 rounded-lg">
                        <legend className="text-2xl font-serif text-brand-green px-2">Guest Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label htmlFor="guestName" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Full Name</label>
                                <input type="text" id="guestName" name="guestName" value={formData.guestName} onChange={handleChange} required className="mt-1 block w-full bg-white border border-brand-taupe rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" />
                            </div>
                             <div>
                                <label htmlFor="pax" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Number of People Traveling</label>
                                <input type="number" id="pax" name="pax" min="1" value={formData.pax} onChange={handleChange} required className="mt-1 block w-full bg-white border border-brand-taupe rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" />
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full bg-white border border-brand-taupe rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Phone</label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-brand-taupe bg-gray-50 text-gray-500 text-sm">
                                        +91
                                    </span>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        name="phone"
                                        placeholder="9876543210"
                                        value={formData.phone} 
                                        onChange={handleChange} 
                                        required 
                                        className="flex-1 block w-full rounded-none rounded-r-md bg-white border border-brand-taupe py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" 
                                    />
                                </div>
                                {phoneError && formData.phone.length !== 10 && <p className="mt-1 text-sm text-red-600">{phoneError}</p>}
                            </div>
                        </div>
                    </fieldset>

                    {/* Arrival Details */}
                    <fieldset className="border border-brand-taupe p-6 rounded-lg">
                        <legend className="text-2xl font-serif text-brand-green px-2">Arrival Details</legend>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label htmlFor="arrivalDate" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Date</label>
                                <input type="date" id="arrivalDate" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} required className="mt-1 block w-full bg-white border border-brand-taupe rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" />
                            </div>
                            <div>
                                <label htmlFor="arrivalTime" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Time</label>
                                <input type="time" id="arrivalTime" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} required className="mt-1 block w-full bg-white border border-brand-taupe rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" />
                            </div>
                            <div>
                                <label htmlFor="arrivalMode" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Mode of Travel</label>
                                <select id="arrivalMode" name="arrivalMode" value={formData.arrivalMode} onChange={handleChange} className="mt-1 block w-full bg-white border border-brand-taupe rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green">
                                    <option>Train</option>
                                    <option>Flight</option>
                                    <option>Car</option>
                                    <option>Other</option>
                                </select>
                            </div>
                             <div>
                                <label htmlFor="arrivalNumber" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Flight/Train Number</label>
                                <input type="text" id="arrivalNumber" name="arrivalNumber" placeholder="(If applicable)" value={formData.arrivalNumber} onChange={handleChange} className="mt-1 block w-full bg-white border border-brand-taupe rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" />
                            </div>
                        </div>
                    </fieldset>

                    {/* Departure Details */}
                    <fieldset className="border border-brand-taupe p-6 rounded-lg">
                        <legend className="text-2xl font-serif text-brand-green px-2">Departure Details</legend>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label htmlFor="departureDate" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Date</label>
                                <input type="date" id="departureDate" name="departureDate" value={formData.departureDate} onChange={handleChange} required className="mt-1 block w-full bg-white border border-brand-taupe rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" />
                            </div>
                            <div>
                                <label htmlFor="departureTime" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Time</label>
                                <input type="time" id="departureTime" name="departureTime" value={formData.departureTime} onChange={handleChange} required className="mt-1 block w-full bg-white border border-brand-taupe rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" />
                            </div>
                            <div>
                                <label htmlFor="departureMode" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Mode of Travel</label>
                                <select id="departureMode" name="departureMode" value={formData.departureMode} onChange={handleChange} className="mt-1 block w-full bg-white border border-brand-taupe rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green">
                                    <option>Train</option>
                                    <option>Flight</option>
                                    <option>Car</option>
                                    <option>Other</option>
                                </select>
                            </div>
                             <div>
                                <label htmlFor="departureNumber" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Flight/Train Number</label>
                                <input type="text" id="departureNumber" name="departureNumber" placeholder="(If applicable)" value={formData.departureNumber} onChange={handleChange} className="mt-1 block w-full bg-white border border-brand-taupe rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green" />
                            </div>
                        </div>
                    </fieldset>
                    
                     {/* Comments */}
                    <fieldset className="border border-brand-taupe p-6 rounded-lg">
                        <legend className="text-2xl font-serif text-brand-green px-2">Additional Details</legend>
                        <div className="mt-4">
                            <label htmlFor="comments" className="block text-sm font-medium text-brand-charcoal tracking-wider uppercase">Comments / Special Requests</label>
                             <textarea 
                                id="comments" 
                                name="comments" 
                                rows={4} 
                                value={formData.comments} 
                                onChange={handleChange} 
                                className="mt-1 block w-full bg-white border border-brand-taupe rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green focus:border-brand-green"
                                placeholder="Anything else we should know?"
                            />
                        </div>
                    </fieldset>
                    
                    <div>
                        <button 
                            type="submit" 
                            disabled={formState === 'submitting'}
                            className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300 disabled:bg-brand-taupe"
                        >
                            {formState === 'submitting' ? 'Submitting...' : 'Submit Details'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default RSVP;