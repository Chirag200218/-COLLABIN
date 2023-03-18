import User from "../../model/user";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/fireconnect";
import connectmongo from "../../utils/mongoconnect";

export default async function handler(req, res) {
    await connectmongo();
    if (req.method === "GET") {

        // USER POSTS FETCHED BY USER ID

        try {
            const id = req.query.id;
            const userdata=await User.findById(id);
            let arr= [];
            await Promise.all(
                userdata.PostId.map(async(post)=>{
                    const postref = doc(db, "posts", post);
                    const docSnap = await getDoc(postref);
                    const data = docSnap.data();
                    arr.push(data);
                })
            )
            res.status(200).json({ result: arr });
            
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}