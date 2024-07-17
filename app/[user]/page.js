"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import RedirectIfNoToken from "../../components/RedirectIfNoToken";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Link from "next/link";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function User({ params }) {
  const router = useRouter();
  const userID = params.user;
  const [posts, setPosts] = useState([]);

  function parseJwt(token) {
    if (!token) {
      return null;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = parseJwt(token);
        if (decodedToken.userId !== userID) {
          router.push("/");
        } else {
          getPosts(); // Fetch posts only if the user ID matches
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push("/"); // Redirect if token decoding fails
      }
    } else {
      router.push("/"); // Redirect if no token is found
    }
  }, [userID, router]);

  async function getPosts() {
    try {
      const response = await axios.get(`https://next-js-app-ruddy-ten.vercel.app/${userID}`);
      const postsData = response.data;
      setPosts(postsData[0].posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  return (
    <RedirectIfNoToken>
      <div className="add-post-button">
        <Link href={`/${userID}/add`}>
          <button className="btn btn-primary">Add Post</button>
        </Link>
      </div>
      <div className="post-container">
        {posts.map((post, key) => (
          <div className="post" key={key}>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary-emphasis">
                  {post.category}
                </strong>
                <h3 className="mb-0">{post.title}</h3>
                <div className="mb-1 text-body-secondary">
                  {dayjs(post.createdAt).format("MMMM D, YYYY")}
                </div>
                <p className="card-text mb-auto">{post.content}</p>
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
    </RedirectIfNoToken>
  );
}
