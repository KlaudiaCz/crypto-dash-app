import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch data"); // jeśli odpowiedź serwera nie jest OK, zgłoś błąd
        const data = await res.json(); // sparsuj (przetworzyć dane) odpowiedź jako JSON
        console.log(data); // wyświetl pobrane dane w konsoli
        setCoins(data); // zapisz dane o monetach w stanie komponentu
      } catch (err) {
        setError(err.message); // zapisz komunikat o błędzie w stanie
      } finally {
        setLoading(false); // zakończ tryb ładowania niezależnie od wyniku
      }
    }
    fetchCoins(); // wywołaj funkcję pobierającą dane o monetach
  }, []); // efekt uruchamiany tylko raz po pierwszym renderze komponentu

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading && <p>Loading...</p>} {/* wyświetl komunikat o ładowaniu, jeśli dane są w trakcie pobierania */}
      {error && <div className="error">{error}</div>} {/* wyświetl komunikat o błędzie, jeśli wystąpił */}

      {!loading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <CoinCard
              key={coin.id} // unikalny klucz dla każdego elementu listy, używając id monety
              coin={coin} // przekazanie danych o monecie jako props do komponentu CoinCard
            />
          ))}
        </main>
      )}
    </div>
  );
};

export default App;
