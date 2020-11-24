import React from "react";
import fetchAPI from "../api";
import CommentList from "./CommentList";
import NewCommentForm from "./NewCommentForm";

const ContactList = (props) => {
    const {contacts, setActiveContact, removeOldContact, addComment, removeComment} = props;

    return (
        <div>
            {contacts.map((contact, idx) => {
                const {name, email, address, phoneNumber, contactType} = contact;

                return (
                    <div key={idx}>
                        <h2>
                            {name} ({contactType})
                        </h2>
                        <h5>Email: {email}</h5>
                        <h5>Address: {address}</h5>
                        <h5>Phone Number: {phoneNumber}</h5>
                        <div>
                            <button onClick={() => setActiveContact(contact)}>Edit</button>
                            <button onClick={() => {
                                fetchAPI("https://univ-contact-book.herokuapp.com/api/contacts/${contact.id}", "Delete")
                                .then(function (data) {
                                  removeOldContact(contact);
                                })
                                .catch(function (error) {
                                  console.error('error removing contact', error);
                                })
                            }}>Delete</button>
                        </div>
                        <CommentList
                            contact={contact}
                            comments={contact.comments}
                            removeComment={removeComment}/>
                        <NewCommentForm 
                            contact={contact}
                            addComment={addComment}/>
                    </div>
                );
            })};
        </div>
    )
};

export default ContactList;