const cloudinary = require("../../../config/cloudinary");
const fileType = require("file-type");

async function uploadImg(imgBase64) {
  let base64String = imgBase64.split(",");
  base64String = base64String[base64String.length - 1];
  const mimetype = await fileType.fromBuffer(
    Buffer.from(base64String, "base64")
  );

  const file = `data:${mimetype.mime};base64,${base64String}`;

  try {
    const imgUrl = await cloudinary.uploader.upload(file);
    return imgUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  uploadImg,
};
