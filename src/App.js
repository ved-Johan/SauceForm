import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>New Form</h1>
      <div className="Form">
        <div className="inputContainer">
          <label for="name">Name</label>
          <input id="name" name="name" />
        </div>
        <div className="inputContainer">
          <label for="number">Number</label>
          <input id="number" name="number" />
        </div>
        <div className="inputContainer">
          <label for="date">Date</label>
          <input id="date" name="date" />
        </div>
        <button id="submit">Submit</button>
      </div>
    </div>
  );
}
