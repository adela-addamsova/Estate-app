import { Link } from 'react-router-dom';
import BackgroundLayout from '../components/BackgroundLayout';


function ErrorPage() {
  return (
    <BackgroundLayout>
      <div className="error-container">
        <h3>Stránka neexistuje!</h3>
        <Link to="/chci-nabidku" className="form-button !w-25 !mx-auto !mt-4">
          Zpět
        </Link>
      </div>
    </BackgroundLayout>
  );
}

export default ErrorPage;
