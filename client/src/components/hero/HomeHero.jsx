import hero from '../../assets/hero.png';

export function HomeHero() {
    return (
        <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img src={hero} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
                </div>
                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Pagalba bendruomenei</h1>
                    <p className="lead">Aukojimas žmonėms, jų poreikiams ir svajonėms – tai kilnus ir prasmingas veiksmas, kuriuo siekiama padėti tiems, kurie to labiausiai reikia. Ši paslauga ne tik teikia konkrečią pagalbą, bet ir skatina bendruomeniškumą, dalinimąsi ir užuojautą. Kiekvienas aukos gestas – tai galimybė įgyvendinti svajones, suteikti viltį ir pakeisti gyvenimus. Aukoje slypi giliausia empatija, leidžianti pajusti ir suprasti kitų žmonių išgyvenimus, todėl kiekvienas prisidėjimas prisideda prie gražesnės ir dosnesnės visuomenės kūrimo. Teikdami šią paslaugą, mes ne tik remiame konkrečius projektus ir iniciatyvas, bet ir skatiname pozityvius pokyčius mūsų aplinkoje, kviesdami visus kartu siekti geresnio rytojaus.</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              
                    </div>
                </div>
            </div>
        </div>
    );
}