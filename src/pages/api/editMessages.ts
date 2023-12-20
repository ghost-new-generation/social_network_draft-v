import { query } from 'libreres/contextDB'
import { NextApiHandler } from 'next'
import { format } from 'date-fns'
const handler: NextApiHandler = async (req, res) => {
  const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  try {
    if (req.method == 'POST') {
      const resume = JSON.parse(req.body);
      const results = await query('INSERT INTO dbconnect.messages (To_User_id, Content, Time_of_create, From_user_id, Dialog_id) VALUES (?,?,?,?,?);',
        [resume.To_User_id, resume.Content, date, resume.From_User_id, resume.dialogID]);
      return res.json(results);
    }
    if (req.method == 'DELETE') {
      const resume = JSON.parse(req.body);
      const result = await query('DELETE FROM dbconnect.messages WHERE (Messages_id = ?);',
        [resume]);
      return res.json(result);
    }
    if (req.method == 'PUT') {
      const resume = JSON.parse(req.body);
      const result = await query('UPDATE dbconnect.messages set Content = ?, Edit_Messages = 1 where Messages_id = ?;',
        [resume.Content, resume.numMessages]);
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

export default handler