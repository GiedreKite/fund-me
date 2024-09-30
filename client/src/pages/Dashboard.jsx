
import { useContext, useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { PublicFundList } from "../components/funds/PublicFundList";

export function Dashboard() {
    const { isLoggedIn, role, likedfunds } = useContext(GlobalContext);
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

    return (
        <>
            <Header />
            {
                isLoggedIn &&
                <main>
                    <section className="container">
                        <div className="row">
                            <div className="col-12">
                                <div>
                                    <h1>Dashboard</h1>
                                    <Link to='/funds/new' className="btn btn-primary">+ Nauja auka</Link>
                                </div>
                                {
                                    role === 'user' &&
                                    <PublicFundList
                                        funds={funds.filter(obj => likedfunds.includes(obj.id))} />
                                }
                            </div>
                        </div>
                    </section>
                </main>
            }
            {
                !isLoggedIn &&
                <main>
                    <section className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1>401</h1>
                                <p>sitas puslapis mato tik prisijungusiems vartotojams, eik i LOGIN psl</p>
                            </div>
                        </div>
                    </section>
                </main>
            }
            <Footer />
        </>
    );
}