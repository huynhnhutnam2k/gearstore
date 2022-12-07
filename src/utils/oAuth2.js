const { google } = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();
const oAuth2Client = new google.auth.OAuth2(
  "120544376636-pvjbvfs2omg74v1rqr4dkrjr1uhdi0g9.apps.googleusercontent.com",
  "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",
  process.env.REDIRECT_URI
);
module.exports = { oAuth2Client };
