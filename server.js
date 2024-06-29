const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
//configure nodemailer

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rajasmart998@gmail.com",
    pass: "vgfw zwac ucio lela",
  },
});

// Geanarate OTP
const generateOtp = (digits) => {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

app.post("/send-otp", (req, res) => {
  const { email, digits } = req.body;
  console.log(email);
  const otp = generateOtp(digits);
  console.log(otp);
  const mailOptions = {
    from: "rajasmart998@gmail.com",
    to: email,
    subject: `Your ${digits} digits OTP Code`,
    text: `Hi Your ${digits} digit OTP code is ${otp}, This is testing purpose...!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.toString() });
    }
    return res.status(200).json({ otp, message: "OTP sent Successfully" });
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
