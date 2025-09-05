import { useState } from 'react';
const [count, setCount] = useState(0);

function Counter() {
    return (
        <div>
            <p>Current Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    )
}

export default Counter;