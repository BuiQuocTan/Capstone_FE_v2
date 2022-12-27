import '../style/contact.css'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_adto6ug', 'template_vmuw3d8', form.current, 'mYVRlJmUDoQ9XOS1W')
      .then((result) => {
          alert("Send email successful!")
          e.target.reset()
      }, (error) => {
        alert("Send email fail!")
      });
  };
  return (
    <div className="contact">
      <div className="contact-container">
        <h1>Contact Help</h1>
        <div className="img-contact"></div>
        <div className="contact-info">
          <p>
            If you need any supporting information, in the categories related to real estate such as posting real estate
            for sale / rent, or need to edit the image of the property you want to post, or you want us to have a
            special preference for your real estate or related supporting information
          </p>
          <br />
          <p>
            We listen and do not force our customers in any situation, all your wishes will be fulfilled by many
            solutions. Please enter the information below and send us an inquiry, thank you for using us website
          </p>
        </div>
        <form ref={form} onSubmit={sendEmail} className="form-contact">
          <label>Name</label>
          <br />
          <input type="text" name="user_name" />
          <br />
          <label>Email</label>
          <br />
          <input type="email" name="user_email" />
          <br />
          <label>Your phone number</label>
          <br />
          <input type="tel" name="user_phone" />
          <br />
          <label>Message</label>
          <textarea name="message" rows="10 " cols="100" />
          <button type="submit" name="Send">
            Send Information
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
