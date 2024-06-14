import { useRouter } from "next/navigation";

export default function Recent(props) {
  const router = useRouter();
  const posts = props.posts;
  const recent = posts.slice(-3);

  // Define mapping of category names to image paths
  const categoryImages = {
    Technology: "/assets/Technology.jpg",
    Business: "/assets/Business.jpg",
    Politics: "/assets/Politics.jpg",
    Science: "/assets/Science.jpg",
    Design: "/assets/Design.jpg",
    Culture: "/assets/Culture.jpg",
    Health: "/assets/Health.jpg",
    Travel: "/assets/Travel.jpg",
  };

  // Function to truncate content
  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength) + "...";
  };

  // Function to handle click and navigate to the post
  const handlePostClick = (postId) => {
    router.push(`/post/${postId}`);
  };

  return (
    <div>
      <h4 className="fst-italic">Recent posts</h4>
      <ul className="list-unstyled">
        {recent.map((post, key) => (
          <li key={key}>
            <a
              className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
              onClick={() => handlePostClick(post.id)} // Add click handler here
            >
              <img
                src={categoryImages[post.category] || "/assets/default.jpg"}
                alt={post.title}
                width="100%"
                height="96"
              />
              <div className="col-lg-8">
                <h6 className="mb-0">{post.title}</h6>
                <small className="text-body-secondary">
                  {truncateContent(post.content, 100)}{" "}
                  {/* Truncate content to 100 characters */}
                </small>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
