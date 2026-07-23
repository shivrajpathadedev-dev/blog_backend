
const cros = require('cors')
const PORT = 4000;
const blogs = [
    {
        userId: '1',
        title: 'Node.js',
        body: 'Node.js is an open-source, cross-platform JavaScript runtime environment that allows you to run JavaScript code outside the browser. It is built on Google',
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

const app = express()

app.use(express.json())
app.use(cros({
    origin: [`http://127.0.0.1:5500`,  'https://frontend-seven-delta-85.vercel.app','https://blog-backend-bbg2.onrender.com','https://http-blogs.vercel.app','http://localhost:4200'],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

    
//GET API
app.get('/blogs', (req, res) => {
    //if we have query params q=='rxjs'
    //page=1 and limit=20
    try {
        res.status(200).json({
            success: true,
            data: blogs
        })
    } catch (error) {
        res.status(500)({
            success: false,
            message: `Error fetch Blogs!!`,
            error: error.message
        })
    }
})

app.get('/blogs/:userId', (req, res) => {
    try {
        let blogId = req.params.userId;

        let blog = blogs.find(t => t.userId === blogId);

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
            message: `Error fetching Blog!!`,
            error: error.message
        });
    }
});

// POST API
app.post('/blogs', (req, res) => {
    try {

        // Get title, body and author from frontend
        let { title, body, author } = req.body;

        // Validation
        if (!title || !body || !author) {
            return res.status(400).json({
                success: false,
                message: 'Title, body and author are Required!!!'
            });
        }

        // Create new blog
        let newBlog = {
            title: title,
            body: body,
            author: author, // Added author
            userId: Date.now().toString(),
            createdAt: Date.now(),
            updatedAt: null
        };

        // Add new blog
        blogs.unshift(newBlog);

        res.status(201).json({
            success: true,
            data: newBlog,
            message: `The Blog with id ${newBlog.userId} is created Successfully!!`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error creating Blog!!`,
            error: error.message
        });
    }
});

//Update API
app.patch('/blogs/:userId', (req, res) => {

    try {
        let blogId = req.params.userId;
        const getIndex = blogs.findIndex(t => t.userId === blogId)
        if (getIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `Blog with id ${blogId} is not found.!`
            })
        }
        let { title, body } = req.body;
        if (!title || !body) {
            return res.status(400).json({
                success: false,
                message: 'Title and body are Required!!!'
            })
        }

        let updateBlog = {
            ...blogs[getIndex],
            ...req.body,
            updatedAt: Date.now()
        }

        blogs[getIndex] = updateBlog;

        res.status(200).json({
            success: true,
            message: `The blog with id ${blogId} is updated successfully!!`,
            data: updateBlog
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error fetch Blogs!!`,
            error: error.message
        })
    }
})

//Remove API
app.delete('/blogs/:userId', (req, res) => {
    try {

        let blogId = req.params.userId;
        let getIndex = blogs.findIndex(t => t.userId === blogId)
        if (getIndex == -1) {
            return res.status(400).json({
                success: false,
                message: `The blog with id ${blogId} is not found!`
            })
        }
        let blog=blogs.splice(getIndex,1)
        res.status(200).json({
            success:true,
            message:`The blog with id ${blogId} is remove successfully!`,
            data:blog
        })
  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error fetch Blogs!!`,
            error: error.message
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})