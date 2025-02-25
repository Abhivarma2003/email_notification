import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { motion } from "framer-motion";

const Contact = () => {
  const form = useRef();
  const [isBulk, setIsBulk] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setSuccess(false);

    emailjs
      .sendForm(
        "service_71qng4a",
        "template_asikp7r",
        form.current,
        "CDoEyh6n_KqODYPoe"
      )
      .then(
        () => {
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        },
        (error) => {
          console.error(error.text);
        }
      );
  };

  return (
    <StyledContactForm>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="contact-container"
      >
        <h2>📩 Get In <span>Touch</span></h2>
        <label>
          <input type="checkbox" onChange={() => setIsBulk(!isBulk)} /> Send to multiple recipients
        </label>
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="user_name" placeholder="Your Name" required />
          <label>{isBulk ? "Emails (comma-separated)" : "Email"}</label>
          <input type="text" name="user_email" placeholder={isBulk ? "email1@example.com, email2@example.com" : "Your Email"} required />
          <label>Message</label>
          <textarea name="message" placeholder="Your Message" required />
          <motion.input whileHover={{ scale: 1.1 }} type="submit" value="Send" />
        </form>
        {success && <SuccessMessage>🎉 Message sent successfully!</SuccessMessage>}
      </motion.div>
    </StyledContactForm>
  );
};

export default Contact;

const StyledContactForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #c9d6ff, #e2e2e2);
  .contact-container {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
  }
  h2 {
    color: #333;
  }
  h2 span {
    color: #ff4b2b;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input, textarea {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  input[type="submit"] {
    background: #ff4b2b;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
  }
  input[type="submit"]:hover {
    background: #ff3a1a;
  }
`;

const SuccessMessage = styled(motion.div)`
  margin-top: 10px;
  color: green;
  font-weight: bold;
`;
