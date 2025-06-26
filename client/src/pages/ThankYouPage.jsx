import { Link } from 'react-router-dom';
import BackgroundLayout from '../components/BackgroundLayout';


function LeadPage() {
  return (
    <BackgroundLayout>
      <div className="thank-container">
        <h3 className="">Děkujeme!</h3>
        <p>O Vaší nemovitosti již víme a brzy se Vám ozveme.</p>
        <Link to="/lead" className="form-button !w-25 !mx-auto !mt-4">
          Zpět
        </Link>
      </div>
    </BackgroundLayout>
  );
}

export default LeadPage;