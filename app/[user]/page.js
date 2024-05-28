import axios from "axios";

export default async function User({ params }) {
  const user = params.user;
  const postsJSON = await axios.get(`http://localhost:8800/${user}`);
  const postsData = postsJSON.data;
  const posts = postsData[0].posts;
  return (
    <>
      {posts.map((post, key) => (
        <div class="col-md-6" key={key}>
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-primary-emphasis">
                {post.category}
              </strong>
              <h3 class="mb-0">{post.title}</h3>
              <div class="mb-1 text-body-secondary">{post.createdAt}</div>
              <p class="card-text mb-auto">{post.content}</p>
              <a
                href="#"
                class="icon-link gap-1 icon-link-hover stretched-link"
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
