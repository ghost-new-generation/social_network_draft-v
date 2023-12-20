import { query } from 'libreres/contextDB';
import { NextApiHandler } from 'next';
// import { format } from 'date-fns';

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method == 'POST') {
      const resume = JSON.parse(req.body);
      const results = await query('SELECT * FROM dbconnect.images, dbconnect.gallery, dbconnect.users where users.User_id = gallery.User_id and images.Gallery_id = gallery.Gallery_id and users.User_id = ?;',
        [resume]);
      return res.json(results);
    }
    if (req.method == 'PUT') {
      const resume = JSON.parse(req.body);
      const results = await query('SELECT * FROM dbconnect.gallery where gallery.User_id IN (SELECT User_id FROM dbconnect.users where User_Email = ? and User_Password = ?);',
        [resume.User_Email, resume.User_Password]);
      return res.json(results);
    }
    if (req.method == 'DELETE'){
      const resume = JSON.parse(req.body);
      const results = await query('SELECT * FROM dbconnect.images, dbconnect.gallery, dbconnect.users where users.User_id = gallery.User_id and images.Gallery_id = gallery.Gallery_id and users.User_id = ?;',
        [resume]);
      return res.json(results);
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ msg: e.message });
    }
  }
}

export default handler