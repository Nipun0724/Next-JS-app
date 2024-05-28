"use client";
import { useState } from "react";
import axios from "axios";

export default function Add() {
  const [input, setInput] = useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/add", input);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          id="title"
          value={input.name}
        />
        <textarea
          name="content"
          onChange={handleChange}
          id="content"
          value={input.content}
        ></textarea>
        <input type="submit" value="Submit" />
      </form>
    </main>
  );
}
