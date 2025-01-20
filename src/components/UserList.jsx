import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import './UserList.css';

function UserList() {
  
  const { users, setUsers, loading, setLoading, error, setError } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc"); 


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data); 
        setError(null); 
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers();
  }, [setUsers, setLoading, setError]); 

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase())) 
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name) 
    );

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-list-container">
      <header className="header">
        <h1>User Directory</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="sort-button"
        >
          Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
        </button>
      </header>

      {/* List of users */}
      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li key={user.id} className="user-card">
            <Link to={`/user/${user.id}`}>
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">{user.email}</p>
              <p className="user-city">{user.address.city}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;