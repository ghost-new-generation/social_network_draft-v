import { query } from "libreres/contextDB";
import { NextApiHandler } from "next";
import nodemailer from 'nodemailer';
const handler: NextApiHandler = async (req, res) => {
    try {
        const resume = JSON.parse(req.body);
        const CreateTransport = nodemailer.createTransport({
            port: 465,
            host: "smtp.mail.ru",
            auth: {
                user: 'connect.form@mail.ru',
                pass: 'b1sXVjr9bm0jHbuN38C2',
            },
            secure: true
        });
        const mailDate = {
            from: 'connect.form@mail.ru',
            to: resume.mail,
            subject:`Код подтверждения`,
        }
        CreateTransport.sendMail(mailDate);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ msg: e.message });
        }
    }

}

export default handler;