import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import prisma from "../lib/prisma.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

app.get("/", async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.post("/add", async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const result = await prisma.post.create({
      data: {
        title,
        content,
        published: true,
        author: {
          create: {
            name: "Nipun",
          },
        },
      },
    });
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: "Failed to add post" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const posts = await prisma.post.delete({
    where: { id },
  });
});

async function getPost(id) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const post = await getPost(id);
  res.json(post);
});

async function getUserPosts(username) {
  try {
    const posts = await prisma.user.findMany({
      where: { name: username },
      include: {
        posts: {
          select: {
            title: true,
            content: true,
            category: true,
            createdAt: true,
          },
        },
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

app.get("/:user", async (req, res) => {
  const user = req.params.user;
  const posts = await getUserPosts(user);
  res.json(posts);
});

async function getTagPosts(tag) {
  try {
    const posts = await prisma.post.findMany({
      where: { category: tag },
      include: {
        author: {
          select: { name: true, createdAt: true },
        },
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

app.get("/category/:tag", async (req, res) => {
  const tag = req.params.tag;
  try {
    const posts = await getTagPosts(tag);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
