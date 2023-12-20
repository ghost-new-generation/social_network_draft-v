import { query } from "libreres/contextDB";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            const resume = JSON.parse(req.body);
            const result = await query('SELECT * FROM dbconnect.post, dbconnect.users where Users_id = User_id and User_id = ? ORDER BY Date_of_create DESC; ',
                [resume]);
            return res.json(result);
        }
        if (req.method == 'PUT') {
            const resume = JSON.parse(req.body);
            const result = await query('SELECT * FROM dbconnect.post , dbconnect.users WHERE Post_id = ? and Users_id = User_id',
                [resume]);
            return res.json(result);
        }
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ msg: e.message });
        }
    }

}

export default handler;