import React, { useState } from "react";

function App() {
   const [breakLength, setBreakLength] = useState(5);
   const [sessionLength, setSessionLength] = useState(25);
   const [clock, setClock] = useState(25 * 60 * 1000); //time type
   const [timeInterval, setTimeInterval] = useState(0);

   const handleReset = () => {
      setClock(25 * 60 * 1000);
      clearInterval(timeInterval);
      setTimeInterval(0);
      setBreakLength(5);
      setSessionLength(25);
   };

   const handleStartStop = () => {
      if (timeInterval === 0) {
         setTimeInterval(setInterval(() => setClock(updateClock), 1000));
         return;
      } else {
         clearInterval(timeInterval);
         setTimeInterval(0);
      }
   };

   const updateClock = (prev) => {
      if (prev > 0) {
         return prev - 1000;
      } else {
         clearInterval(timeInterval);
         setTimeInterval(0);
         return 0;
      }
   };

   /*  const toSecs = (timestamp) => {
     return (timestamp / 100) % 60;
    };
    
    const toMins = (timestamp) => {
      return Math.floor(timestamp / 1000 / 60);
    }; */

   const formatClock = () => {
      /*   const secs = (clock / 100) % 60;
      const mins = Math.floor(clock / 1000 / 60);
      return `${(mins, " : ", secs)}`; */
      return clock / 1000;
   };

   const handleBreakDecrement = () => {
      setBreakLength((prev) => {
         if (prev - 1 > 0) return prev - 1;
         return 1;
      });
   };

   const handleBreakIncrement = () => {
      setBreakLength((prev) => prev + 1);
   };
   const handleSessionDecrement = () => {
      setSessionLength((prev) => {
         if (prev > 0) return prev - 1;
         return 0;
      });
      setClock(() => sessionLength * 1000);
   };

   const handleSessionIncrement = () => {
      setSessionLength((prev) => {
         if (prev + 1 <= 60) return prev + 1;
         return 60;
      });
      setClock(() => sessionLength * 1000);
   };

   return (
      <div className="App container text-center border bg-light">
         <div className="d-flex justify-content-center mb-3">
            <div>
               <div id="break-label"> Break length </div>
               <h3 id="break-length">{breakLength}</h3>
               <button id="break-decrement" onClick={handleBreakDecrement}>
                  Break -
               </button>
               <button id="break-increment" onClick={handleBreakIncrement}>
                  Break +
               </button>
            </div>
            <div>
               <div id="session-label"> Session length</div>
               <h3 id="session-length">{sessionLength} </h3>
               <button id="session-decrement" onClick={handleSessionDecrement}>
                  Session -
               </button>
               <button id="session-increment" onClick={handleSessionIncrement}>
                  Session +
               </button>
            </div>
         </div>
         <h3 id="timer-label"> Session</h3>
         <p id="time-left">{formatClock(clock)} </p>
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
