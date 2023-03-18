import User from "../../../model/user";
import connectmongo from "../../../utils/mongoconnect";
const handler = async(req, res)=> {
    await connectmongo();
    if(req.method==='PUT'){

        // USER LIKES UPDATED

        try{
            let id = req.body.id;
            let arr = req.body.likes;
            const result =  await User.findByIdAndUpdate(id,{$push:{"LikeId":arr}})
            res.status(200).json({message:"success",result});
        }catch(err){
            res.status(404).json(err);
        }
    }else if(req.method==="GET"){

        // USER LIKES FETCHED

        try{
            let id = req.body.id;
            let arr = req.body.likes;
            const result =  await User.findByIdAndUpdate(id,{$pull:{"LikeId":arr}})
            res.status(200).json({message:"success",result});
        }catch(err){
            res.status(404).json({message:err.message});
        }
    }
}

export default handler;