import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import FormPage from './pages/FormPage';
import ThankYouPage from './pages/ThankYouPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/chci-nabidku" replace />} />
        <Route path="/chci-nabidku" element={<FormPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
