import { useState } from 'react';

function App() {
  const [showMessage, setShowMessage] = useState(false);

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
    </div>
  );
}

export default App;