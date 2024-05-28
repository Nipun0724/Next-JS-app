import axios from "axios";

export default async function Category({ params }) {
  const { tag } = params;
  let posts = [];

  try {
    const response = await axios.get(`http://localhost:8800/category/${tag}`);
    posts = response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <>
      {posts.map((post, key) => (
        <div className="col-md-6" key={key}>
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">
                {tag}
              </strong>
              <h3 className="mb-0">{post.title}</h3>
              <div className="mb-1 text-body-secondary">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <p className="card-text mb-auto">{post.content}</p>
              <a
                href="#"
                className="icon-link gap-1 icon-link-hover stretched-link"
              >
                Continue reading
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
