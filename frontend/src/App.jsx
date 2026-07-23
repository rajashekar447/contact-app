import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "/api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const loadContacts = async () => {
    try {
      const res = await axios.get(API);
      setContacts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const addContact = async () => {
    if (!name || !phone) {
      alert("Please enter Name and Phone");
      return;
    }

    try {
      await axios.post(API, {
        name,
        phone,
      });

      setName("");
      setPhone("");

      loadContacts();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      loadContacts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">

      <h1>Contact Management</h1>

      <div className="form">

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={addContact}>
          Add Contact
        </button>

      </div>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {contacts.length === 0 ? (

            <tr>
              <td colSpan="4">No Contacts Found</td>
            </tr>

          ) : (

            contacts.map((contact) => (

              <tr key={contact.id}>

                <td>{contact.id}</td>

                <td>{contact.name}</td>

                <td>{contact.phone}</td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() => deleteContact(contact.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default App;
