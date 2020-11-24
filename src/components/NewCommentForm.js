import React, {useState} from "react";
import fetchAPI from "../api";

const CommentForm = (props) => {
    const {contact, addComment} = props;
    const [content, setContent] = useState("");

    return (
        <form
        onSubmit={(event) => {
            event.preventDefault();
            const contactInfo = {content};
            const url = "https://univ-contact-book.herokuapp.com/api/contacts/${contact.id}/comments";
            fetchAPI(url, "POST", contactInfo)
                .then(function (response){
                    addComment(contact, response.comment);
                    setContent("");
                })
                .catch(function (error){
                    console.error("error submitting comment", error);
                })
        }}>
            <h2>Leave a comment for {contact.name}</h2>
            <input 
                type="text"
                value={content}
                onChange={(event) => setContent(event.target.value)}/>
            <button>Submit</button>;
        </form>
    )
};

export default CommentForm;