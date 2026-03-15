import { useState } from 'react';

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApiData = async () => {
    setIsLoading(true);
    setApiError(null);
    setApiData(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      setApiError(error.message || 'Failed to fetch data from API');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1>Quality Engineering Practice</h1>
      
      <input 
        type="text" 
        placeholder="Enter username" 
        id="username-input"
      />
      <br /><br />
      
      <button 
        id="reveal-btn" 
        onClick={() => setShowMessage(true)}
      >
        Reveal Secret
      </button>

      {showMessage && (
        <p id="secret-message" style={{ color: 'green', marginTop: '20px' }}>
          Playwright assertions are working!
        </p>
      )}

      <div style={{ marginTop: '40px', borderTop: '2px solid #ccc', paddingTop: '20px' }}>
        <h2>API Testing Section</h2>
        <button 
          id="fetch-api-btn" 
          onClick={fetchApiData}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Fetch API Data'}
        </button>

        {apiError && (
          <div id="api-error-message" style={{ color: 'red', marginTop: '20px', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>
            Error: {apiError}
          </div>
        )}

        {apiData && (
          <div id="api-result-container" style={{ marginTop: '20px', padding: '15px', border: '1px solid #4CAF50', borderRadius: '4px', backgroundColor: '#f0f8f0' }}>
            <h3 style={{ marginTop: '0' }}>API Response:</h3>
            <p><strong>ID:</strong> {apiData.id}</p>
            <p><strong>Title:</strong> {apiData.title}</p>
            <p><strong>Body:</strong> {apiData.body}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;