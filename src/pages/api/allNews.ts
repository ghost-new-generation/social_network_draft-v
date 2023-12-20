import { query } from "libreres/contextDB";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
    try {
      
        if (req.method = 'POST') {
            const result = await query('SELECT post.Post_id,Title_post,Date_of_create,Content_post, users.User_id ,User_LastName,User_FirstName,User_IMG , count(like_post.Post_id) as countLike FROM dbconnect.users,dbconnect.post left join dbconnect.like_post on post.Post_id = like_post.Post_id where post.Users_id = users.User_id group by post.Post_id ORDER BY Date_of_create DESC;');
            return res.json(result);
        }
        if (req.method = 'DELETE') {
            const resume = JSON.parse(req.body);
            const result = await query('INSERT INTO dbconnect.like_post (User_id , Post_id) VALUES (? , ?);',
                [resume.MyId, resume.PostID]);
            return res.json(result);
        }
        if(req.method='PUT'){
            const resume = JSON.parse(req.body);
            const result = await query('SELECT * FROM dbconnect.like_post WHERE User_id= ? and Post_id= ?;',
                [resume.MyId, resume.PostID]);

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