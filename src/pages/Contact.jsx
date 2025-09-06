import React, { useState } from "react";
import "../styles/Contact.css";
import logo from "../assets/images/res-logo.png";
import locationImg from "../assets/images/location.png";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            setResponseMsg(data.message);
            setIsSubmitted(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error(error);
            setResponseMsg("Failed to send message. Try again.");
        }
    };

    return (
        <section className="contact">
            {/* Header Section */}
            <div className="contact__header">
                <img src={logo} alt="logo" className="contact__logo" />
                <h1>Get in Touch with <span>MyPizza</span></h1>
                <p>
                    We’d love to hear from you! Whether you have a question about our menu,
                    need help with your order, or just want to share your pizza love, our
                    team is always ready to assist you.
                </p>
            </div>

            <div className="contact__container">
                {/* Left Side - Info */}
                <div className="contact__info">
                    <h2>Contact Information</h2>
                    <ul className="contact__details">
                        <li><span>📍</span> 123 Pizza Street, Food City</li>
                        <li><span>📞</span> +92 300 1234567</li>
                        <li><span>📧</span> info@mypizza.com</li>
                        <li><span>⏰</span> Mon - Fri: 9:00 AM - 11:00 PM</li>
                    </ul>
                    <div className="contact__map">
                        <img src={locationImg} alt="Location" />
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="contact__form">
                    {!isSubmitted ? (
                        <>
                            <h3>Send Us a Message</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form__group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form__group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form__group">
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form__group">
                                    <textarea
                                        name="message"
                                        rows="6"
                                        placeholder="Your Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="contact__btn">Send Message</button>
                            </form>
                        </>
                    ) : (
                        <div className="contact__success">
                            <h3>✅ Message Sent Successfully!</h3>
                            <p>Thank you for reaching out to us. We’ll get back to you shortly.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Extra Section */}
            <div className="contact__extras">
                <h2>Why Contact Us?</h2>
                <div className="extras__grid">
                    <div className="extra__item">
                        <h4>🍕 Order Support</h4>
                        <p>
                            Need help placing an order or tracking your delivery? Our team is here
                            to assist you every step of the way.
                        </p>
                    </div>
                    <div className="extra__item">
                        <h4>💬 Feedback</h4>
                        <p>
                            We love hearing from our customers! Share your feedback and help us
                            make our pizzas even better.
                        </p>
                    </div>
                    <div className="extra__item">
                        <h4>🤝 Partnership</h4>
                        <p>
                            Interested in collaborating with MyPizza? Get in touch with us to
                            discuss opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
