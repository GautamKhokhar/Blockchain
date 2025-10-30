const Contact = require('../models/contact');

const createContact = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields required.' });
  }
  try {
    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ success: true, message: 'Message received!', data: contact });
  } catch (error) {
    console.error('Contact Error:', error);
    res.status(500).json({ success: false, message: 'Server error. Try again later.' });
  }
};

module.exports = { createContact };
