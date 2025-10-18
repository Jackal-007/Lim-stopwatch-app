import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartStop = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) setLaps([...laps, time]);
  };

  return (
    <div className="container">
      <h1>⏱ Stopwatch</h1>
      <div className="time-display">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={handleStartStop}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={handleLap} disabled={!isRunning}>
          Lap
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {laps.length > 0 && (
        <div className="laps">
          <h3>Laps</h3>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>
                Lap {index + 1}: {formatTime(lap)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
