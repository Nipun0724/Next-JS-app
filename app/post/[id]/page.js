import axios from "axios";

export default async function Post({ params }) {
  const id = params.id;
  const postJSON = await axios.get(`https://next-js-app-ruddy-ten.vercel.app/user/${id}`);
  const post = postJSON.data;
  return (
    <article class="blog-post mx-5 my-5">
      <h2 class="display-5 link-body-emphasis mb-1">{post.title}</h2>
      <p class="blog-post-meta">
        {post.createdAt} by <a href="#">{post.author.name}</a>
      </p>

      <p>{post.content}</p>
      <hr />
    </article>
  );
}
