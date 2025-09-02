
const {User} = require('../models/userModel');







// get profile and sent data isUser = ? , isOwnerProfile = ? , datauser = 

exports.getProfile = async(req,res) => {
    try {
        let {id} = req.params;
        let isUser = null;
        let userData = null;
        let isOwnerProfile;
        console.log(req.user)
        if (req.user)
        {
            isUser = true;
            userData = await User.findOne({
            where:{id}})
            if (!userData)
            {
                res.status(400).json({msg:"هذا المستخدم غير موجود او تم حدف حسابه"})
            }
            if (userData.id === req.user.id)
            {
                isOwnerProfile = true;
            }
        }
        res.status(200).json({isUser,userData,isOwnerProfile})
    }catch (err)
    {
        res.status(400).json({msg:"يبدو ان هناك مشكله حاول مره  اخره",error:err.message})
    }
}