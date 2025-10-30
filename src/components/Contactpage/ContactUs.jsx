import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: data.message });
        // Reset form
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Something went wrong.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section">
      {/* Left Image Section */}
      <div className="contact-image">
        <div className="overlay-text">
          <h2>Let's Connect</h2>
          <p>
            Have a project in mind? Reach out and let's build something
            amazing together.
          </p>

          {/* Contact Information */}
          <div className="contact-info mt-4">
            <p>
              <i className="fa-solid fa-phone me-2"></i> +1 (234) 567-890
            </p>
            <p>
              <i className="fa-solid fa-envelope me-2"></i> hello@example.com
            </p>
            <p>
              <i className="fa-solid fa-location-dot me-2"></i> 123 Creative
              Street, New York, USA
            </p>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="contact-form-container d-flex align-items-center justify-content-center">
        <div className="contact-form glass-card p-4 rounded">
          <h2 className="form-heading mb-4">📬 Get in Touch</h2>
          
          {submitStatus && (
            <div className={`alert alert-${submitStatus.type === 'success' ? 'success' : 'danger'}`}>
              {submitStatus.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3 input-group">
              <span className="input-group-text">
                <i className="fa-solid fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 input-group mt-2">
              <span className="input-group-text">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 input-group mt-2">
              <span className="input-group-text">
                <i className="fa-solid fa-message"></i>
              </span>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Write your message..."
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100 mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane me-2"></i> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;