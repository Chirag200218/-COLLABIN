import User from "../../model/user"
import connectmongo from "../../utils/mongoconnect";

const authUser=async (req, res) => {
    await connectmongo();
    if(req.method==="POST"){
        try{
            const payload=req.body;
            let user = await User.findOne({ email: payload?.email });
            if (!user) {
                user = new User({
                email: payload?.email,
                image: payload?.image,
                name: payload?.name,
                });
                await user.save();
            }
            res.status(200).json({ id:user.id,User:user,success:true,message:"User connected Succesfully" });
        }
        catch{
            res.status(400).json({message:"error occured"});
        }
    }
}

export default authUser;