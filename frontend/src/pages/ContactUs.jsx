import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaStar,
} from "react-icons/fa";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://codenexus-production-ee84.up.railway.app//contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();
      alert(data.message);

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://codenexus-production-ee84.up.railway.app//feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          feedback,
        }),
      });

      const data = await response.json();

      alert(data.message);

      setFeedback("");
      setRating(0);
    } catch (error) {
      console.error(error);
      alert("Failed to submit feedback");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-yellow-950 text-white">

      {/* Navbar */}
      <nav className="w-full border-b border-yellow-800/80">
        <div className="px-6 py-4 flex items-center justify-between">

          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-200">
              CodeNexus
            </h1>

            <p className="text-white/60 text-sm md:text-base mt-1">
              ~Code, Analyze & Optimize - all in one place!
            </p>
          </div>

          <Link
            to="/dashboard"
            className="px-5 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-green-950 font-bold transition"
          >
            Back
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-14 text-center">

        <p className="inline-block px-4 py-2 mb-6 rounded-full bg-green-900/50 border border-yellow-700 text-yellow-100">
          We'd Love To Hear From You
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          Contact
          <span className="block text-yellow-200">
            CodeNexus
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-yellow-50/80 text-lg leading-8">
          Questions, suggestions, feature requests or bug reports?
          Reach out and help us make CodeNexus even better.
        </p>
      </section>

      {/* Contact Section */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

          {/* Contact Details */}
          <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl p-8 shadow-xl">

            <h2 className="text-3xl font-bold text-yellow-200 mb-8">
              Contact Information
            </h2>

            <div className="space-y-8">

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-yellow-300 text-2xl" />
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-yellow-50/70">
                    hasinigolla456@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaPhone className="text-yellow-300 text-2xl" />
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p className="text-yellow-50/70">
                    +91 8367433656
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-yellow-300 text-2xl" />
                <div>
                  <h3 className="font-bold">Location</h3>
                  <p className="text-yellow-50/70">
                    Andhra Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaGithub className="text-yellow-300 text-2xl" />
                <div>
                  <h3 className="font-bold">GitHub</h3>
                  <p className="text-yellow-50/70">
                    github.com/hasinigolla
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaLinkedin className="text-yellow-300 text-2xl" />
                <div>
                  <h3 className="font-bold">LinkedIn</h3>
                  <p className="text-yellow-50/70">
                    linkedin.com/in/hasini-golla-829094301/
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl p-8 shadow-xl">

            <h2 className="text-3xl font-bold text-yellow-200 mb-8">
              Send a Message
            </h2>

            <form onSubmit={handleContactSubmit} className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/20 border border-yellow-700 outline-none focus:border-yellow-400"
              />

              <input
                type="email"
                placeholder="Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/20 border border-yellow-700 outline-none focus:border-yellow-400"
              />

              <input
                type="text"
                placeholder="Subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/20 border border-yellow-700 outline-none focus:border-yellow-400"
              />

              <textarea
                rows="6"
                placeholder="Your Message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/20 border border-yellow-700 outline-none focus:border-yellow-400"
              />

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-yellow-600 hover:bg-yellow-500 text-green-950 font-bold transition shadow-xl"
              >
                Send Message
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* Feedback */}
      <section className="px-6 pb-24">

        <div className="max-w-5xl mx-auto bg-black/20 backdrop-blur-md border border-yellow-700 rounded-3xl p-10 shadow-xl">

          <h2 className="text-4xl font-bold text-center text-yellow-200 mb-8">
            Feedback & Rating
          </h2>

          <form onSubmit={handleFeedbackSubmit}>

            <div className="flex justify-center gap-4 mb-8">

              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-4xl transition ${
                    star <= rating
                      ? "text-yellow-400"
                      : "text-gray-500"
                  }`}
                />
              ))}

            </div>

            <textarea
              rows="5"
              required
              placeholder="Share your experience with CodeNexus..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-4 rounded-xl bg-black/20 border border-yellow-700 outline-none focus:border-yellow-400"
            />

            <button
              type="submit"
              className="w-full mt-6 py-4 rounded-2xl bg-yellow-600 hover:bg-yellow-500 text-green-950 font-bold transition shadow-xl"
            >
              Submit Feedback
            </button>

          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-yellow-800/80 text-center text-yellow-100/60 text-sm">
        Designed & Developed by
        <div className="text-yellow-100 font-bold mt-1">
          Hasini Golla
        </div>
        © 2026 CodeNexus. All rights reserved.
      </footer>
    </div>
  );
}

export default ContactUs;
