import { Schema,model,models } from "mongoose";

const user = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        default:"12344321"
    },
    categoryId:[{type:String,default:[]}],
    image:{
        type:String,
        default:"/images/user.svg",
    },
    headline:{
        type:String,
    },
    friendId:[{type:String,default:[]}],
    PostId:[{type:String,default:[]}],
    DisscussionId:[{type:String,default:[]}],
    experienceId:[{type:Schema.Types.Mixed,default:[]}],
    educationId:[{type:Schema.Types.Mixed,default:[]}],
    skillId:[{type:String,default:[]}],
    projectId:[{type:Schema.Types.Mixed,default:[]}],
    linkId:[{type:Schema.Types.Mixed,default:[]}],
    notificationId:[{type:Schema.Types.Mixed,default:[]}],
    groupId:[{type:Schema.Types.Mixed,default:[]}],
    location:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}, { timestamps: true });

const User =  models.User || model("User",user);

export default User;