import React, { useState, useEffect } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import "./App.css";
import {Route,Routes} from 'react-router-dom'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const location = useLocation(); 
  const navigate = useNavigate(); 

  return (
    <div className={`app ${theme}`}>
      <header>
        <button onClick={toggleTheme} className="switch-button">
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </header>
    
    <Routes>
      <Route path="/wisdom-peak-analysis" element={<UserList />} />
      <Route path="/user/:id" element={<UserDetail />} />
    </Routes>
    </div>

  );
}

export default App;
