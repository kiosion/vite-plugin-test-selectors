import React, { useState } from 'react';

const Counter: React.FunctionComponent<any> = ({ props }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="card" {...props}>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  );
};

export default Counter;
