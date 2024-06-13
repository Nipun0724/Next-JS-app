import Image from "next/image";

export default function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            Company Name
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            © 2024 Company, Inc
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <Image
                src="/assets/instagram.png"
                alt="Instagram"
                width={30}
                height={30}
              />
            </a>
          </li>
          <li className="ms-3">
            <Image
              src="/assets/x-twitter.png"
              alt="Facebook"
              width={30}
              height={30}
            />
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <Image
                src="/assets/linkedin (1).png"
                alt="LinkedIn"
                width={30}
                height={30}
              />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
