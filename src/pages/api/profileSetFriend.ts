import { query } from "libreres/contextDB";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {

    try {
        const applicant = JSON.parse(req.body);
        const result = await query('SELECT * FROM dbconnect.users WHERE User_id = ?;',
            [applicant]);
        return res.json(result);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ msg: e.message });
        }
    }
}
export default handler;