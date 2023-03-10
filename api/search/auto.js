import User from "../../model/user";
import connectmongo from "../../utils/mongoconnect";
export default async function handler(req,res){
    await connectmongo();
    if(req.method==='GET'){
        try{
            if(req.query.name){
                let results;
                await User.aggregate([
                    {
                        $search:{
                            index:"autocomplete",
                            "autocomplete":
                            {
                                
                                "path":"name",
                                "query":req.query.name,
                                "fuzzy":{
                                    "maxEdits":2,
                                    "maxExpansions":100
                                },
                                tokenOrder:"sequential"
                            }
                        },
                    },{
                        $limit:5
                    }
                ])
                .then((data)=>{
                    results=data;
                })
                res.send({result:results});
            }else{
                res.send({result:[]});
            }
        }catch(err){
            console.log(err.message);
            res.status(400).json({message:err.message});
        }
    }
}