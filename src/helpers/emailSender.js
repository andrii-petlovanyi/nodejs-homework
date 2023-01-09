import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const email = process.env.SENDGRID_EMAIL;

const emailSender = async (data) => {
  try {
    await sgMail.send({ ...data, from: email });
    console.log("Емейл отправлен", { ...data, from: email });

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { emailSender };
