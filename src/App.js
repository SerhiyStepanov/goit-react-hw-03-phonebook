import { Component, Fragment } from "react";
import shortid from "shortid";
import ContactForm from "./Components/Form";
import Filter from "./Components/Filter";
import ContactList from "./Components/ContactList";

import "./App.css";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const saveStorageContacts = localStorage.getItem("contacts");
    const parseStorageContacts = JSON.parse(saveStorageContacts);
    if (parseStorageContacts) {
      this.setState({ contacts: parseStorageContacts });
    }
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.state.contacts !== prevState) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (data) => {
    const repeatName = this.state.contacts.some((el) => el.name === data.name);
    if (repeatName) {
      alert(`${data.name} is alreadi in contacts.`);
      return;
    }
    if (data.name === "") {
      alert("Enter  name please");
      return;
    }
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  filterContacts = (e) => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  visibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContact = this.visibleContacts();
    return (
      <Fragment>
        <h1>Phonebook</h1>

        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.filterContacts} />
        <ContactList
          contacts={visibleContact}
          onDeleteContact={this.deleteContact}
        />
      </Fragment>
    );
  }
}
