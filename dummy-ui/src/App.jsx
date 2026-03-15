import { useState } from 'react';
import AboutUs from './AboutUs.jsx';
import ContactUs from './ContactUs.jsx';


function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState('home');
  

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
        <nav>
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => setPage('about')}>About Us</button>
          <button onClick={() => setPage('contact')}>Contact Us</button>
        </nav>
      
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

      {page === 'about' && <AboutUs />}
      {page === 'contact' && <ContactUs />}

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
          <div id="api-result-container">
            <h2>{apiData.title}</h2>
            <p>{apiData.body}</p>
            <p>ID: {apiData.id}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;