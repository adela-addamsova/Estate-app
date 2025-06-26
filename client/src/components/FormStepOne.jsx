import CZMap from './CzMap';

function FormStepOne({ form, setForm, districtsByRegion, handleChange }) {
    return (
        <>
            <div className='estate-type-container'>
                <h3>Typ nemovitosti:</h3>
                <div className="estate-type">
                    {['dům', 'byt', 'pozemek'].map((type) => (
                        <label key={type} className="radio-estate-type">
                            <input
                                type="radio"
                                name="estateType"
                                value={type}
                                checked={form.estateType === type}
                                onChange={handleChange}
                                className="accent-gold"
                            />
                            <span>{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className='region-container'>
                <h3>Kde se nachází vaše nemovitost?</h3>
                <h4>Klikněte na kraj a následně vyberte okres.</h4>
                <CZMap
                    region={form.region}
                    onSelect={(region) => {
                        setForm({ ...form, region, district: '' });
                    }}
                />
            </div>

            {form.region && <h4 className="text-gold">Kraj: {form.region}</h4>}

            {form.region && districtsByRegion[form.region] && (
                <fieldset className="district-container">
                    <legend>Vyberte okres</legend>
                    {districtsByRegion[form.region].map((district) => (
                        <label key={district} className="district-inner">
                            <input
                                type="radio"
                                name="district"
                                value={district}
                                checked={form.district === district}
                                onChange={handleChange}
                                className="accent-gold"
                            />
                            <span>{district}</span>
                        </label>
                    ))}
                </fieldset>
            )}
        </>
    );
}

export default FormStepOne;
