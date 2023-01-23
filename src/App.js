import React, { useState } from "react";

function App() {
   const [breakLength, setBreakLength] = useState(5 * 60);
   const [sessionLength, setSessionLength] = useState(25 * 60);
   const [clock, setClock] = useState(25 * 60);
   const [running, setRunning] = useState(false);

   const handleStartStop = () => {
      if (!running) {
         localStorage.setItem("interval-id", setInterval(updateClock, 1000));
         setRunning(true);
      } else {
         clearInterval(localStorage.getItem("interval-id"));
         setRunning(false);
      }
   };

   const updateClock = () => {
      setClock((prev) => prev - 1);
   };

   const handleIncrement = (type) => {
      if (running) return;
      const checkVal = (prev) => {
         if (prev + 60 <= 60 * 60) return prev + 60;
         return 60 * 60;
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
      }
   };

   const handleReset = () => {
      setRunning(false);
      setBreakLength(5 * 60);
      setSessionLength(25 * 60);
      setClock(25 * 60);
      clearInterval(localStorage.getItem("interval-id"));
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
            Start
         </button>
         <button id="reset" onClick={handleReset}>
            reset
         </button>
      </div>
   );
}

export default App;
