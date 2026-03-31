import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import Spinner from "../components/Spinner";
const API_URL = import.meta.env.VITE_COIN_API_URL; // Pobieramy URL z pliku .env

const CoinDetailsPage = () => {
  const { id } = useParams(); // Pobierz ID monety z parametrów URL

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`); // Pobierz dane monety z API
        if (!res.ok) throw new Error("Failed to fetch coin details");
        const data = await res.json();
        setCoin(data); // Zapisz dane monety w stanie
      } catch (err) {
        setError(err.message); // Zapisz komunikat o błędzie w stanie
      } finally {
        setLoading(false); // Zakończ tryb ładowania
      }
    };
    fetchCoin(); // Wywołaj funkcję pobierającą dane monety
  }, [id]); // Efekt uruchamiany przy zmianie ID monety
  return (
    <div className="coin-details-container">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
      <h1 className="coin-details-title">
        {coin
          ? `${coin.name} (${coin.symbol.toUpperCase()})`
          : "Coin Details"}{" "}
      </h1>
      {loading && <Spinner />} {/* Wyświetl spinner podczas ładowania */}
      {error && <div className="error">❌ {error}</div>}
      {!loading && !error && (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className="coin-details-image"
          />
          <p>{coin.description.en.split(". ")[0] + "."}</p>

          <div className="coin-details-info">
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>
              Current Price: $
              {coin.market_data.current_price.usd.toLocaleString()}
            </h3>
            <h4>
              Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
            </h4>
            <h4>24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</h4>
            <h4>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>
            <h4>
              24h Price Change: ${coin.market_data.price_change_24h.toFixed(2)}{" "}
              ({coin.market_data.price_change_percentage_24h.toFixed(2)}%)
            </h4>
            <h4>
              Circulating Supply:{" "}
              {coin.market_data.circulating_supply.toLocaleString()}
            </h4>
            <h4>
              Total Supply:{" "}
              {coin.market_data.total_supply?.toLocaleString() || "N/A"}
            </h4>
            <h4>
              All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{" "}
              {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              All-Time Low: ${coin.market_data.atl.usd.toLocaleString()} on{" "}
              {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              Last Updated: {new Date(coin.last_updated).toLocaleDateString()}
            </h4>
          </div>

          <div className="coin-details-links">
            {coin.links.homepage[0] && ( // Sprawdź, czy pierwszy link w tablicy homepage istnieje
              <p>
                🌐{" "}
                <a
                  href={coin.links.homepage[0]} // Pobierz pierwszy link z tablicy homepage
                  target="_blank" // Otwórz link w nowej karcie
                  rel="noopener noreferrer" // Zapewnij bezpieczeństwo przy otwieraniu linku
                >
                  Official Website
                </a>
              </p>
            )}
            {coin.links.blockchain_site[0] && (
              <p>
                🔗{" "}
                <a
                  href={coin.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blockchain Explorer
                </a>
              </p>
            )}
            {coin.categories.length > 0 && (
              // Sprawdź, czy istnieją kategorie i wyświetl je jako listę oddzieloną przecinkami
              <p>🏷️ Categories: {coin.categories.join(", ")}</p>
            )}
          </div>
        </>
      )}
      {!loading && !error && !coin && <p>No Data Found!</p>}{" "}
      {/* Obsługa przypadku, gdy nie znaleziono danych o monecie */}
    </div>
  );
};

export default CoinDetailsPage;
