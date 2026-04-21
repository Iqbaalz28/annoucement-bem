import { useState, useCallback, Suspense } from 'react';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';
import CountdownTimer from './components/CountdownTimer';
import NimInput from './components/NimInput';
import ResultCard from './components/ResultCard';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import { CONFIG, type StudentData } from './config';
import { useCountdown } from './hooks/useCountdown';
import studentsData from './data/students.json';

type AppPhase = 'countdown' | 'input';

function FloatingParticles() {
  return (
    <div className="floating-particles">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="floating-particle" />
      ))}
    </div>
  );
}

function GridOverlay() {
  return <div className="bg-grid-overlay" />;
}

function App() {
  const { isExpired } = useCountdown(CONFIG.PHASE_1_TARGET_DATE);
  const [phase, setPhase] = useState<AppPhase>(isExpired ? 'input' : 'countdown');
  const [searchResult, setSearchResult] = useState<StudentData | null>(null);
  const [searchedNim, setSearchedNim] = useState('');
  const [loading, setLoading] = useState(true);

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

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const isInputPhase = phase === 'input';

  return (
    <>
      {/* Loading Screen */}
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Custom Cursor (desktop only) */}
      <CustomCursor />

      {/* 3D Background — only shown during countdown phase */}
      {!isInputPhase && (
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>
      )}

      <Navbar />

      <main className={`main-content ${isInputPhase ? 'main-content--input' : ''}`}>
        {/* Background decorations for input phase */}
        {isInputPhase && (
          <>
            <FloatingParticles />
            <GridOverlay />
          </>
        )}

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
