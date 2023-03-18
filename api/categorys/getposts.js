import Category from "../../model/category";
import User from "../../model/user";
import connectmongo from "../../utils/mongoconnect";

export default async function handler(req,res){
    await connectmongo();
    if(req.method === 'GET'){

        // CATEGORY FETCHED BY NAME FOR POSTS
       
        const {catname} = req.query;
        try {
            const result=await Category.find({name:catname}).select("postIds").sort({'postIds':-1});
            res.status(200).json({success:true,result});
        } catch (error) {
            res.status(500).json({success:false,message:error.message});
        }
    }
    if(req.method === 'POST'){

        const { groupId,userId } = req.body;
        try {
            User.findByIdAndUpdate(userId,{
                $push:{
                    "groupId":groupId,
                }
            },(err,doc)=>{
                if(err){
                    console.log(err.message);
                }})
            res.status(200).json({success:true});
        } catch (error) {
            res.status(500).json({success:false,message:error.message});
        }
    }
}