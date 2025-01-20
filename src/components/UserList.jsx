import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import './UserList.css';

function UserList() {
  // Accessing user data and state management functions from context
  const { users, setUsers, loading, setLoading, error, setError } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering users
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order: ascending or descending

  // Fetching users from API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading state
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data); // Store users in context
        setError(null); // Reset error state
      } catch (err) {
        setError("Failed to fetch users"); // Set error state if fetching fails
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchUsers();
  }, [setUsers, setLoading, setError]); // Dependency array to prevent infinite loop

  // Filter and sort users based on search term and sort order
  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase())) // Filter users based on name
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name) // Sort ascending
        : b.name.localeCompare(a.name) // Sort descending
    );

  // Loading or error handling
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-list-container">
      <header className="header">
        <h1>User Directory</h1>

        {/* Search input */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on input change
          />
        </div>

        {/* Sort button */}
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