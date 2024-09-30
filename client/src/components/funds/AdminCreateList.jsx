/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FundTableRow } from './FundTableRow';

export function AdminCreateList({ funds }) {
    const [linkVisibility, setLinkVisibility] = useState(true);

    function changeVisibility() {
        setLinkVisibility(pre => !pre);
    }

    return (
        <div className="container px-4 py-5">
            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                <button onClick={changeVisibility} type="button">Rodyti/nerodyti nuotraukos nuorodą</button>
                <table className="table table-bordered border-primary">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nuotrauka</th>
                            <th scope="col">Pavadinimas</th>
                            {linkVisibility ? <th scope="col">Nuotraukos nuoroda</th> : null}
                            <th scope="col">Auka</th>
                            <th scope="col">Jau paaukota suma</th>
                            <th scope="col">Apie auką...</th>
                            <th scope="col">Veiksmai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            funds.map((fund, index) =>
                                <FundTableRow
                                    key={index}
                                    index={index}
                                    linkVisibility={linkVisibility}
                                    {...fund} />)
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
}