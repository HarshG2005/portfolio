import { createContext, useContext, useState, type ReactNode } from 'react';

export type ProfileType = 'RECRUITER' | 'DEVELOPER' | 'STALKER' | null;

interface UserContextType {
    selectedProfile: ProfileType;
    setSelectedProfile: (profile: ProfileType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [selectedProfile, setSelectedProfile] = useState<ProfileType>(null);

    return (
        <UserContext.Provider value={{ selectedProfile, setSelectedProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
