const fs = require('fs/promises')
const path = require("path");
const ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
} 

const listContacts = async () => {
   const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    updateContacts(contacts);
    return removeContact;
}

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
    const newContact = {
        id: ObjectID(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    updateContacts(contacts);
    return newContact;
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    }
    contacts[idx] = {...body, id};
    await updateContacts(contacts);
    return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
