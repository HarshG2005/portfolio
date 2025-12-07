import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IntroSplash = () => {
    const navigate = useNavigate();
    const [isExiting, setIsExiting] = useState(false);

    const handleClick = () => {
        setIsExiting(true);
        setTimeout(() => {
            navigate('/profiles');
        }, 800);
    };

    return (
        <div
            onClick={handleClick}
            className={`min-h-screen bg-black flex items-center justify-center cursor-pointer transition-opacity duration-700 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
        >
            {/* Netflix-style name - solid red, bold italic */}
            <h1
                className={`text-5xl md:text-7xl lg:text-8xl font-black italic tracking-wide transition-all duration-700 select-none ${isExiting ? 'scale-125 opacity-0' : 'scale-100 opacity-100'}`}
                style={{
                    color: '#E50914',
                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
            >
                HARSH GOUTAM
            </h1>
        </div>
    );
};

export default IntroSplash;
