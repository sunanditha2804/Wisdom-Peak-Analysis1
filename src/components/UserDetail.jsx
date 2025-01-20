import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './UserDetail.css';

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!user) return null;

  return (
    <div className="user-detail">
      <header className="user-detail-header">
        <h1 className="user-detail-name">{user.name}</h1>
      </header>
      <div className="user-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p><strong>Website:</strong> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default UserDetail;