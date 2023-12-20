import { query } from 'libreres/contextDB';
import { NextApiHandler } from 'next';
import { format } from 'date-fns'


const handler: NextApiHandler = async (req, res) => {
    const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    try {
        if (req.method == 'PUT') {
            const resume = JSON.parse(req.body);
            const results = await query('DELETE FROM dbconnect.notification WHERE To_Users_id = ?',
                [resume]);
            return res.json(results);
        }
        if (req.method == 'DELETE') {
            const resume = JSON.parse(req.body);
            const results = await query('DELETE FROM dbconnect.notification WHERE Notification_id = ?',
                [resume]);
            return res.json(results);
        }
        if(req.method =='POST'){
            const resume = JSON.parse(req.body);
            const results = await query('insert into dbconnect.comment_post (Users_id, Content, Date_of_create, Post_id) value(?, ?, ?, ?);',
                [resume.UserID, resume.PostContent, date, resume.PostID]);
            return res.json(results);
        }
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ msg: e.message });
        }
    }
}

export default handler