import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateStep2 } from '../utils/validations';
import { districtsByRegion } from '../utils/districts';
import FormStepOne from './FormStepOne';
import FormStepTwo from './FormStepTwo';

function EstateForm() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        estateType: '',
        fullName: '',
        phone: '',
        email: '',
        region: '',
        district: '',
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const isStep1Filled =
        form.estateType.trim() !== '' &&
        form.region.trim() !== '' &&
        form.district.trim() !== '';

    const isStep2Filled =
        form.fullName.trim() !== '' &&
        form.email.trim() !== '' &&
        form.phone.length === 9;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const validationErrors = validateStep2(form);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        const dataToSend = { ...form };

        try {
            const res = await fetch('http://localhost:3000/api/estates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            if (res.ok) {
                navigate('/lead');
            } else {
                const data = await res.json();
                setMessage(`${data.error}: ${data.details}`);
            }
        } catch {
            setMessage('Odeslání formuláře se nezdařilo. Zkuste to prosím znovu.');
        }
    };

    return (
        <div className="form-container">
            <div className="form-container-inner">
                <form onSubmit={handleSubmit} noValidate className='estate-form'>
                    {step === 1 && (
                        <FormStepOne
                            form={form}
                            setForm={setForm}
                            errors={errors}
                            districtsByRegion={districtsByRegion}
                            handleChange={handleChange}
                        />
                    )}

                    {step === 2 && (
                        <FormStepTwo
                            form={form}
                            setForm={setForm}
                            errors={errors}
                            setErrors={setErrors}
                            handleChange={handleChange}
                        />
                    )}

                    <div className="form-buttons">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="form-button"
                            >
                                Zpět
                            </button>
                        )}

                        {step < 2 && (
                            <button
                                type="button"
                                onClick={() => setStep(step + 1)}
                                disabled={!isStep1Filled}
                                className="form-button !ml-auto disabled:opacity-50"
                            >
                                Dále
                            </button>
                        )}

                        {step === 2 && (
                            <button
                                type="submit"
                                disabled={!isStep2Filled}
                                className="form-button ml-auto !bg-gold disabled:opacity-50"
                            >
                                Odeslat
                            </button>
                        )}
                    </div>
                </form>

                {message && (
                    <p className="mt-4 text-sm text-red-600">
                        {message}
                    </p>
                )}
            </div>
        </div>

    );
}

export default EstateForm;
