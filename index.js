require('./config/db').connect();
const express = require('express');

const authRoutes = require('./routes/auth.route');
const postRoutes = require('./routes/post.route');

const port = 3000;
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/posts', postRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
