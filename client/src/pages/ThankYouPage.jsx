import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundLayout from '../components/BackgroundLayout';


function ThankYouPage() {
  return (
    <BackgroundLayout>
      <div className="thank-container">
        <h3>Děkujeme!</h3>
        <p>O Vaší nemovitosti již víme a brzy se Vám ozveme.</p>
        <Link to="/chci-nabidku" className="form-button !w-25 !mx-auto !mt-4">
          Zpět
        </Link>
      </div>
    </BackgroundLayout>
  );
}

export default ThankYouPage;