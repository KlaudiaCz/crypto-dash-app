import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";
import Spinner from "../components/Spinner";

const HomePage = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
}) => {
  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase()) // sprawdź, czy nazwa lub symbol monety zawiera tekst z filtra (ignorując wielkość liter)
      );
    })
    // po przefiltrowaniu tworzymy kopię wyniku, bo sortowanie zmienia tablicę w miejscu,
    // a potem sortujemy tę kopię według wybranego kryterium `sortBy`.
    .slice() // utwórz kopię tablicy przed sortowaniem, aby nie modyfikować oryginalnych danych
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.marked_cap - a.market_cap; // sortuj malejąco po kapitalizacji rynkowej
        case "market_cap_asc":
          return a.market_cap - b.market_cap; // sortuj rosnąco po kapitalizacji rynkowej
        case "price_desc":
          return b.current_price - a.current_price; // sortuj malejąco po cenie
        case "price_asc":
          return a.current_price - b.current_price; // sortuj rosnąco po cenie
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h; // sortuj malejąco po zmianie procentowej
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h; // sortuj rosnąco po zmianie procentowej
        default:
          return 0; // jeśli nie ma dopasowania, nie zmieniaj kolejności
      }
    });
  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading && <Spinner />}{" "} 
      {/* wyświetl komunikat o ładowaniu, jeśli dane są w trakcie pobierania */}
      {error && <div className="error">{error}</div>}{" "}
      {/* wyświetl komunikat o błędzie, jeśli wystąpił */}
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />{" "}
        {/* komponent do filtrowania, przekazując aktualny filtr i funkcję do jego zmiany */}
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />{" "}
        <LimitSelector limit={limit} onLimitChange={setLimit} />{" "}
        {/* komponent do wyboru limitu, przekazując aktualny limit i funkcję do jego zmiany */}
      </div>
      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              <CoinCard
                key={coin.id} // unikalny klucz dla każdego elementu listy, używając id monety
                coin={coin} // przekazanie danych o monecie jako props do komponentu CoinCard
              />
            ))
          ) : (
            <p>No matching coins found.</p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
