export default function Recent(props) {
  const posts = props.posts;
  const recent = posts.slice(-3);

  // Define mapping of category names to image paths
  const categoryImages = {
    Technology: '/assets/Technology.jpg',
    Business: '/assets/Business.jpg',
    Politics: '/assets/Politics.jpg',
    Science: '/assets/Science.jpg',
    Design: '/assets/Design.jpg',
    Culture: '/assets/Culture.jpg',
    Health: '/assets/Health.jpg',
    Travel: '/assets/Travel.jpg',
  };

  return (
    <div>
      <h4 className="fst-italic">Recent posts</h4>
      <ul className="list-unstyled">
        {recent.map((post, key) => (
          <li key={key}>
            <a
              className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
              href="#"
            >
              <img
                src={categoryImages[post.category] || '/assets/default.jpg'}
                alt={post.title}
                width="100%"
                height="96"
              />
              <div className="col-lg-8">
                <h6 className="mb-0">{post.title}</h6>
                <small className="text-body-secondary">{post.content}</small>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
