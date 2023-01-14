import { Contact } from "../models/mongoose/contactModel.js";
import { WrongParamsError } from "../helpers/index.js";

const listContacts = async (id, page, limit, reqFavorite) => {
  const favorite = reqFavorite === null ? { $exists: true } : reqFavorite;

  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: id, favorite }, "", {
    skip,
    limit: Number(limit),
  });

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

const addContact = async (id, body) => {
  const newContact = await Contact.create({ ...body, owner: id });
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
