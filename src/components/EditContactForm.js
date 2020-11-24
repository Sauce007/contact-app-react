import React, { useState, useEffect } from "react";
import fetchAPI from "../api";

const contact_types = ["personal", "other", "work"];

const ContactForm = (props) => {
  const { activeContact, replaceContact, wipeActiveContact } = props;

  const [contactType, setContactType] = useState(activeContact.contactType);
  const [name, setName] = useState(activeContact.name);
  const [email, setEmail] = useState(activeContact.email);
  const [address, setAddress] = useState(activeContact.address);
  const [phoneNumber, setPhoneNumber] = useState(activeContact.phoneNumber);

  useEffect(() => {
    setContactType(activeContact.contactType);
    setName(activeContact.name);
    setEmail(activeContact.email);
    setAddress(activeContact.address);
    setPhoneNumber(activeContact.phoneNumber);
  }, [activeContact]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const contactInfo = { contactType, name, email, address, phoneNumber };
        const url =
          "https://univ-contact-book.herokuapp.com/api/contacts/${activeContact.id}";
        fetchAPI(url, "PATCH", contactInfo)
          .then(function (response) {
            replaceContact(activeContact, response.contact);
            wipeActiveContact();
          })
          .catch(function (error) {
            console.error("error editing new contact form", error);
          });
      }}
    >
      ;<h1>Edit Contact</h1>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label>Email</label>
      <input
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <label>Address</label>
      <input
        type="text"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />
      <label>Phone Number</label>
      <input
        type="text"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
      <select
        value={contactType}
        onChange={(event) => setContactType(event.target.value)}
      >
        {contact_types.map((contactTypeValue, idx) => {
        //   <option value={contactTypeValue} key={idx}>
        //     {contactTypeValue};
        //   </option>;
        })}
        ;
      </select>
      ;<button>Finish Editing</button>
      <button onClick={wipeActiveContact}>Cancel Editing</button>
      );
    </form>
  );
};

export default ContactForm;
