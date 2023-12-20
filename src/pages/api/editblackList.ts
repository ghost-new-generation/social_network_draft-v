import { query } from "libreres/contextDB";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            const resume = JSON.parse(req.body);
            const result = await query('INSERT INTO dbconnect.blacklist(Users_id, User_ban_id) VALUES ( ?, ?);', [resume.id, resume.blackUser]);
            return res.json(result);
        }
        if (req.method == 'PUT') {
            const resume = JSON.parse(req.body);
            const check = await query ("SELECT * FROM dbconnect.like_post WHERE User_id = ? AND Post_id = ?;", [resume.MyId, resume.PostID]);
            if (check[0])
            {
                return res.json("ok");
            }
            const result = await query('INSERT INTO dbconnect.like_post (User_id , Post_id) VALUES (? , ?);',
                [resume.MyId, resume.PostID]);
            return res.json(result);
        }
        if (req.method == 'DELETE') {
            const resume = JSON.parse(req.body);
            const result = await query('delete from dbconnect.blacklist where Users_id = ? and User_ban_id = ?;', [resume.id, resume.blackUser]);
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