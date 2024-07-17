import axios from "axios";
import Link from "next/link";

export default async function Category({ params }) {
  const { tag } = params;
  let posts = [];

  try {
    const response = await axios.get(`https://next-js-app-ruddy-ten.vercel.app/category/${tag}`);
    posts = response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <>
      <div className="post-container">
        {posts.map((post, key) => (
          <div className="col-span-1" key={key}>
            <div className="post border rounded overflow-hidden shadow-md">
              <div className="p-4">
                <strong className="block mb-2 text-primary-emphasis">
                  {tag}
                </strong>
                <h3 className="mb-2">{post.title}</h3>
                <div className="mb-2 text-sm text-body-secondary">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <p className="content mb-4">{post.content}</p>
                <Link
                  href={`/post/${post.id}`}
                  className="inline-block text-sm font-medium text-primary-emphasis hover:text-primary-emphasis-dark"
                >
                  Continue reading
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
