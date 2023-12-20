import { query } from "libreres/contextDB";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
    //GET, POST, PUT или DELETE
    try {
        
        if (req.method == 'POST') {
            const resume = JSON.parse(req.body);
            const result = await query('SELECT * FROM dbconnect.dialog, dbconnect.users, dbconnect.messages where UserID = User_id and UserID NOT IN ( SELECT User_id FROM dbconnect.users where User_Email = ? and User_Password = ?) and'+
            ' DialogID in (SELECT DialogID FROM dbconnect.dialog where UserID IN (SELECT User_id FROM dbconnect.users where User_Email = ? and User_Password = ?)) and DialogID = Dialog_id and Messages_id in (SELECT max(Messages_id) from dbconnect.messages GROUP BY Dialog_id) ORDER BY Time_of_create DESC;',[resume.User_Email, resume.User_Password, resume.User_Email, resume.User_Password]);
            return res.json(result);
        }
        if (req.method == 'PUT') {
            const resume = JSON.parse(req.body);
            const result = await query('SELECT * FROM  dbconnect.messages, dbconnect.users WHERE From_User_id = User_id AND Dialog_id =? ORDER BY Time_of_create;',
                [resume.dialogID]);
            return res.json(result);
         }
        if (req.method == 'DELETE') { 
            const resume = JSON.parse(req.body);
            const result = await query('SELECT * FROM dbconnect.dialog, dbconnect.users where UserID = User_id and DialogID = ? and UserID NOT IN (SELECT User_id FROM dbconnect.users where User_Email = ? and User_Password = ?)',
                [resume.myDialog,resume.User_Email, resume.User_Password]);
            return res.json(result);
        }

    }
    catch (e) {
        if (e instanceof Error) {
            console.log(e);
            res.status(500).json({ msg: e.message });
        }
    }
    // 
}

export default handler;