import React, {useState} from "react";
import fetchAPI from "../api";

const contact_types = ["personal", "other", "work"];

const ContactForm = (props) => {
    const {addContact} = props;

    const [contactType, setContactType] = useState(contact_types[0]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            const contactInfo = {contactType, name, email, address, phoneNumber};
            const url = "https://univ-contact-book.herokuapp.com/api/contacts";
            fetchAPI(url, "POST", contactInfo)
                .then(function (response) {
                    addContact(response.contact);
                })
                .catch(function (error) {
                    console.error("error submitting new contact form", error);
                })
        }}> 
        <h1>Add New Contact</h1>
        <label>Contact Type</label>
        <label>Name</label>
        <input 
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}/>
        <label>Email</label>
        <input 
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}/>
        <label>Address</label>
        <input 
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}/>
        <label>Phone Number</label>
        <input 
            type="text"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}/>
         <select 
            value={contactType}
            onChange={(event) => setContactType(event.target.value)}>
            {contact_types.map((contactTypeValue, idx) => {
            // <option value={contactTypeValue} key={idx}>
            //     {contactTypeValue};
            // </option>
       
      
       
        })};
       </select>;  
       <button>Submit</button>;




        </form>
    );
}

export default ContactForm;