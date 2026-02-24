import React, { useState, useEffect } from 'react';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. ડેટા ફેચ કરવાનું ફંક્શન
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://69833dc79c3efeb892a4fb78.mockapi.io/Registration');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 2. યુઝરને ડિલીટ કરવાનું ફંક્શન
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove ${name}?`);
    
    if (confirmDelete) {
      try {
        const response = await fetch(`https://69833dc79c3efeb892a4fb78.mockapi.io/Registration/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // સ્ટેટ અપડેટ કરો જેથી રિફ્રેશ વગર યુઝર લિસ્ટમાંથી ગાયબ થઈ જાય
          setUsers(users.filter(user => user.id !== id));
          alert("User removed successfully!");
        } else {
          alert("Could not delete the user.");
        }
      } catch (err) {
        alert("Error deleting user: " + err.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="manage-users-section">
      <div className="admin-bg">
        <img src="https://images.unsplash.com/photo-1583445095369-9c651e7e5d30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="background" />
      </div>

      <div className="admin-glass-wrapper">
        <div className="admin-header">
          <div>
            <span className="admin-tag">Access Level: Admin</span>
            <h1>Registered User Database</h1>
          </div>
          <button className="refresh-btn-gold" onClick={fetchData}>
            Refresh Records
          </button>
        </div>

        {loading && <div className="status-message">Accessing secure database...</div>}
        {error && <div className="error-message">Error: {error}</div>}

        {!loading && !error && (
          <div className="table-container">
            <table className="luxury-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Role</th>
                  <th>Password</th>
                  <th>OTP</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="id-cell">#{user.id}</td>
                      <td className="user-name-cell">{user.fullname}</td>
                      <td>{user.email}</td>
                      <td>{user.mobilenumber}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="password-cell">••••••</td>
                      <td className="otp-text">{user.otp || 'N/A'}</td>
                      <td style={{ textAlign: 'center' }}>
                        {/* DELETE CROSS BUTTON */}
                        <button 
                          className="delete-cross-btn" 
                          onClick={() => handleDelete(user.id, user.fullname)}
                          title="Remove User"
                        >
                          ✖
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">No registration records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;