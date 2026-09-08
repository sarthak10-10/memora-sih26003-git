import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import Game from './games/where-does-it-belong/Game';
import Reminders from './reminders/Reminders';
import Caregiver from './caregiver/Caregiver';
import Onboarding from './components/Onboarding';
import Breathe from './breathe/Breathe';
import Journal from './journal/Journal';

const USER_NAME_KEY = 'memora-user-name';

function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(USER_NAME_KEY);
    setUserName(stored);
    setLoading(false);
  }, []);

  const handleOnboardingComplete = (name: string) => {
    localStorage.setItem(USER_NAME_KEY, name);
    setUserName(name);
  };

  if (loading) return null;

  if (!userName) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home userName={userName} />} />
      <Route path="/game" element={<Game />} />
      <Route path="/reminders" element={<Reminders />} />
      <Route path="/caregiver" element={<Caregiver />} />
      <Route path="/breathe" element={<Breathe />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
