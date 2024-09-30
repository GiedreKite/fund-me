import { useContext, useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { GlobalContext } from "../context/GlobalContext";
import { AdminCreateList } from "../components/funds/AdminCreateList";
import { PublicFundList } from "../components/funds/PublicFundList";

export function FundsListing() {
    const { role } = useContext(GlobalContext);
    const [funds, setfunds] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5030/api/funds')
            .then(res => res.json())
            .then(obj => {
                if (typeof obj !== 'object') {
                    throw new Error('Is serverio atejo ne objektas');
                } else {
                    setfunds(obj.data);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    let list = null;

    if (role === 'admin') {
        list = <AdminCreateList funds={funds} />;
    } else {
        list = <PublicFundList funds={funds} />;
    }

    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Prašymai aukoms</h1>
                            <p>Prašome peržiūrėti istorijas, kam yra renkamos lėšos...</p>
                        </div>
                    </div>
                </div>
                {list}
            </main>
            <Footer />
        </>
    );
}