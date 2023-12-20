import { query } from "libreres/contextDB";
import { NextApiHandler } from "next";
import { format } from 'date-fns'

const handler: NextApiHandler = async (req, res) => {
    const date = format(new Date(),'yyyy-MM-dd');
    try {
        if (req.method == 'POST') {
            const resume = JSON.parse(req.body);
            const result_one = await query('INSERT INTO dbconnect.friends (Users_id, Friend_id, time_of_create) values (? , ? , ?);',[resume.num,resume.MyID,date]);
            res.json(result_one);
            const result_two =await query('INSERT INTO dbconnect.friends (Users_id, Friend_id, time_of_create ) values (? , ? , ?);',[resume.MyID,resume.num,date]);
            res.json(result_two);
            return;
        }
        if (req.method=='DELETE'){
            const resume = JSON.parse(req.body);
            const result = await query('',[resume]);
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


