import React, { useState } from "react";

function App() {
   const [breakLength, setBreakLength] = useState(5);
   const [sessionLength, setSessionLength] = useState(25);
   const [clock, setClock] = useState(0); //time type
   return (
      <div className="App container text-center border bg-light">
         <div id="break-label"> Break length </div>
         <div id="session-label"> Session length</div>
         <button id="break-decrement"> Break decrement</button>
         <button id="session-decrement"> Session decrement</button>
         <button id="break-increment"> Break increment</button>
         <button id="session-increment"> Session increment</button>
         <h3 id="break-length">{breakLength}</h3>
         <h3 id="session-length">{sessionLength} </h3>
         <h3 id="timer-label"> Session</h3>
         <p id="time-left">{clock} </p>mm:ss
         <button id="start_stop">Start</button> {/* start stop */}
         <button id="reset">reset</button>
      </div>
   );
}

export default App;
