import { Contact } from "../db/contactModel.js";
import { WrongParamsError } from "../helpers/errors.js";

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);

  if (!contact)
    throw new WrongParamsError(`Contact with id: ${contactId} not found`);

  return contact;
};

const removeContact = async (contactId) => {
  const data = await Contact.findByIdAndDelete(contactId);
  if (!data)
    throw new WrongParamsError(`Contact with id: ${contactId} not found`);

  return;
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await Contact.findByIdAndUpdate(contactId, body, { new: true });

  if (!data)
    throw new WrongParamsError(`Contact with id: ${contactId} not found`);

  return data;
};

const updateStatusContact = async (contactId, body) => {
  const data = await Contact.findByIdAndUpdate(contactId, body, { new: true });

  if (!data)
    throw new WrongParamsError(`Contact with id: ${contactId} not found`);

  return data;
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
