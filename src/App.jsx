import React, { useState } from 'react';

const App = () => {
  const [recipe, setRecipe] = useState('');

  const handleChange = (e) => {
    setRecipe(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Mealcraft</h1>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Enter recipe:</label>
        <textarea
          style={styles.textarea}
          value={recipe}
          onChange={handleChange}
        />
      </div>
      <div style={styles.responseContainer}>
        {recipe && (
          <p style={styles.response}>
            Your recipe: {recipe}
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: '#f6f6f6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  textarea: {
    width: '300px',
    height: '200px',
  },
  responseContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  response: {
    fontSize: '16px',
    fontStyle: 'italic',
    marginTop: '10px',
  },
};

export default App;
