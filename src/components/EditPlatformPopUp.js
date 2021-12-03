import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_IMAGE, UPDATE_PLATFORM } from '../Calls'
import { MdOutlineEdit } from "react-icons/md";
import { useParams } from 'react-router'
import Cloudinary from '../util/Cloudinary'

const EditPlatformPopUp = ({refetch, platform}) => {
  let { image, banner } = platform
  const { _id:sitePlatformId } = useParams()
  const [platformImageState, setPlatformImageState] = useState(null)
  const [bannerState, setBannerState] = useState(null)

  const [ updateImage ] = useMutation(UPDATE_IMAGE, {
    onCompleted() { refetch() },
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { type: "Platform", _id: sitePlatformId }
  })

  const [ updatePlatform ] = useMutation(UPDATE_PLATFORM, {
    onCompleted() { refetch() },
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { platformId: sitePlatformId }
  })

  return (
    <>
      <button className="btn btn-sm floating-edit-icon rounded mt-2 pt-0 px-1" data-bs-toggle="modal" data-bs-target="#editPlatformModal">
        <MdOutlineEdit size="18"/>
      </button>

      <div className="modal fade" id="editPlatformModal" tabIndex="-1" aria-labelledby="editPlatformModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editPlatformModalLabel">Edit Platform Style</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            
            <div className="row px-2 mt-4">
              <div className="col col-12">
                <div className="input-group input-group-sm">
                  <input type="file" className="form-control" id="platformImageFile" onChange={e => setPlatformImageState(e.target.files[0])}></input>
                  <button className="btn btn-outline-secondary" disabled={!platformImageState || platformImageState===""} type="button"
                    onClick={async () => {
                      const cloud = await Cloudinary(platformImageState);
                      updateImage({ variables: { field: "image", publicId: cloud.publicId, url: cloud.url}});
                      setPlatformImageState(null)
                    }}>
                    Modify Icon
                  </button>
                  <button className="btn btn-outline-secondary" disabled={!image?.publicId} 
                    onClick={() => {
                      updateImage({ variables: { field: "image", publicId: '', url: ''}});
                      setPlatformImageState(null)
                    }} 
                    type="button">
                      x
                  </button>
                </div>
              </div>
            </div>

            <div className="row px-2 mt-4">
              <div className="col col-12">
                <div className="input-group input-group-sm">
                  <input type="file" className="form-control" id="bannerFile" onChange={e => setBannerState(e.target.files[0])}></input>
                  <button className="btn btn-outline-secondary" disabled={!bannerState || bannerState===""} type="button"
                    onClick={async () => { 
                      const cloud = await Cloudinary(bannerState);
                      updateImage({ variables: { field: "banner", publicId: cloud.publicId, url: cloud.url}});
                      setBannerState(null)
                    }}>
                    Modify Banner
                  </button>
                  <button className="btn btn-outline-secondary" disabled={!banner?.publicId}
                    onClick={() => {
                      updateImage({ variables: { field: "banner", publicId: '', url: ''}});
                      setBannerState(null)
                    }}
                    type="button">
                      x
                  </button>
                </div>
              </div>
            </div>

            <div className="row px-2 mt-4">
              <div className="col col-auto align-self-center">
                <label>Banner Color:</label>
              </div>
              <div className="col"></div>
              <div className="col col-auto align-self-center">
                <input type="color" className="form-control form-control-color" value={platform.bannerColor} onInput={(e) => updatePlatform({ variables: { update: { bannerColor: e.target.value }} })}></input>
              </div>
            </div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default EditPlatformPopUp
