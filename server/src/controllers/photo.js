import { cloudinary } from "../util/cloudinary.js";

export const populatePhoto = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups",
    });
    console.log(uploadResponse);
    res.json({ msg: "Upload successful", data: uploadResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
