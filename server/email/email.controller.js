const EmailValidation = require('./email_validation.model');
const httpStatus = require('http-status');
const config = require('../../config/config');
const generate = require('nanoid/generate');
const postmark = require('postmark');
const request = require('request');

async function addEmail(req, res) {
  try {
    const emailValidation = await EmailValidation.get(req.body.email);
    if (emailValidation == null) {
      const token = generate('1234567890abcdef', 5);
      EmailValidation.create({
        email: req.body.email,
        token,
      });
      const client = new postmark.ServerClient(config.postmark);
      client.sendEmailWithTemplate({
        'From': 'Chapi Labs<mail@email.chapilabs.com>',
        'To': req.body.email,
        'TemplateId': 8862650,
        'TemplateModel': {
          'name': '',
          'codigo': token,
          'email': req.body.token,
        },
      });
      return res.json({ message: 'Se ha guardado correctamente el correo', token});
    }
    return res.json({ message: `El correo ${req.body.email} ya existe en la base de datos` })
  } catch (error) {
    console.log(error);
    res.json({ message: `El correo ya existe en la base de datos` })
  }
}

async function getToken(req, res) {
  try {
    const emailValidation = await EmailValidation.get(req.body.email.trim());
    return res.json({ email: emailValidation.email, token: emailValidation.token });
  } catch (error) {
    console.log(error);
    res.json({ message: `Ha ocurrido un error, el correo no existe` })
  }
}

module.exports = { addEmail, getToken };
