import { useState, useEffect } from "react";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import CoinDetailsPage from "./pages/coin-details";
import NotFoundPage from "./pages/not-found";
import Header from "./components/Header";
import { Route, Routes } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true); // uruchom tryb ładowania przy każdej zmianie limitu
      setError(null); // wyczyść poprzedni błąd
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
        );
        if (!res.ok) throw new Error("Failed to fetch data"); // jeśli odpowiedź serwera nie jest OK, zgłoś błąd
        const data = await res.json(); // sparsuj (przetworzyć dane) odpowiedź jako JSON
        setCoins(data); // zapisz dane o monetach w stanie komponentu
      } catch (err) {
        setError(err.message); // zapisz komunikat o błędzie w stanie
      } finally {
        setLoading(false); // zakończ tryb ładowania niezależnie od wyniku
      }
    };
    fetchCoins(); // wywołaj funkcję pobierającą dane o monetach
  }, [limit]); // efekt uruchamiany przy zmianie limitu

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin/:id" element={<CoinDetailsPage />} /> {/* Dodajemy trasę dla szczegółów monety */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
