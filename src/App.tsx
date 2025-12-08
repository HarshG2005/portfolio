import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import LandingIntro from './components/LandingIntro';
import ProfileGate from './pages/ProfileGate';
import Browse from './pages/Browse';
import Projects from './pages/Projects';
import Skills from './pages/Skills';

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
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
