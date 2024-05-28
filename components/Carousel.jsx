export default function Carousel(props) {
  const posts = props.posts;
  const categories = [
    "Technology",
    "Business",
    "Politics",
    "Science",
    "Design",
    "Culture",
    "Health",
    "Travel",
  ];

  // Use the find function to get the first post for each category
  const carouselPosts = categories
    .map((category) => posts.find((post) => post.category === category))
    .filter(Boolean); // Remove undefined values if no posts match a category

  return (
    <div
      id="myCarousel"
      className="carousel slide mb-6"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {carouselPosts.map((post, key) => (
          <button
            key={key}
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={key}
            aria-label={`Slide ${key + 1}`}
            className={key === 0 ? "active" : ""}
            aria-current={key === 0 ? "true" : ""}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {carouselPosts.map((post, key) => (
          <div
            className={`carousel-item ${key === 0 ? "active" : ""}`}
            key={key}
          >
            <svg
              className="bd-placeholder-img"
              width="100%"
              height="100%"
              xmlnsXlink="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect
                width="100%"
                height="100%"
                fill="var(--bs-secondary-color)"
              ></rect>
            </svg>
            <div className="container">
              <div className="carousel-caption">
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <p>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="btn btn-lg btn-primary"
                  >
                    Delete
                  </button>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

function handleDelete(id) {
  // Handle the delete action
  console.log(`Delete post with id: ${id}`);
}
