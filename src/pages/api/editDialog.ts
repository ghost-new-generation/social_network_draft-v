import { query } from 'libreres/contextDB'
import { NextApiHandler } from 'next'
import { format } from 'date-fns'
const handler: NextApiHandler = async (req, res) => {
  const date = format(new Date(),'yyyy-MM-dd HH:mm:ss');
  try {
    if(req.method =='POST'){
    const resume = JSON.parse(req.body);
    const results = await query('SELECT * From dbconnect.dialog where  DialogID in (SELECT DialogID From dbconnect.dialog where UserID = ?) and UserID IN (SELECT User_id From dbconnect.users where User_Email = ? and User_Password = ?);',
      [resume.UserID, resume.MyLastName,resume.MyFirstName]);
    return res.json(results);
    }
    if(req.method =='PUT'){
       const resume = JSON.parse(req.body);
       const result_one = await query('INSERT INTO dbconnect.dialog (UserID, DialogID) VALUES (?, ?);',[resume.UserID , resume.countDialog]);
       res.json(result_one);
       const result_two = await query('INSERT INTO dbconnect.dialog (UserID, DialogID) VALUES (?, ?);',[resume.MyUserID, resume.countDialog]);
       res.json(result_two);

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