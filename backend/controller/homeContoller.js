










exports.getHome = async(req,res) => {
    try {  
        let isUser = null;
        if (req.user)
        {
            isUser = true;
        }
        res.status(200).json({isUser})
    }catch(err)
    {
        res.status(400).json({msg:"حدث مشكله حاول مره اخره"})
    }
}