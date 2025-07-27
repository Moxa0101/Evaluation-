import '../App.css';
import React, { useState } from 'react';

function Counter() {


    const [counter, setCounter] = useState(0);

    function decrement() {
        return setCounter(counter - 1);


    }
    function increment() {
        return setCounter(counter + 1);
    }
    return (


        <>
            <button onClick={decrement} disabled={counter === 0}>  - </button>
            <span> {counter} </span>
            <button onClick={increment} disabled={counter === 100}>  + </button>
            <div><button onClick={() => setCounter(0)}>Reset</button></div>

        </>
    );
}

export default Counter;
