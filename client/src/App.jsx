import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import FormPage from './pages/FormPage'; 
import LeadPage from './pages/LeadPage'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/chci-nabidku" replace />} />
        <Route path="/chci-nabidku" element={<FormPage />} />
        <Route path="/lead" element={<LeadPage />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;