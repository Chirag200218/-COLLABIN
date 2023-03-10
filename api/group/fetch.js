import Group from '../../model/group';
import connectmongo from '../../utils/mongoconnect';

const handler = async(req, res)=> {

    // GROUP FETCHED BY USER ID
    await connectmongo();
    if(req.method==='GET'){
        try{
            const {id}= req.query;
            const result = await Group.findById(id).sort({'createdAt':-1});
            res.status(200).json({ message:"User connected Succesfully",result});
        }catch(err){
            res.status(400).json({message:err.message});
        }
       
    }
}
export default handler;