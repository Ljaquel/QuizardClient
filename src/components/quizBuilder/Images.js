import React, {useState} from 'react'
import Axios from 'axios'
import { Image } from 'cloudinary-react'
import { useMutation } from '@apollo/client';

import { UPDATE_THUMBNAIL, UPDATE_BACKGROUND } from '../../Calls'

const Images = ({ thumbnail, backgroundImage, updateField, _id }) => {
  const [thumbnailState, setThumbnailState] = useState("")
  const [backgroundImageState, setBackgroundImageState] = useState("")

  const [ updateThumbnail ] = useMutation(UPDATE_THUMBNAIL, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { quizId: _id }
  })

  const [ updateBackground ] = useMutation(UPDATE_BACKGROUND, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { quizId: _id }
  })

  
  const uploadImage = async(field, deletion) => {
    let public_id = null
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
      public_id = res.data.public_id
      if(field === 'backgroundImage') { public_id = res.data.url }
    }
    else { public_id = "" }


    updateField(field, public_id)

    if(field === "thumbnail") {
      updateThumbnail({ variables: { value: public_id }})
    }
    else if(field === "backgroundImage") {
      updateBackground({ variables: { value: public_id }})
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
                <button className="btn btn-outline-secondary" disabled={!thumbnail} onClick={() => uploadImage("thumbnail", true)} type="button">x</button>
              </div>
            </div>
          </div>
          
          {thumbnail && <Image cloudName="ljaquel"  width="100" publicId={thumbnail}/> } 

          <div className="row px-2 mt-4">
            <div className="col">
              <span className="mx-1">Background:</span>
            </div>
            <div className="col col-12">
              <div className="input-group input-group-sm">
                <input type="file" className="form-control" id="backgroundImageFile" onChange={e => setBackgroundImageState(e.target.files[0])}></input>
                <button className="btn btn-outline-secondary" disabled={!backgroundImageState || backgroundImageState===""} type="button" onClick={() => uploadImage("backgroundImage", false)}>Upload</button>
                <button className="btn btn-outline-secondary" disabled={!backgroundImage} onClick={() => uploadImage("backgroundImage", true)} type="button">x</button>
              </div>
            </div>
          </div>

          {backgroundImage && <Image cloudName="ljaquel"  width="100" publicId={backgroundImage}/>}


        </div>
      </div>
    </div>
  )
}

export default Images
