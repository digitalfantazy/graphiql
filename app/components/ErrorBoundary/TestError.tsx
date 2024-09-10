import { useState } from 'react';

function TestErrorComponent() {
  const [isError, setIsError] = useState(false);

  const handleClick = (): void => setIsError(true);

  if (isError) throw new Error('New Error');

  return (
    <button type="button" onClick={handleClick}>
      Throw error
    </button>
  );
}

export default TestErrorComponent;
