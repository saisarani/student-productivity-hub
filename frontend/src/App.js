import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/health');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Student Productivity Hub</h1>
        <p>Your all-in-one productivity companion</p>
      </header>

      <main className="container">
        <section className="features">
          <h2>Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>⏱️ Pomodoro Timer</h3>
              <p>Stay focused with 25-minute work sessions</p>
            </div>
            <div className="feature-card">
              <h3>✅ To-Do List</h3>
              <p>Organize tasks with priorities</p>
            </div>
            <div className="feature-card">
              <h3>📝 Notes</h3>
              <p>Save and search your notes</p>
            </div>
            <div className="feature-card">
              <h3>📊 CGPA Calculator</h3>
              <p>Track your academic performance</p>
            </div>
            <div className="feature-card">
              <h3>🔥 Coding Streak</h3>
              <p>Build your daily coding habit</p>
            </div>
            <div className="feature-card">
              <h3>📋 Resume Tracker</h3>
              <p>Track projects and skills</p>
            </div>
          </div>
        </section>

        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          <div className="status">
            <p>✅ Backend Status: {data.status}</p>
          </div>
        ) : (
          <p>Unable to connect to backend</p>
        )}
      </main>
    </div>
  );
}

export default App;