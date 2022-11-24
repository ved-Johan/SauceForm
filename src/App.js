import { useState } from "react";
import "./styles.css";

export default function App() {
  const [alert, setAlert] = useState();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [errors, setErrors] = useState({});

  const alertInvalid = () => {
    setAlert(["Error", "error"]);
  };

  const handleSubmit = () => {
    let errors = false;
    if (name.length == 0 || name.length >= 20) {
      alertInvalid();
      setErrorAs("name", true);
      errors = true;
    }
    if (
      number.length == 0 ||
      parseFloat(number) <= 0 ||
      parseFloat(number) >= 200
    ) {
      alertInvalid();
      setErrorAs("number", true);
      errors = true;
    }
    if (errors) return;
    setAlert(["Success", "success"]);
  };

  const setErrorAs = (property, error) => {
    const errorsC = Object.assign({}, errors);
    errorsC[property] = error;
    setErrors(errorsC);
  };

  return (
    <div className="App">
      <h1>Saucelabs Form</h1>
      <div className="border">
        <div className="formContainer">
          <div className="Form">
            <div className="inputContainer">
              <label for="name">
                Name <span className="muted">(Less than 20 characters)</span>
              </label>
              <input
                id="name"
                name="name"
                className={`${errors["name"] ? "inputError" : ""}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setErrorAs("name", false)}
              />
            </div>
            <div className="inputContainer">
              <label for="number">
                Number <span className="muted">(&gt;0 and &lt;200)</span>
              </label>
              <input
                id="number"
                name="number"
                type="number"
                className={`${errors["number"] ? "inputError" : ""}`}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onFocus={() => setErrorAs("number", false)}
              />
            </div>
            <button id="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      {alert && <div className={`alert ${alert[1]}`}>{alert[0]}</div>}
    </div>
  );
}
