
import React, { useState, useEffect } from 'react';
import { Button } from "@progress/kendo-react-buttons";

const Counter = () => {
  const [count, setCount] = useState(0);
  const incrementCount = () => setCount(count + 1);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  })

  return (
    <>
      <p>You clicked {count} times</p>
      <Button onClick={incrementCount} look="bare">Increment</Button>
    </>
  )
}

export default Counter;