import React, { useEffect, useState } from "react";
import "./ManageUsers.css"; // Tame aapeli CSS file vapri che

const ViewContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("contactData")) || [];
    setContacts(data);
  }, []);

  const handleDelete = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    localStorage.setItem("contactData", JSON.stringify(updatedContacts));
  };

  return (
    <section className="manage-users-section">
      {/* Background Image/Overlay */}
      <div className="admin-bg">
        <img src="https://source.unsplash.com/random/1920x1080?dark,luxury" alt="bg" />
      </div>

      <div className="admin-glass-wrapper">
        <div className="admin-header">
          <div>
            <span className="admin-tag">INQUIRIES</span>
            <h1>Contact Submissions</h1>
          </div>
          <button className="refresh-btn-gold" onClick={() => window.location.reload()}>
            Refresh Data
          </button>
        </div>

        <div className="table-container">
          <table className="luxury-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((item, index) => (
                  <tr key={index}>
                    <td className="id-cell">#{index + 1}</td>
                    <td className="user-name-cell">{item.name}</td>
                    <td>{item.email}</td>
                    <td style={{ maxWidth: "300px" }}>{item.message}</td>
                    <td>
                      <button 
                        className="delete-cross-btn" 
                        onClick={() => handleDelete(index)}
                        title="Delete Entry"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>
                    No messages found in LocalStorage.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ViewContact;