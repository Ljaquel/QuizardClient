
import Axios from 'axios'

const Cloudinary = async (state) => {
  const formData = new FormData()
  formData.append("file", state)
  formData.append("upload_preset", "quizard")
  const res = await Axios.post("https://api.cloudinary.com/v1_1/ljaquel/image/upload", formData)
  const publicId = res.data.public_id
  const url = res.data.url
  return { publicId, url }
}

export default Cloudinary;