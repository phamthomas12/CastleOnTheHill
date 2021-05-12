const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../../config/isAuthenticated");
const {check, validationResult} = require("express-validator");

const Profile = require("../../../models/profile");
const User = require("../../../models/user");

router.get('/user/:id',isAuthenticated,(req,res)=>{
  User.findOne({_id:req.params.id})
  .select("-password")
  .then(user=>{
       Post.find({postedBy:req.params.id})
       .populate("postedBy","_id name")
       .exec((err,posts)=>{
           if(err){
               return res.status(422).json({error:err})
           }
           res.json({user,posts})
       })
  }).catch(err=>{
      return res.status(404).json({error:"User not found"})
  })
})

// route: GET api/profile/me
router.get("/me", isAuthenticated, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id })
        .populate("user", ["name", "profilePic"]);

        if(!profile) {
            return res.status(400).json({msg: "This profile is not available!"});
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
 
// UPDATE PROFILE
router.post("/update", isAuthenticated, async (req, res) => {
    try {
      const { userId } = req;
  
      const { bio, facebook, youtube, linkedin, instagram, profilePic } = req.body;
  
      let profileFields = {};
      profileFields.user = userId;
  
      profileFields.bio = bio;
  
      profileFields.social = {};
  
      if (facebook) profileFields.social.facebook = facebook;
  
      if (youtube) profileFields.social.youtube = youtube;
  
      if (instagram) profileFields.social.instagram = instagram;
  
      if (linkedin) profileFields.social.linkedin = linkedin;
  
      await Profile.findOneAndUpdate(
        { user: userId },
        { $set: profileFields },
        { new: true }
      );
  
      if (profilePic) {
        const user = await User.findById(userId);
        user.profilePic = profilePic;
        await user.save();
      }
  
      return res.status(200).send("Success");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  });

// route    GET api/profile/user/:user_id
// desc     Get profile by user ID
// access   Public
// router.get(
//     '/user/:user_id',
//     checkObjectId('user_id'),
//     async ({ params: { user_id } }, res) => {
//       try {
//         const profile = await Profile.findOne({
//           user: user_id
//         }).populate('user', ['name', 'avatar']);
  
//         if (!profile) return res.status(400).json({ msg: 'Profile not found' });
  
//         return res.json(profile);
//       } catch (err) {
//         console.error(err.message);
//         return res.status(500).json({ msg: 'Server error' });
//       }
//     }
//   );
  

module.exports = router