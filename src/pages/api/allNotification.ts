import { query } from "libreres/contextDB";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            const resume = JSON.parse(req.body)
            const result = await query('SELECT * FROM dbconnect.notification, dbconnect.users where To_Users_id in (SELECT User_id FROM dbconnect.users where User_Email = ? and User_Password = ?) and From_Users_id = User_id;', [resume.User_Email, resume.User_Password]);
            return res.json(result);
        }
        if (req.method == 'PUT') {
            const resume = JSON.parse(req.body);
            const result = await query('SELECT Count(*) as Count FROM dbconnect.notification where To_Users_id in (SELECT User_id FROM dbconnect.users where User_Email = ? and User_Password = ?);'
                [resume.User_Email, resume.User_Password]);
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