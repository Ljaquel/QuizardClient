import React from 'react';

function PlatformCard({ platform, history, add, handleShow }) {
  if(add) {
    return (
      <div className="card platform-card px-5 h-100" style={{width: '18rem'}} onClick={() => handleShow()}>
        <img className="card-img-top px-5 addPlatformCardImage" src="https://res.cloudinary.com/ljaquel/image/upload/v1638384870/admin/add-icon-png-2486_a5ns9g.png" alt="..."/>
      </div>
    )
  }

  return (
    <div className="card platform-card rounded h-100" style={{width: '18rem'}} onClick={() => {history.push(`/platform/${platform._id}`)}}>
      <img className="card-img-top p-1 limit-image-height" src={platform?.image?.url?platform.image.url:"https://res.cloudinary.com/ljaquel/image/upload/v1637970039/admin/imagePlaceholder_fxpfme.png" } alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{platform.name}</h5>
        <p className="card-text">{platform.description.length < 80 ? platform.description : platform.description.substring(0, 80)+"..."}</p>
      </div>
    </div>
  )
}

export default PlatformCard;