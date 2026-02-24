import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Pehla na data fetch karo
    const existingData = JSON.parse(localStorage.getItem("contactData")) || [];

    // 2. Navo data array ma push karo
    const updatedData = [...existingData, formData];

    // 3. LocalStorage ma save karo
    localStorage.setItem("contactData", JSON.stringify(updatedData));

    // 4. Success Alert
    alert("Message sent successfully! 🎉");

    // 5. Form clear karo
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        <span className="contact-tag">Contact</span>
        <h1>Get In Touch</h1>
        <p>We’d love to hear from you. Let’s create something timeless.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;