// components
import Header from "./components/header";

// pages
import Countries from "./pages/countries";
import CountriesSingle from "./pages/countries-single";

// react-router-dom importlari
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/country/:id" element={<CountriesSingle />} />
      </Routes>
    </Router>
  );
};

export default App;
