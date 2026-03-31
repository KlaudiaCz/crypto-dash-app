import { Link } from "react-router";

const CoinCard = ({ coin }) => {
  const priceChange = coin.price_change_percentage_24h;
  const priceChangeText =
    priceChange !== null && priceChange !== undefined
      ? `${priceChange.toFixed(2)} %`
      : "N/A";
  const priceChangeClass =
    priceChange !== null && priceChange !== undefined
      ? priceChange >= 0
        ? "positive"
        : "negative"
      : "neutral";

  return (
    <Link to={`/coin/${coin.id}`}>
    <div className="coin-card">
      <div className="coin-header">
        <img src={coin.image} alt={coin.name} className="coin-image" />
        <div>
          <h2>{coin.name}</h2>
          <p className="symbol">{coin.symbol?.toUpperCase()}</p>
        </div>
      </div>
      <p>Price: ${coin.current_price?.toLocaleString()}</p>
      <p className={priceChangeClass}>{priceChangeText}</p>
      <p>Market Cap: {coin.market_cap?.toLocaleString()}</p>
    </div>
    </Link>
  );
};

export default CoinCard;
