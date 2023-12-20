import { query } from "libreres/contextDB";
import { NextApiHandler } from "next";
import { format } from 'date-fns'

const handler: NextApiHandler = async (req, res) => {
  const date = format(new Date(),'yyyy-MM-dd');
  try {
    if (req.method == 'PUT') {
      const resume = JSON.parse(req.body);
      const result = await query('INSERT INTO dbconnect.users (User_LastName, User_FirstName, User_Password, User_Email, genders_id, roles_id, Date_of_creation) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [resume.User_LastName, resume.User_FirstName, resume.User_Password, resume.User_Email, resume.genders_id, resume.roles_id, date]);

    }
    if (req.method == 'POST') {
      const result = await query('SELECT * FROM dbconnect.users, dbconnect.genders, dbconnect.roles WHERE users.genders_id = genders.genders_id and users.roles_id = roles.roles_id;');
      return res.json(result);
    }
    if (req.method == 'DELETE') {
      const resume = JSON.parse(req.body);
      const result = await query('DELETE FROM dbconnect.users WHERE (User_id = ?);',
        [resume]);
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