import Category from "../../../model/category";
import connectmongo from "../../../utils/mongoconnect";
export default async function handler(req,res){
    await connectmongo();
    if(req.method==='GET'){
        try{
            const cat = req.query.category;
            const result=await Category.find({name:cat}).select("userId");
            
            res.status(200).json({result});
        }catch(err){
            res.status(400).json({message:err.message});
        }   
    }

}
