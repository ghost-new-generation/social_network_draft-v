import { query } from 'libreres/contextDB'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  
  try {
    if(req.method == 'POST'){
    const resume = JSON.parse(req.body);
    const results = await query('SELECT * FROM dbconnect.users where User_Email = ? and User_Password = ?',
      [resume.User_Email, resume.User_Password]);
    return res.json(results);
    }
    if(req.method == 'PUT'){
      const resume = JSON.parse(req.body);
      const results = await query('SELECT count(Friend_id) as CountFriend FROM dbconnect.friends WHERE Users_id IN (SELECT User_id FROM dbconnect.users where User_Email = ? and User_Password = ?);',
        [resume.User_Email, resume.User_Password]);
      return res.json(results);
    }

  } catch (e) {
    if (e instanceof Error) {
        res.status(500).json({ msg: e.message });
    }
  }
  res.status(500).end();
}

export default handler