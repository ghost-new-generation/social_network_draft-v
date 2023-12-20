import { query } from "libreres/contextDB";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            const resume = JSON.parse(req.body);
            const result = await query('SELECT * FROM dbconnect.users WHERE User_Email = ? and User_Password = ?;',
                [resume.Email, resume.Pass]);
            return res.json(result);
        }
        if (req.method == 'PUT') {
            const resume = JSON.parse(req.body);
            const result = await query('INSERT INTO dbconnect.users (User_LastName, User_FirstName, User_Password, User_Email, genders_id, roles_id, Date_of_creation) VALUES (?, ?, ?, ?, ?, ?, ?);',
                [resume.User_LastName, resume.User_FirstName, resume.User_Password, resume.User_Email, resume.genders_id, 2]);
                res.status(500).end();
        }
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ msg: e.message });
        }
    }
    
}

export default handler;