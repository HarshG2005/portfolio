import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import IntroSplash from './pages/IntroSplash';
import ProfileGate from './pages/ProfileGate';
import Browse from './pages/Browse';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroSplash />} />
          <Route path="/profiles" element={<ProfileGate />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
