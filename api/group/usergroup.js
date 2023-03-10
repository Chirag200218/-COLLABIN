import User from "../../model/user";
import connectmongo from "../../utils/mongoconnect";
export default async function handler(req,res){
    await connectmongo();
    if(req.method === 'GET'){
        const { userId } = req.query;
        const result = await User.findById(userId).select("groupId");
        res.status(200).json({success:true,result:result});
    }
}