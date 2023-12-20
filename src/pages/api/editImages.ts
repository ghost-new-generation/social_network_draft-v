import { query } from 'libreres/contextDB'
import { NextApiHandler } from 'next'
import { format } from 'date-fns'
const handler: NextApiHandler = async (req, res) => {
  const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  try {
    if (req.method == 'POST') {
      const resume = JSON.parse(req.body);
      const results = await query('INSERT INTO dbconnect.images(Name_Image , Gallery_id) VALUES (?, ?);',
        [resume.data, resume.GID]);
      return res.json(results);
    }
    if (req.method == 'PUT') {
        const resume = JSON.parse(req.body);
        const results = await query('INSERT INTO dbconnect.gallery (User_id) VALUES (?);',
          [resume]);
        return res.json(results);
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