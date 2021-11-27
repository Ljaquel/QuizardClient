import React, {useState} from 'react'
import Axios from 'axios'
import { useMutation } from '@apollo/client';

import { UPDATE_IMAGE } from '../../Calls'

const Images = ({ thumbnail, backgroundImage, updateField, _id }) => {
  const [thumbnailState, setThumbnailState] = useState("")
  const [backgroundImageState, setBackgroundImageState] = useState("")

  const [ updateThumbnail ] = useMutation(UPDATE_IMAGE, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { type: "Quiz", _id: _id, field: "thumbnail" }
  })

  const [ updateBackground ] = useMutation(UPDATE_IMAGE, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { type: "Quiz", _id: _id, field: "backgroundImage" }
  })

  
  const uploadImage = async(field, deletion) => {
    let publicId = null
    let url = null
    const formData = new FormData()

    if(!deletion) {
      if(field === "thumbnail") {
        formData.append("file", thumbnailState)
      }
      else if(field === 'backgroundImage') {
        formData.append("file", backgroundImageState)
      }
      formData.append("upload_preset", "quizard")
      const res = await Axios.post("https://api.cloudinary.com/v1_1/ljaquel/image/upload", formData)
      publicId = res.data.public_id
      url = res.data.url
    }
    else { publicId = ""; url = "" }

    const update = {publicId, url}
    updateField(field, update)

    if(field === "thumbnail") {
      updateThumbnail({ variables: { publicId, url }})
    }
    else if(field === "backgroundImage") {
      updateBackground({ variables: { publicId, url }})
    }
  }

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingImages">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseImages" style={{height: "35px"}}>
          Images
        </button>
      </h2>
      <div id="collapseImages" className="accordion-collapse collapse" data-bs-parent="#accordionSideBar">
        <div className="accordion-body">


          <div className="row px-2 mt-4">
            <div className="col">
              <span className="mx-1">Thumbnail:</span>
            </div>
            <div className="col col-12">
              <div className="input-group input-group-sm">
                <input type="file" className="form-control" id="thumbnailFile" onChange={e => setThumbnailState(e.target.files[0])}></input>
                <button className="btn btn-outline-secondary" type="button" onClick={() => uploadImage("thumbnail", false)} disabled={!thumbnailState || thumbnailState===""}>Upload</button>
                <button className="btn btn-outline-secondary" disabled={!thumbnail?.publicId} onClick={() => uploadImage("thumbnail", true)} type="button">x</button>
              </div>
            </div>
          </div>
          
          <div className="row px-2 mt-4">
            <div className="col">
              <span className="mx-1">Background:</span>
            </div>
            <div className="col col-12">
              <div className="input-group input-group-sm">
                <input type="file" className="form-control" id="backgroundImageFile" onChange={e => setBackgroundImageState(e.target.files[0])}></input>
                <button className="btn btn-outline-secondary" disabled={!backgroundImageState || backgroundImageState===""} type="button" onClick={() => uploadImage("backgroundImage", false)}>Upload</button>
                <button className="btn btn-outline-secondary" disabled={!backgroundImage?.publicId} onClick={() => uploadImage("backgroundImage", true)} type="button">x</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Images
