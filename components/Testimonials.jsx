import Image from "next/image";

export default function Testimonials() {
  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide testimonials mx-5"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <div className="testimonial-item">
            <Image
              src="/assets/pexels-olly-3769021.jpg"
              className="d-block w-100"
              alt="Testimonial Image"
              width={536}
              height={354}
            />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center">
              <h5>Great Experience!</h5>
              <p>
                "This blogging platform has transformed my writing journey. The
                community is supportive, and the features are user-friendly.
                Highly recommend!"
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <div className="testimonial-item">
            <Image
              src="/assets/pexels-olly-927022.jpg"
              className="d-block w-100"
              alt="Testimonial Image"
              width={536}
              height={354}
            />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center">
              <h5>Excellent Support</h5>
              <p>
                "The customer service team is outstanding. They helped me set up
                my blog quickly and provided valuable tips to increase my
                readership."
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="testimonial-item">
            <Image
              src="/assets/pexels-olly-3783725.jpg"
              className="d-block w-100"
              alt="Testimonial Image"
              width={536}
              height={354}
            />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center">
              <h5>User-Friendly Interface</h5>
              <p>
                "I love how intuitive the platform is. The drag-and-drop editor
                makes it easy to create beautiful posts without any technical
                skills."
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
