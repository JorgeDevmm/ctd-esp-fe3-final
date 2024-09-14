import { Route, Routes } from "react-router-dom";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

import { routes } from "./Utils/routes";

import { Home, Detail, Favs, Contact, Error } from "./Routes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.contact} element={<Contact />} />
        <Route path={`${routes.favs}`} element={<Favs />} />
        <Route path={`${routes.detail}/:id`} element={<Detail />} />
        <Route path={routes.notFound} element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
