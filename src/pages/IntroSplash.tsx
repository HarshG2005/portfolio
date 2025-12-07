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
            <div className="text-center">
                {/* Animated Logo/Name */}
                <h1
                    className={`text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter transition-all duration-1000 ${isExiting ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
                    style={{
                        background: 'linear-gradient(135deg, #E50914 0%, #ff6b6b 50%, #E50914 100%)',
                        backgroundSize: '200% 200%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'gradient-shift 3s ease infinite'
                    }}
                >
                    HARSH GOUTAM
                </h1>

                <p className={`mt-8 text-gray-500 text-sm tracking-widest uppercase transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                    Click anywhere to enter
                </p>
            </div>

            {/* Subtle ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-[100px]" />
            </div>
        </div>
    );
};

export default IntroSplash;
