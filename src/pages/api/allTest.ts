import { query } from "libreres/contextDB";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    try {
        if(req.method=='POST'){
        const result = await query('SELECT * FROM dbconnect.dialog;');
        return res.json(result);
        }
        if(req.method=='DELETE'){
            const resume = JSON.parse(req.body);
            const result = await query('SELECT * FROM dbconnect.dialog WHERE DialogID = ?;', [resume.DialogID]);
            return res.json(result);
        }
        if(req.method=='PUT'){
            const resume = JSON.parse(req.body);
            const result = await query('Select Content, max(Time_of_create) as Time_of_create From dbconnect.messages where Dialog_id = ? GROUP BY Content order by Time_of_create Desc Limit 1 ', [resume]);
            return res.json(result);
        }
    }
    catch (e) {
        if (e instanceof Error) {
            console.log(e);
            return res.status(500).json({ msg: e.message });
        }
    }
}
export default handler;