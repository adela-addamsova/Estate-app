// components/FormStepTwo.jsx

function FormStepTwo({ form, setForm, errors, handleChange, setErrors }) {
    return (
        <div className='step-two-container'>
            <div className='fullname-container'>
                <input
                    name="fullName"
                    placeholder="Celé jméno"
                    value={form.fullName}
                    onChange={handleChange}
                    className={`fullname mt-8 ${errors.fullName ? 'error-container' : ''}`}
                />
                {errors.fullName && <p className="error-message">{errors.fullName}</p>}
            </div>

            <div className="phone-container relative">
                <span className="phone-prefix">+420</span>
                <input
                    name="phone"
                    value={form.phone}
                    onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, '');
                        if (digitsOnly.length <= 9) {
                            setForm({ ...form, phone: digitsOnly });
                            setErrors({ ...errors, phone: '' });
                        }
                    }}
                    maxLength={9}
                    placeholder="123456789"
                    inputMode="numeric"
                    className={`phone !pl-[68px] ${errors.phone ? 'error-container' : ''}`}
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>

            <div className='email-container'>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    className={`email ${errors.email ? 'error-container' : ''}`}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
        </div>
    );
}

export default FormStepTwo;
