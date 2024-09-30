import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { Dashboard } from './pages/Dashboard';
import { GlobalContextWrapper } from './context/GlobalContext';
import { Newfund } from './pages/Newfund';
import { FundsListing } from './pages/FundsListing';

export function App() {
  return (
    <GlobalContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/funds' element={<FundsListing />}></Route>
          <Route path='/funds/new' element={<Newfund />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>

          <Route path='/dashboard' element={<Dashboard />}></Route>

          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextWrapper>
  );
}