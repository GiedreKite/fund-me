import { useContext } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { GlobalContext } from "../context/GlobalContext";
import { SecretContent } from "../components/secret-content/SecretContent";
import { NewFundForm } from "../components/forms/NewFundForm";

export function Newfund() {
    const { isLoggedIn, role } = useContext(GlobalContext);

    return (
        <>
            <Header />
            {isLoggedIn && role === 'admin' && <NewFundForm />}
            {(!isLoggedIn || role !== 'admin') && <SecretContent dedicatedRole="admin" />}
            <Footer />
        </>
    );
}