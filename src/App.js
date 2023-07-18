import logo from "./logo.svg";
import "./App.css";
import LineChart from "./charts/line";
import topicRecieved from "./charts/topicReceived";
import topicSent from "./charts/topicSent";
import retained from "./charts/retained";

function App() {
  return (
    <div className="App">
      <div
        className="lineChart"
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "white",
          display: "flex",
        }}
      >
        <LineChart data={retained} axisY={"Bytes"} axisX={"Time"} />
      </div>
      <div
        className="lineChart"
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "white",
          display: "flex",
        }}
      >
        <LineChart data={topicRecieved} axisY={"Bytes"} axisX={"Time"} />
        <LineChart data={topicSent} axisY={"Bytes"} axisX={"Time"} />
      </div>
    </div>
  );
}

export default App;
