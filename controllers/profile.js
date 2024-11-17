const profileModel = require("../models/profileSchema")


exports.profileData = async function (req, res) {
  const a = await profileModel.findOne()
  res.send(a)
  console.log(a)
}

exports.updateProfileData = async function (req, res) {
  try {
    const { name, image, qr } = req.body;

    if (!name || !image || !qr) {
      return res.status(400).json({ message: "Name, image and qr image is required" });
    }

    const updatedProfile = await profileModel.findOneAndUpdate(
      {},
      { name, image, qr },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};
