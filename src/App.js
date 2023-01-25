import React, { useState, useEffect } from "react";

function App() {
   const [breakLength, setBreakLength] = useState(2 * 60);
   const [sessionLength, setSessionLength] = useState(1 * 60);
   const [clock, setClock] = useState(1 * 60);
   const [running, setRunning] = useState(false);
   const [isBreak, setBreakState] = useState(false);

   useEffect(() => {
      if (clock < 0) {
         clearInterval(localStorage.getItem("interval-id"));
         if (isBreak) {
            setClock(sessionLength);
         } else {
            setClock(breakLength);
         }
         setBreakState((prev) => !prev);
         const interval = setInterval(tick, 1000);
         localStorage.setItem("interval-id", interval);
      }
   }, [clock]);

   const handleStartStop = () => {
      if (running) {
         clearInterval(localStorage.getItem("interval-id"));
         localStorage.clear();
      } else {
         const interval = setInterval(tick, 1000);
         localStorage.setItem("interval-id", interval);
      }
      setRunning((prev) => !prev);
   };

   const tick = () => {
      console.log("TICK");
      setClock((prev) => prev - 60);
   };

   const handleIncrement = (type) => {
      const minute = 60;
      if (running) return;
      const checkVal = (prev) => {
         if (prev + minute <= minute * 60) return prev + minute;
         return minute * 60;
      };
      if (type === "break") {
         setBreakLength(checkVal);
      } else {
         setSessionLength(checkVal);
         setClock(checkVal);
      }
   };

   const handleDecrement = (type) => {
      if (running) return;
      const checkVal = (prev) => {
         if (prev - 60 > 0) return prev - 60;
         return 0;
      };
      if (type === "break") {
         setBreakLength(checkVal);
      } else {
         setSessionLength(checkVal);
         setClock(checkVal);
      }
   };

   const handleReset = () => {
      setRunning(false);
      setBreakLength(5 * 60);
      setSessionLength(25 * 60);
      setClock(25 * 60);
      localStorage.clear();
   };

   const formatToMin = (timeInSecs) => {
      return timeInSecs / 60;
   };

   const formatToClock = (timeInSecs) => {
      const mins = Math.floor(timeInSecs / 60);
      const secs = timeInSecs % 60;
      return `${mins} : ${secs >= 10 ? secs : "0" + secs}`;
   };
   return (
      <div className="App container text-center border bg-light">
         <div className="d-flex justify-content-center mb-3">
            <div>
               <div id="break-label"> Break length </div>
               <h3 id="break-length">{formatToMin(breakLength)}</h3>
               <button id="break-decrement" onClick={() => handleDecrement("break")}>
                  Break -
               </button>
               <button id="break-increment" onClick={() => handleIncrement("break")}>
                  Break +
               </button>
            </div>
            <div>
               <div id="session-label"> Session length</div>
               <h3 id="session-length">{formatToMin(sessionLength)} </h3>
               <button id="session-decrement" onClick={() => handleDecrement("session")}>
                  Session -
               </button>
               <button id="session-increment" onClick={() => handleIncrement("session")}>
                  Session +
               </button>
            </div>
         </div>
         <h3 id="timer-label"> Session</h3>
         <p id="time-left">{formatToClock(clock)} </p>
         <button id="start_stop" onClick={handleStartStop}>
            Start/Stop
         </button>
         <button id="reset" onClick={handleReset}>
            reset
         </button>
      </div>
   );
}

export default App;
