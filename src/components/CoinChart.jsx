import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
); // Rejestrujemy potrzebne komponenty Chart.js
const API_URL = import.meta.env.VITE_COIN_API_URL; // Pobieramy URL z pliku .env

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null); // Stan do przechowywania danych wykresu
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch(
        `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`,
      ); // Pobierz dane cenowe z API

      const data = await res.json(); // Parsujemy odpowiedź jako JSON

      const prices = data.prices.map((price) => ({ x: price[0], y: price[1] })); // Przekształcamy dane do formatu {x: timestamp, y: price}

      setChartData({
        datasets: [
          {
            label: "Price (USD)",
            data: prices,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      }); // Ustawiamy dane wykresu w stanie
      setLoading(false); // Zakończ tryb ładowania
    };
    fetchPrices(); // Wywołujemy funkcję pobierającą dane
  }, [coinId]); // Efekt uruchamiany przy zmianie ID monety

  if (loading) return <p>Loading chart...</p>; // Wyświetl komunikat podczas ładowania danych
  return (
    <div style={{ marginTop: "30px" }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false},
          },
          scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 7,
                }
            },
            y: {
                ticks: {
                    callback: (value) => `$${value.toLocaleString()}`, // Formatowanie osi Y jako dolarów
                }
            }
          }
        }}
      />{" "}
      {/* Renderujemy wykres liniowy z danymi z chartData */}
    </div>
  );
};

export default CoinChart;
