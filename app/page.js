"use client";

import axios from "axios";
import Carousel from "../components/Carousel";
import About from "../components/About";
import Recent from "../components/Recent";
import Testimonials from "../components/Testimonials";

export default async function Home() {
  const posts = await getData();
  return (
    <>
      {posts && <Carousel posts={posts} />}
      <About />
      <div className="recent-testimonials">
        <div className="testimonials">
          <Testimonials />
        </div>
        <div className="recent">{posts && <Recent posts={posts} />}</div>
      </div>
    </>
  );
}

export async function getData() {
  try {
    const res = await axios.get("https://next-js-app-ruddy-ten.vercel.app/");
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch posts: ${err}`);
  }
}
