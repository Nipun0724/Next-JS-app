"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import RedirectIfNoToken from "../../../components/RedirectIfNoToken";
import { useRouter } from "next/navigation";

export default function Add() {
  const [input, setInput] = useState({ title: "", content: "", category: "" });
  const [userId, setUserId] = useState(null);
  const router = useRouter();

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
      const decodedToken = parseJwt(token);
      setUserId(decodedToken.userId);
    } else {
      router.push("/login");
    }
  }, [router]);

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!userId) return;
    try {
      const response = await axios.post(
        `https://next-js-app-ruddy-ten.vercel.app/add/${userId}`,
        input
      );
      if (response.status === 200) {
        router.push(`/${userId}`);
      } else {
        console.error("Failed to add post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <RedirectIfNoToken>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            id="title"
            value={input.title}
            placeholder="Title"
          />
          <input
            type="text"
            name="category"
            onChange={handleChange}
            id="category"
            value={input.category}
            placeholder="Category"
          />
          <textarea
            name="content"
            onChange={handleChange}
            id="content"
            value={input.content}
            rows={10}
            placeholder="Content"
          ></textarea>
          <button className="full-width" type="submit">
            Submit
          </button>
        </form>
      </div>
    </RedirectIfNoToken>
  );
}
