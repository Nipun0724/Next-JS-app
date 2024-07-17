import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
const allowedOrigins = ['https://next-js-app-ruddy-ten.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const secretKey = "Achutham@123";

app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ userId: newUser.id }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ newUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add new user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Received username:", username);
    console.log("Received password:", password);

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

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

app.post("/add/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, category } = req.body;
    const result = await prisma.post.create({
      data: {
        title,
        content,
        published: true,
        category,
        authorId: id,
      },
    });
    res.json({ result });
  } catch (err) {
    console.error(err);
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

async function getUserPosts(id) {
  try {
    const posts = await prisma.user.findMany({
      where: { id: id },
      include: {
        posts: {
          select: {
            title: true,
            content: true,
            category: true,
            createdAt: true,
            id: true,
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

app.get("/:userID", async (req, res) => {
  const id = req.params.userID;
  const posts = await getUserPosts(id);
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
