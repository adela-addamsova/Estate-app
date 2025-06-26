import EstateForm from "../components/EstateForm";
import backgroundImg from '../assets/background.jpg';
// import backgroundHouse from '../assets/house-bg.jpg';
// import backgroundFlat from '../assets/flat-bg.jpg';

function FormPage() {
    return (
        <>
            <div className="form-page">
                <div className="background">
                    {/* <img
                        src={backgroundHouse}
                        alt="Background"
                        className="background-house"
                    />
                    <img
                        src={backgroundFlat}
                        alt="Background"
                        className="background-flat"
                    /> */}
                    <img
                        src={backgroundImg}
                        alt="Background"
                        className="background-image"
                    />
                    <div className="hero-img-overlay"></div>
                </div>
                <EstateForm />
            </div>

        </>
    )
}

export default FormPage;