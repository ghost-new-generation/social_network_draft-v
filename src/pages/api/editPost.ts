import { query } from "libreres/contextDB";
import { NextApiHandler } from "next";
import { format } from 'date-fns';

const handler: NextApiHandler = async (req, res) => {
    const date = format(new Date(),'yyyy-MM-dd HH:mm:ss');
    try {
        if (req.method == 'POST') {
            const resume = JSON.parse(req.body)
            const result = await query('INSERT INTO dbconnect.post (Content_post, Date_of_create, Users_id) VALUES (? , ?, ?);',[resume.MyContentPost, date , resume.IDs]);
            return res.json(result);
        }
        if (req.method == 'PUT') {
            const resume = JSON.parse(req.body);
            const result = await query('SELECT * FROM dbconnect.users where User_id NOT IN (Select Friend_id From dbconnect.friends Where Users_id IN ( SELECT User_id FROM dbconnect.users where User_Email = ? and User_Password = ?)) and User_id NOT IN ( SELECT User_id FROM dbconnect.users where User_Email = ? and User_Password = ?);',
                [resume.User_Email, resume.User_Password, resume.User_Email, resume.User_Password]);
            return res.json(result);
        }


    }
    catch (e) {
        if (e instanceof Error) {
            console.log(e);
            res.status(500).json({ msg: e.message });
        }
    }
    res.status(500).end();
}

export default handler;