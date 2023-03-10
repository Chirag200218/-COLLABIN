import Group from '../../model/group';
import connectmongo from '../../utils/mongoconnect';

const handler = async(req, res)=> {
    await connectmongo();
    if(req.method==='POST'){

        // GROUP CREATED

        try{
 
            const {userId,name,image,title,about,Compensation,description,company,category,location,groupEmail} = req.body;
            const groupData = new Group({
                userId,name,image,title,about,description,company,category,Compensation,location,groupEmail
            });
            const result = await Group.insertMany([groupData]);
            res.status(200).json({ message:"User connected Succesfully",id:result[0]._id});
        }catch(err){
            res.status(400).json({message:err.message});
        }
       
    }
}
export default handler;