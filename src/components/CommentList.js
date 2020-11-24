import React from "react";
import fetchAPI from "../api";

const CommentList = (props) => {
    const {comments, contact, removeComment} = props;

    return comments.length ? (
        <div>
            <h3>{contact.name}'s comments</h3>
            {comments.map((comment, idx) => {
                return (<div key={idx}>
                    <p>{comment.contents}</p>
                    <button onClick={() => {
                        fetchAPI("https://univ-contact-book.herokuapp.com/api/comments/${comment.id}", "delete")
                        .then(function (data) {
                          removeComment(contact, comment);
                        })
                        .catch(function (error) {
                          console.error('error removing comments', error);
                        })
                    }}>Delete</button>
                </div>);
            })}
        </div>
    ) : null;
};

export default CommentList;