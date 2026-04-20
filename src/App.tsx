import { useState, useCallback, Suspense } from 'react';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';
import CountdownTimer from './components/CountdownTimer';
import NimInput from './components/NimInput';
import ResultCard from './components/ResultCard';
import Footer from './components/Footer';
import { CONFIG, type StudentData } from './config';
import { useCountdown } from './hooks/useCountdown';
import studentsData from './data/students.json';

type AppPhase = 'countdown' | 'input';

function App() {
  const { isExpired } = useCountdown(CONFIG.PHASE_1_TARGET_DATE);
  const [phase, setPhase] = useState<AppPhase>(isExpired ? 'input' : 'countdown');
  const [searchResult, setSearchResult] = useState<StudentData | null>(null);
  const [searchedNim, setSearchedNim] = useState('');

  const handleCountdownExpired = useCallback(() => {
    setPhase('input');
  }, []);

  const handleSearch = useCallback((nim: string) => {
    const found = (studentsData as StudentData[]).find(
      (s) => s.nim === nim
    );
    setSearchedNim(nim);
    setSearchResult(found || null);
  }, []);

  const isInputPhase = phase === 'input';

  return (
    <>
      {/* 3D Background — only shown during countdown phase */}
      {!isInputPhase && (
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>
      )}

      <Navbar />

      <main className={`main-content ${isInputPhase ? 'main-content--input' : ''}`}>
        {phase === 'countdown' && (
          <CountdownTimer onExpired={handleCountdownExpired} />
        )}

        {phase === 'input' && (
          <>
            <NimInput onSearch={handleSearch} />
            <ResultCard student={searchResult} searchedNim={searchedNim} />
          </>
        )}
      </main>

      {/* Footer only shown during input phase, not during countdown */}
      {isInputPhase && <Footer />}
    </>
  );
}

export default App;
