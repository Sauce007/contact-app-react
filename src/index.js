import React, {useState, useEffect} from 'react';
import fetchAPI from "./api";
import NewContactForm from "./components/NewContactForm";
import EditContactForm from "./components/EditContactForm";
import ContactList from "./components/ContactList";


const App = () => {
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);

  useEffect(() => {
    fetchAPI("https://univ-contact-book.herokuapp.com/api/contacts")
      .then(function (data) {
    console.log('my contacts', data);
  })
  .catch(function (error) {
    console.error('error fetching contacts', error);
  })
  }, []);

  const wipeActiveContact = () => setActiveContact(null);

  const addContact = (contact) => {
    contact.comments = contact.comments || [];
    setContacts([...contacts, contact]);
  }

  const removeOldContact = (deletedContact) => setContacts(contacts.filter((contact) => contact !== deletedContact));


  const replaceContact = (oldContactInfo, newContactInfo) => {
    const newContactsList = contacts.map((contact) => {
      if (contact === oldContactInfo) {
        return newContactInfo;
      }
      return contact;
    });
    setContacts(newContactsList);
  };

  const addComment = (contact, comment) => {
    const newContactsList = [...contacts];
    const idx = newContactsList.indexOf(contact);

    newContactsList[idx].comments.push(comment);
    setContacts(newContactsList);
  }

  const removeComment = (contact, deletedComment) => {
    const newContactsList = [...contacts];
    const idx = newContactsList.indexOf(contact);

    newContactsList[idx].comments = newContactsList[idx].comments.filter((comment) => comment !== deletedComment);
    setContacts(newContactsList);
  };

  return (
    <>
      {activeContact ? (<EditContactForm
                          activeContact={activeContact}
                          wipeActiveContact={wipeActiveContact}
                          replaceContact={replaceContact}
                          />) : (<NewContactForm addContact={addContact}/>)}
                          <ContactList
                            contacts={contacts}
                            setActiveContact={setActiveContact}
                            removeOldContact={removeOldContact}/>
                            </>
  );


};

export default App;