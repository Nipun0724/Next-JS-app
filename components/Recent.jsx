export default function Recent(props) {
  const posts = props.posts;
  const recent = posts.slice(-3);
  return (
    <div>
      <h4 class="fst-italic">Recent posts</h4>
      <ul class="list-unstyled">
        {recent.map((post, key) => (
          <li key={key}>
            <a
              class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
              href="#"
            >
              <img
                src="https://picsum.photos/536/354"
                alt=""
                width="100%"
                height="96"
              />
              <div class="col-lg-8">
                <h6 class="mb-0">{post.title}</h6>
                <small class="text-body-secondary">{post.content}</small>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
