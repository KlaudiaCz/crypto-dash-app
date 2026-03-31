import { BarLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  width: "150px",
};

const Spinner = ({ color = "blue", size = "150" }) => {
  return (
    <div>
      <BarLoader
        color={color}
        size={size}
        override={override}
        aria-label="Loading..."
      />
    </div>
  );
};

export default Spinner;
