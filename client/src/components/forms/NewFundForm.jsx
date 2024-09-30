import { useState } from "react";

export function NewFundForm() {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [img, setImg] = useState('');
    const [imgError, setImgError] = useState('');
    const [sumtotal, setSumtotal] = useState('');
    const [sumtotalError, setSumtotalError] = useState('');

    const [sum, setSum] = useState('');
    const [sumError, setSumError] = useState('');

    const [about, setAbout] = useState('');
    const [aboutError, setAboutError] = useState('');



    const [isFormValidated, setIsFormValidated] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

    function isValid(str) {
        return typeof str === 'string' && str.length > 0;
    }

    function submitForm(e) {
        e.preventDefault();

        setIsFormValidated(true);

        setNameError(isValid(name) ? '' : 'Trūksta vietos/objekto pavadinimo');
        setImgError(isValid(img) ? '' : 'Trūksta nuorodos');
        setSumtotalError(isValid(sumtotal) ? '' : 'Trūksta visos sumos');
        setSumError(isValid(sum) ? '' : 'Trūksta sumos');
        setAboutError(isValid(about) ? '' : 'Trūksta apibūdinimo');



        if (!nameError && !imgError && !sumtotalError && !sumError && !aboutError) {
            fetch('http://localhost:5030/api/funds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    img,
                    sumtotal,
                    sum,
                    about,
                }),
            })
                .then(res => res.json())
                .then(data => setApiResponse(data))
                .catch(err => console.error(err));
        }
    }

    return (
        <main className="form-signin container">
            <div className="row">
                <form onSubmit={submitForm} className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <h1 className="h3 mb-3 fw-normal">Nauja aukojimo forma</h1>

                    {apiResponse && apiResponse.status === 'success' ? <p className="alert alert-success">{apiResponse.msg}</p> : null}
                    {apiResponse && apiResponse.status === 'error' ? <p className="alert alert-danger">{apiResponse.msg}</p> : null}


                    <div className="form-floating">
                        <input value={name} onChange={e => setName(e.target.value.trim())}
                            type="text" id="name" placeholder="Pavadinimas"
                            className={'form-control ' + (isFormValidated ? nameError ? 'is-invalid' : 'is-valid' : '')} />
                        <label htmlFor="name">Aukos pavadinimas</label>
                        {nameError && <p className="invalid-feedback">{nameError}</p>}
                    </div>

                    <div className="form-floating">
                        <input value={img} onChange={e => setImg(e.target.value.trim())}
                            type="text" id="img" placeholder="Image"
                            className={'form-control ' + (isFormValidated ? imgError ? 'is-invalid' : 'is-valid' : '')} />
                        <label htmlFor="img">Nuotrauka</label>
                        {imgError && <p className="invalid-feedback">{imgError}</p>}
                    </div>

                    <div className="form-floating">
                        <input value={sumtotal} onChange={e => setSumtotal(e.target.value.trim())}
                            type="text" id="sumtotal" placeholder="Aukos suma"
                            className={'form-control ' + (isFormValidated ? sumtotalError ? 'is-invalid' : 'is-valid' : '')} />
                        <label htmlFor="sumtotal">Aukos suma</label>
                        {sumtotalError && <p className="invalid-feedback">{sumtotalError}</p>}
                    </div>

                    <div className="form-floating">
                        <input value={sum} onChange={e => setSum(e.target.value.trim())}
                            type="text" id="sum" placeholder="sum"
                            className={'form-control ' + (isFormValidated ? sumError ? 'is-invalid' : 'is-valid' : '')} />
                        <label htmlFor="sum">Paaukota suma</label>
                        {sumError && <p className="invalid-feedback">{sumError}</p>}
                    </div>
                    <div className="form-floating">
                        <input value={about} onChange={e => setAbout(e.target.value.trim())}
                            type="text" id="about" placeholder="about"
                            className={'form-control ' + (isFormValidated ? aboutError ? 'is-invalid' : 'is-valid' : '')} />
                        <label htmlFor="about">Kodėl reikalinga auka...</label>
                        {aboutError && <p className="invalid-feedback">{aboutError}</p>}
                    </div>


                

                    <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Pridėti</button>
                </form>
            </div>
        </main>
    );
}