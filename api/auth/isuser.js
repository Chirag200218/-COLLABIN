import User from "../../model/user";
import connectmongo from "../../utils/mongoconnect";

const handler = async(req, res)=> {
    await connectmongo(); 
    if(req.method === 'GET'){
        try{
            const { email,password} = req.query;
            const Userdata = await User.findOne({email:email,password:password});
            res.status(200).json({ id:Userdata._id,success:true,message:"User connected Succesfully"});
        }
        catch{
            res.status(400).json({message:"error occured"});
        }
    }
}

export default handler;