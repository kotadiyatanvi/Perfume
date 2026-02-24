import React, { useState, useEffect } from 'react';
import './ViewFeedback.css'; // આપણે એ જ જૂની CSS વાપરીશું

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // પેજ લોડ થાય ત્યારે LocalStorage માંથી ડેટા લાવો
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('allFeedback')) || [];
    setFeedbacks(data);
  }, []);

  const deleteFeedback = (id) => {
    if(window.confirm("Delete this feedback?")) {
        const filtered = feedbacks.filter(item => item.id !== id);
        setFeedbacks(filtered);
        localStorage.setItem('allFeedback', JSON.stringify(filtered));
    }
  };

  return (
    <div className="manage-users-section">
      <div className="admin-bg">
        <img src="https://images.unsplash.com/photo-1557170334-a7c3c467b1f6?auto=format&fit=crop&w=1350&q=80" alt="bg" />
      </div>

      <div className="admin-glass-wrapper" style={{maxWidth: '1200px'}}>
        <div className="admin-header">
          <div>
            <span className="admin-tag">Admin Panel</span>
            <h1>Customer Feedbacks</h1>
          </div>
        </div>

        <div className="table-container">
          <table className="luxury-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length > 0 ? (
                feedbacks.map((item) => (
                  <tr key={item.id}>
                    <td style={{fontSize: '12px'}}>{item.date}</td>
                    <td className="user-name-cell">{item.name}</td>
                    <td>{item.email}</td>
                    <td style={{color: '#ffb703'}}>{"★".repeat(item.rating)}</td>
                    <td style={{maxWidth: '250px', fontSize: '13px'}}>{item.message}</td>
                    <td>
                      <button className="delete-cross-btn" onClick={() => deleteFeedback(item.id)}>✖</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">No feedbacks received yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;