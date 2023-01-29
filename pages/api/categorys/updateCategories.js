import Category from '../../../model/category';

const handler = async(req,res)=>{
    if(req.method==='GET' && req.query.other==='friendId'){
        
        // FETCHING USERID FOR GIVEN CATEGORY
    
        const {category} = req.query;
        const result= await Category.find({"name":category}).select("userId");
        if(result){
            res.status(200).json({ success:true,result});
        }else{
            res.status(404).json({ "message":"please enter valid username or password.",success:false } );
        }

    }else if(req.method==='GET' && req.query.other==='postId'){

        // FETCHING POSTID FOR GIVEN CATEGORY

        const {category} = req.query;
        const result= await Category.find({"name":category}).select("postIds");
        if(result){
            res.status(200).json({ success:true,result});
        }else{
            res.status(404).json({ "message":"please enter valid postId.",success:false } );
        }
    }else if(req.method==='GET' && req.query.other==='groupIds'){

        // FETCHING GROUPID FOR GIVEN CATEGORY

        const {category} = req.query;
        const result= await Category.find({"name":category}).select("GroupsIds");
        if(result){
            res.status(200).json({ success:true,result});
        }else{
            res.status(404).json({ "message":"please enter valid postId.",success:false } );
        }
    }else if(req.method==='POST'){

        // UPDATING CATEGORY

        let {postId,category,userId,GroupIds,DisscussionId} = req.body;
        category.map((cat)=>{
            const ct = cat.toLowerCase();
            const pId = postId===undefined?[]:postId;
            userId = userId===undefined?[]:userId;
            const gId = GroupIds===undefined?[]:GroupIds
            const dId = DisscussionId===undefined?[]:DisscussionId;
            Category.findOneAndUpdate({name:ct},{$push:{"userId":userId,"postIds":pId,"GroupsIds":gId,"DisscussionId":dId}},(err,doc)=>{
                if(err){
                    console.log(err.message);
                }
            });
        }) 
        res.status(200).json({message:"success"}); 
    }
}
export default handler;