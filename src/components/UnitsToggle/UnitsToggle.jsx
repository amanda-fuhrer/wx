import "./UnitsToggle.scss";

function UnitsToggle({ selectedUnits, setSelectedUnits }) {
  const isMetricSelected = selectedUnits === "metric";
  const isImperialSelected = selectedUnits === "imperial";

  return (
    <div className="toggle">
      <div className="toggle__container">
        <button
          className={`toggle__button--celsius ${isMetricSelected ? "selected" : ""}`}
          onClick={() => setSelectedUnits("metric")}
        >
          °C
        </button>
        <button
          className={`toggle__button--fahrenheit ${isImperialSelected ? "selected" : ""}`}
          onClick={() => setSelectedUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default UnitsToggle;
