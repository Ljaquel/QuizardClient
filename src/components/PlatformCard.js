import React from 'react';

function PlatformCard({ platform, history }) {
  return (
    <div className="card border border-3 platform-card rounded" style={{width: '18rem'}} onClick={() => {history.push(`/platform/${platform._id}`)}}>
      <img className="card-img-top p-1" src={platform?.image?.url?platform.image.url:"https://res.cloudinary.com/ljaquel/image/upload/v1637970039/admin/imagePlaceholder_fxpfme.png" } alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{platform.name}</h5>
        <p className="card-text">{platform.description.length < 80 ? platform.description : platform.description.substring(0, 80)+"..."}</p>
      </div>
    </div>
  )
}

export default PlatformCard;