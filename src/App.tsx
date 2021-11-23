import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function doFetch() {
      const response = await fetch('/api/hello');
      const result = await response.json();
      setMessage(result.message);
    }
    doFetch();
  }, []);

  return (
    <>
      <h1>Hallo React App</h1>
      <p>{message}</p>
    </>
  );
}

export default App;
