import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import LandingIntro from './components/LandingIntro';
import ProfileGate from './pages/ProfileGate';
import Browse from './pages/Browse';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Show Netflix-style intro on first load
  if (showIntro) {
    return <LandingIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfileGate />} />
          <Route path="/profiles" element={<ProfileGate />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
