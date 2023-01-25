import React, { useState, useEffect, useRef } from "react";

function App() {
   const [breakLength, setBreakLength] = useState(5 * 60);
   const [sessionLength, setSessionLength] = useState(25 * 60);
   const [clock, setClock] = useState(25 * 60);
   const [running, setRunning] = useState(false);
   const [isNextBreak, setIsNextBreakState] = useState(true);
   const audioBeep = useRef();
   useEffect(() => {
      if (clock < 0) {
         clearInterval(localStorage.getItem("interval-id"));
         audioBeep.current.play();
         if (isNextBreak) {
            setClock(breakLength);
         } else {
            setClock(sessionLength);
         }
         setIsNextBreakState((prev) => !prev);
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
      setClock((prev) => prev - 1);
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
         return 60;
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
      setIsNextBreakState(true);
      setBreakLength(5 * 60);
      setSessionLength(25 * 60);
      setClock(25 * 60);
      clearInterval(localStorage.getItem("interval-id"));
      audioBeep.current.pause();
      audioBeep.current.currentTime = 0;
      localStorage.clear();
   };

   const formatToMin = (timeInSecs) => {
      return timeInSecs / 60;
   };

   const formatToClock = (timeInSecs) => {
      const mins = Math.floor(timeInSecs / 60);
      const secs = timeInSecs % 60;
      return `${mins >= 10 ? mins : "0" + mins}:${secs >= 10 ? secs : "0" + secs}`;
   };
   return (
      <div className="App container text-center  bg-light w-50 p-5">
         <div className="d-flex justify-content-center mb-3">
            <div className="border mx-3 p-3">
               <div id="break-label"> Break length </div>
               <h3 id="break-length">{formatToMin(breakLength)}</h3>
               <button className="m-1" id="break-decrement" onClick={() => handleDecrement("break")}>
                  Break -
               </button>
               <button id="break-increment" onClick={() => handleIncrement("break")}>
                  Break +
               </button>
            </div>
            <div className="border mx-3 p-3">
               <div id="session-label"> Session length</div>
               <h3 id="session-length">{formatToMin(sessionLength)} </h3>
               <button className="m-1" id="session-decrement" onClick={() => handleDecrement("session")}>
                  Session -
               </button>
               <button id="session-increment" onClick={() => handleIncrement("session")}>
                  Session +
               </button>
            </div>
         </div>
         <h3 id="timer-label">{isNextBreak ? "Session" : "Break"}</h3>
         <p id="time-left">{formatToClock(clock)} </p>
         <button className="m-1" id="start_stop" onClick={handleStartStop}>
            Start/Stop
         </button>
         <button id="reset" onClick={handleReset}>
            reset
         </button>
         <audio ref={audioBeep} id="beep">
            <source src="https://assets.mixkit.co/sfx/preview/mixkit-dog-barking-twice-1.mp3" type="audio/mp3" />
            Your browser does not support the audio tag.
         </audio>
      </div>
   );
}

export default App;
