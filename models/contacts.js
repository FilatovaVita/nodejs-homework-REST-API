const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

async function getListContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(id) {
  const res = await getListContacts();
  const [result] = res.filter((contact) => contact.id === id);
  return result || null;
}

async function removeContact(id) {
  const contacts = await getListContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const [removed] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
  return removed;
}

async function addContact(name, email, phone) {
  const contacts = await getListContacts();
  const newContact = { id: nanoid(21), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
  return newContact;
}

async function updateContact(id, body) {
  const contacts = await getListContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const newContact = { ...contacts[idx], ...body };
  contacts.splice(idx, 1, newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
  return newContact;
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
