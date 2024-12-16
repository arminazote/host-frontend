import React, { useEffect, useState } from 'react';
import logo from '../assets/queen.png';
import './loader.css'; // Custom CSS file for animation

const Loader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time of 2 seconds
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // 2 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="relative flex items-center justify-center rounded-full w-32 h-32 yellow-border-shadow">
                <div className="border-animation flex items-center bg-white justify-center w-44 h-44 rounded-full">
                    {/* Logo */}
                    <img className="w-20 -mt-8" src={logo} alt="queen" />
                    {/* Text */}
                    <h2 className="absolute top-1/2 text-2xl font-extrabold text-[#fda603] uppercase">
                        Rani <span className="text-[#e51c0e]">Baji</span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Loader;
