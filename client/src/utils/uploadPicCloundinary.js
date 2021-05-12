import axios from "axios";

const uploadPicCloundinary = async(media) => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "ITHub");
    // form.append("cloud_name", "do2uj1ht0");

    // const res = await axios.post("https://api.cloudinary.com/v1_1/do2uj1ht0/image/upload", form);
    const res = await axios.post("https://api.cloudinary.com/v1_1/do2uj1ht0/image/upload");
    return res.data.url;
  } catch (error) {
    return;
  }
};

export default uploadPicCloundinary;