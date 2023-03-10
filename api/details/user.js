import User from "../../model/user";
import connectmongo from "../../utils/mongoconnect";

const handler = async(req, res)=> {

    // INTIAL USER DATA POSTED
    await connectmongo();
    if(req.method === 'POST'){  //SignUP
        try{
            const { name,email,password,profilePic } = req.body; 
            const Userdata = new User({
                name: name,
                email: email,
                password: password,
                image:profilePic,
            })
            const result = await User.insertMany([Userdata]);
            res.status(200).json({ id:result[0]._id,message:"User connected Succesfully"});
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }

    // USER DATA UPDATED WITH POSTS,CATEGORYS AND FRIENDS

     if(req.method === 'PUT'){
        try{
            const id = req.body.id;
            const allData = req.body.allData===undefined?[]:req.body.allData;
            const selectedCats = req.body.selectedCats===undefined?[]:req.body.selectedCats;
            const postIds =  req.body.postIds===undefined?[]:[req.body.postIds];
            const friendId = req.body.friendId===undefined?[]:[req.body.friendId];
            const Experience = allData.Experience===undefined?[]:allData.Experience;
            const Education = allData.Education===undefined?[]:allData.Education;
            const Projects = allData.Project===undefined?[]:allData.Project;
            const Skills = allData.Skill===undefined?[]:allData.Skill;
            const Links = allData.Links===undefined?[]:allData.Link
            const Personal = req.body.personal===undefined?{}:req.body.personal;
            console.log(Projects);
            User.findByIdAndUpdate(id,{
                    $push:{
                        "categoryId":{$each:selectedCats},
                        "PostId":{$each:postIds},
                        "friendId":{$each:friendId},
                        "experienceId":{$each:Experience},
                        "educationId":{$each:Education},
                        "skillId":{$each:Skills},
                        "projectId":{$each:Projects},
                        "linkId":{$each:Links},
                    },
                    "location":Personal?.location,
                    "headline":Personal?.headline,
                    "image":Personal?.profilePic,
                    "name":Personal?.name,
            },(err,doc)=>{
                if(err){
                    console.log(err);
                }
            })
                res.status(200).json({message:"success"});
            }catch(err){
                res.status(400).json({message:err.message});
            }
    }

    // USER DATA FETCHED
    
    else if(req.method==='GET' && req.query.other===undefined){ 
        const id = req.query.id;
        await connectmongo();
        const result = await User.findById(id);
        res.status(200).json({result});
    }

    // USER FRIENDS DATA FETCHED
    
    else if(req.method==='GET' && req.query.other==="allFriendsId"){  
        try{
            const id = req.query.id;
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                const result = await User.findById(id).select("name image");
                res.status(200).json({result});
            }else{
                res.status(200).json([]);
            }
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }
    
    // USER POST DATA FETCHED
    
    else if(req.method==='GET' && req.query.other==="allPostsId"){
        try{
            const id = req.query.id;
            if(id.match(/^[0-9a-fA-F]{24}$/)) {
                const result = await User.findById(id).select("PostId");
                res.status(200).json({result});
            }else{
                res.status(200).json([]);
            }
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }
  }
 
  export default handler;