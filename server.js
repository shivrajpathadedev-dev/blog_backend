
const Blog = require('./models/blog.model');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = 4000;
const blogs = [
    {
        userId: '1',
        title: 'Node.js',
        body: 'Node.js is an open-source, corss-platform JavaScript runtime environment that allows you to run JavaScript code outside the browser. It is built on Google',
        author:'Shiv',
        createdAt: 212423768,
        updatedAt: null
    },
    {
        userId: '2',
        title: 'Angular',
        body: 'Angular is a front-end framework developed by Google. We use it to build dynamic and single-page web applications.',
        author:'Rohit',
        createdAt: 212423768,
        updatedAt: null

    },

     {
        userId: '3',
        title: 'Express.js',
        body: 'Express.js is a backend framework for Node.js.',
        author:'Arjun',
        createdAt: 212423768,
        updatedAt: null

    },

     {
        userId: '4',
        title: 'Mongo.db',
        body: 'MongoDB stores data in documents, similar to JSON objects.',
        author:'Gajanan',
        createdAt: 212423768,
        updatedAt: null

    }
]
const express = require('express');

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully');
    })
    .catch((error) => {
        console.log('MongoDB Connection Error:', error.message);
    });

app.use(cors({
    origin: [`http://127.0.0.1:5500`, 'https://http-blog2.vercel.app', 'https://frontend-seven-delta-85.vercel.app','https://blog-backend-bbg2.onrender.com','https://http-blogs.vercel.app','http://localhost:4200'],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))
app.use(express.json())
    
//GET API
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();

        res.status(200).json({
            success: true,
            data: blogs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching Blogs!!',
            error: error.message
        });
    }
});

// GET BLOG BY ID
app.get('/blogs/:id', async (req, res) => {
    try {
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: `Blog with id ${blogId} is not found`
            });
        }

        res.status(200).json({
            success: true,
            data: blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching Blog!!',
            error: error.message
        });
    }
});

// POST API
// POST API - Save blog in MongoDB
app.post('/blogs', async (req, res) => {
    try {
        const { title, body, author } = req.body;

        if (!title || !body || !author) {
            return res.status(400).json({
                success: false,
                message: 'Title, body and author are Required!!!'
            });
        }

        const newBlog = await Blog.create({
            title,
            body,
            author
        });

        res.status(201).json({
            success: true,
            data: newBlog,
            message: 'Blog created successfully!!'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating Blog!!',
            error: error.message
        });
    }
});

// UPDATE BLOG API
app.patch('/blogs/:id', async (req, res) => {
    try {
        const blogId = req.params.id;

        const { title, body, author } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {
                ...req.body,
                updatedAt: Date.now()
            },
            {
                new: true,          // updated data return करेल
                runValidators: true // schema validation check करेल
            }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                success: false,
                message: `Blog with id ${blogId} is not found!`
            });
        }

        res.status(200).json({
            success: true,
            message: `Blog updated successfully!`,
            data: updatedBlog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating Blog!!',
            error: error.message
        });
    }
});

// DELETE BLOG API
app.delete('/blogs/:id', async (req, res) => {
    try {
        const blogId = req.params.id;

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return res.status(404).json({
                success: false,
                message: `Blog with id ${blogId} is not found!`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully!',
            data: deletedBlog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting Blog!!',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})