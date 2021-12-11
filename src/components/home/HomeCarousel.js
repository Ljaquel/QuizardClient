import React from "react";

const HomeCarousel = ({ quizzes, history }) => {
  let placeholder = "https://res.cloudinary.com/ljaquel/image/upload/v1637970039/admin/imagePlaceholder_fxpfme.png"

  const bProps = { backgroundSize: 'cover', backgroundPosition: 'center'}

  const goToQ = (q) => { history.push(`/quizscreen/${q._id}`) }

  return (
    <div id="carouselExampleCaptions" className="carousel slide px-0 bg-dark" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner" style={{margin: 'auto', width: "100%"}}>
        {quizzes && quizzes.map((q, i) =>
            <div key={i} className={`carousel-item ${i===0?"active":''}`}>
              <div onClick={()=>goToQ(q)} className="d-block w-100 carousel-image" style={{opacity: "0.5", height: "500px", ...bProps, backgroundImage: `url(${q.thumbnail.url?q.thumbnail.url:placeholder})`}} alt="..."/>
              <div onClick={()=>goToQ(q)} className="carousel-caption d-none d-md-block">
                <h5 className="pointer">{q.name}</h5>
                <p className="pointer">{q.description.length >= 270 ? q.description.substring(0, 270) : q.description}</p>
              </div>
            </div>
        )}
      </div>
      <button className="carousel-control-prev" style={{width: "10%"}} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" style={{width: "10%"}} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default HomeCarousel;