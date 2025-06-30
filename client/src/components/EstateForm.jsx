import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isStep1Filled, isStep2Filled, isStep2Valid } from '../utils/validations';
import { districtsByRegion } from '../utils/districts';
import FormStepOne from './FormStepOne';
import FormStepTwo from './FormStepTwo';

const hostname = import.meta.env.VITE_HOSTNAME;
const port = import.meta.env.VITE_PORT;

function EstateForm() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const backendEndpoint = `http://${hostname}:${port}/lead`;

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
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const validationErrors = isStep2Valid(form);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        const dataToSend = { ...form };

        try {
            const res = await fetch(backendEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            if (res.ok) {
                navigate('/thank-you');
            } else {
                const data = await res.json();
                console.error('Backend validation failed:', data);
                setMessage('Odeslání formuláře se nezdařilo. Zkontrolujte prosím správnost údajů.');
            }
        } catch (error) {
            console.error('Submit error:', error);
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
                                onClick={() => {
                                    setStep(step - 1);
                                    if (message) { setMessage('') };
                                }}
                                className="form-button"
                            >
                                Zpět
                            </button>
                        )}

                        {step < 2 && (
                            <button
                                type="button"
                                onClick={() => setStep(step + 1)}
                                disabled={!isStep1Filled(form)}
                                className="form-button !ml-auto"
                            >
                                Dále
                            </button>
                        )}

                        {step === 2 && (
                            <button
                                type="submit"
                                disabled={!isStep2Filled(form)}
                                className="form-button ml-auto !bg-gold"
                            >
                                Odeslat
                            </button>
                        )}
                    </div>
                </form>

                {message && (
                    <p className="mt-4 text-[16px] text-red-600">
                        {message}
                    </p>
                )}
            </div>
        </div>

    );
}

export default EstateForm;
