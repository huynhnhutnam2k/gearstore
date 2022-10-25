const sendMail = async (transporter, to, mail) => {
  return await transporter.sendMail({
    from: "namb1809152@student.ctu.edu.vn", // sender address
    to: to, // list of receivers
    subject: "Gearstore ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>${mail}</b>`, // html body
  });
};

module.exports = { sendMail };
