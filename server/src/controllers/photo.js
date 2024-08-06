import { cloudinary } from "../util/cloudinary.js";

export const populatePhoto = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups",
    });
    res
      .status(201)
      .json({ success: true, msg: "Upload successful", data: uploadResponse });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
