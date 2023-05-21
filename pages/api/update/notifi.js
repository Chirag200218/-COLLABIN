import User from "../../../model/user";
export default async function handler(req,res){
    if(req.method==="PUT"){
        try{
            const updatesnotifi = req.body;
            const userid = updatesnotifi.userId;
            console.log(updatesnotifi.userId);
            User.findByIdAndUpdate('63c16061e80b6ee15b614239',{
                $push:{
                    "notificationId":[updatesnotifi]
                }
            },(err,doc)=>{
                if(err){
                    // res.status(400).json({message:err.message});
                    console.log(err);
                }
            })
            res.status(200).json({message:"Notification Added"});
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }
}