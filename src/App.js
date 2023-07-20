import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

import logo from "./logo.svg";
import "./App.css";
import LineChart from "./charts/line";
import topicRecieved from "./charts/topicReceived";
import topicSent from "./charts/topicSent";
import retained from "./charts/retained";

const test = [
  {
    x: "11:55",
    y: 162,
  },
  {
    x: "12:00",
    y: 284,
  },
  {
    x: "12:05",
    y: 210,
  },
  {
    x: "12:15",
    y: 101,
  },
  {
    x: "12:20",
    y: 55,
  },
  {
    x: "12:25",
    y: 122,
  },
  {
    x: "12:30",
    y: 130,
  },
  {
    x: "12:35",
    y: 15,
  },
  {
    x: "12:40",
    y: 49,
  },
  {
    x: "12:45",
    y: 233,
  },
  {
    x: "12:50",
    y: 173,
  },
  {
    x: "12:55",
    y: 185,
  },
];

async function metrics() {
  const n = await fetch(
    "https://api.telemetry.confluent.cloud/v2/metrics/cloud/query",
    {
      // mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic <>",
      },
      body: JSON.stringify({
        aggregations: [{ metric: "io.confluent.kafka.server/received_bytes" }],
        filter: {
          op: "OR",
          filters: [{ field: "resource.kafka.id", op: "EQ", value: "lkc-<>" }],
        },
        granularity: "PT5M",
        intervals: ["2023-07-18T09:47:00-04:00/2023-07-19T09:47:00-04:00"],
        limit: 1000,
      }),
    }
  );
  return n.json();
}

function App() {
  const [testData, setTestData] = useState([
    { id: "lkc-195mwz-topic-1", color: "hsl(224, 70%, 50%)", data: test },
  ]);

  const [received, setReceived] = useState([
    {
      id: "lkc-195mwz-topic-1",
      color: "hsl(224, 70%, 50%)",
      data: [],
    },
  ]);

  useEffect(() => {
    metrics().then((r) => {
      // console.log(r.data);
      // Need to transform the data
      const transformed = r.data.map((item) => ({
        x: DateTime.fromISO(item.timestamp).toLocaleString({
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
        y: item.value,
      }));
      setReceived([
        {
          id: "lkc-195mwz-topic-1",
          color: "hsl(224, 70%, 50%)",
          data: transformed,
        },
      ]);
    });
  }, []);
  console.log(received);

  return (
    <div className="App">
      <div
        className="lineChart"
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "white",
          paddingBottom: "25px",
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
          paddingBottom: "25px",
          display: "flex",
        }}
      >
        <LineChart data={received} axisY={"Bytes"} axisX={"Time"} />
      </div>
      <div
        className="lineChart"
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "white",
          paddingBottom: "25px",
          display: "flex",
        }}
      >
        <LineChart data={testData} axisY={"Bytes"} axisX={"Time"} />
        <LineChart data={topicSent} axisY={"Bytes"} axisX={"Time"} />
      </div>
    </div>
  );
}

export default App;
