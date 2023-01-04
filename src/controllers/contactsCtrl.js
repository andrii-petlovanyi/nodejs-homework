import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
} from "../services/contacts.js";

const getAllContCtrl = async (_, res) => {
  const data = await listContacts();
  res.status(200).json({ data, status: "success" });
};

const getContByIdCtrl = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  res.status(200).json({ data, status: "success" });
};

const removeContByIdCtrl = async (req, res) => {
  const { contactId } = req.params;
  await removeContact(contactId);

  res.status(200).json({
    contactId,
    status: "success",
    message: "Contact deleted successfully!",
  });
};

const addContCtrl = async (req, res) => {
  const body = req.body;
  const data = await addContact(body);
  res.status(201).json({
    data,
    status: "success",
    message: "Contact created successfully!",
  });
};

const updateContByIdCtrl = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const data = await updateContact(contactId, body);

  res.status(200).json({
    data,
    status: "success",
    message: "Contact updated successfully!",
  });
};

const updateStatusContactCtrl = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const data = await updateStatusContact(contactId, body);

  res.status(200).json({ data, status: "success" });
};

export {
  getAllContCtrl,
  getContByIdCtrl,
  addContCtrl,
  updateContByIdCtrl,
  removeContByIdCtrl,
  updateStatusContactCtrl,
};
