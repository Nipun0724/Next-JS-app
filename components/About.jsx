import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <Image
            src="/assets/pexels-pixabay-261579.jpg"
            className="d-block mx-lg-auto img-fluid"
            alt="Blogging Image"
            width={700}
            height={500}
            loading="lazy"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            Welcome to Our Blogging Platform
          </h1>
          <p className="lead">
            Our platform provides an easy and intuitive way to share your
            thoughts, stories, and ideas with the world. With a range of
            customizable options, you can create a unique and engaging blog that
            reflects your personality and interests.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-md-2"
            >
              <Link href="/login">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
