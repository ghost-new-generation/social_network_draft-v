import { query } from "libreres/contextDB";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            const resume = JSON.parse(req.body);
            const result = await query('SELECT * FROM dbconnect.blacklist, dbconnect.users where Users_id in (Select Users_id from dbconnect.users where User_Email = ? and User_Password = ?) and User_ban_id = User_id;', [resume.User_Email, resume.User_Password]);
            return res.json(result);
        }
        if (req.method == 'PUT') {
            const resume = JSON.parse(req.body);
            const result = await query('SELECT * FROM dbconnect.blacklist where Users_id = ? and User_ban_id = ? ;',[resume.MyUserID,resume.UserID]);
            return res.json(result);
        }
    }
    catch (e) {
        if (e instanceof Error) {
            console.log(e);
            res.status(500).json({ msg: e.message });
        }
    }
}

export default handler;