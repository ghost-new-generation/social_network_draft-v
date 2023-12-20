import { query } from 'libreres/contextDB';
import { NextApiRequest, NextApiHandler } from 'next';
import formidable from "formidable"
import { format } from 'date-fns';
import fs from "fs/promises"

const handler: NextApiHandler = async (req, res) => {
  const date = format(new Date(),'yyyy-MM-dd HH:mm:ss');
  try {
    if (req.method == 'POST') {
      const resume = JSON.parse(req.body);
      const results = await query('UPDATE dbconnect.users SET User_LastName = ?, User_FirstName = ?, genders_id = ?, User_IMG= ? , User_Status = ?, Date_of_birth = ? WHERE (User_id = ?);',
        [resume.LastName,resume.FirstName, resume.Genders,resume.Photos,resume.Status, resume.DateBirth, resume.User_id]
      )
      return res.json(results)
    }
    if (req.method == 'PUT') {
      const resume = JSON.parse(req.body);
      const result = await query('INSERT INTO dbconnect.users (User_LastName, User_FirstName, User_Password, User_Email, genders_id, roles_id, Date_of_creation, Date_of_birth, User_IMG) VALUES (?, ?, ?, ?, ?, 2, ?, ?, "empty.png");',
        [resume.User_LastName, resume.User_FirstName, resume.User_Password, resume.User_Email, resume.genders_id, date, resume.Date_of_birth]);
        return res.json(result)
      }
      if(req.method=='DELETE'){
        const resume = JSON.parse(req.body);
        const result = await query('UPDATE dbconnect.messages SET messages.Viewed_Messages = 0 WHERE messages.Dialog_id = ? and messages.From_User_id = ?;',
        [resume.dialogIDs,resume.FromUserid])
        return res.json(result)
      }
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ msg: e.message });
    }
  }
}

export default handler