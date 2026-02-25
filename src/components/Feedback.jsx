import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: '',
    date: new Date().toLocaleString() // તારીખ પણ સ્ટોર કરીએ
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. લોકલ સ્ટોરેજમાંથી જૂનો ડેટા લાવો (જો હોય તો)
    const existingFeedback = JSON.parse(localStorage.getItem('allFeedback')) || [];

    // 2. નવો ડેટા એડ કરો
    const updatedFeedback = [...existingFeedback, { ...formData, id: Date.now() }];

    // 3. ફરીથી લોકલ સ્ટોરેજમાં સેવ કરો
    localStorage.setItem('allFeedback', JSON.stringify(updatedFeedback));

    alert("Thank you for your luxurious feedback!");
    
    // ફોર્મ ક્લીયર કરો
    setFormData({ name: '', email: '', rating: 5, message: '', date: new Date().toLocaleString() });
  };

  return (
    <div className="feedback-section">
      <div className="feedback-glass-card">
        <div className="feedback-header">
          <span className="gold-tag">Your Opinion Matters</span>
          <h1>Share Your Experience</h1>
          <p>Help us make our fragrances even more enchanting.</p>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="input-group">
            <input 
              type="text" placeholder="Full Name" required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="input-group">
            <input 
              type="email" placeholder="Email Address" required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="rating-group">
            <label>Rating</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={star <= formData.rating ? "star active" : "star"}
                  onClick={() => setFormData({...formData, rating: star})}
                >★</span>
              ))}
            </div>
          </div>
          <div className="input-group">
            <textarea 
              placeholder="Your Message..." rows="4"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          <button type="submit" className="submit-gold-btn">Send Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;