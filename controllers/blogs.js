const blogsModel = require('../models/blogs')
const commentsModel = require('../models/comments')
exports.getAllBlogs = async function (req, res) {
  const a = await blogsModel.find()
  res.send(a)
}

exports.getBlogById = async function (req, res) {
  const id = req.body.id
  const a = await blogsModel.find({ _id: id })
  const b = await commentsModel.count({ blogId: id })
  const c = {
    blog: a,
    comment: b
  }
  res.send(c)
  console.log(a)
}

exports.updateBlog = async function (req, res) {
  const { blogId, name, blogtitle, blogdesc } = req.body; // Extract the data to update from the request body

  try {
    // Find the blog by its ID
    const blog = await blogsModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update the blog fields
    blog.name = name || blog.name;
    blog.blogtitle = blogtitle || blog.blogtitle;
    blog.blogdesc = blogdesc || blog.blogdesc;

    // Save the updated blog
    const updatedBlog = await blog.save();

    return res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};


exports.addBlog = async function (req, res) {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ message: "Data must be an array of blogs" });
    }
    // const validData = data.every(blog => blog.name && blog.blogtitle && Array.isArray(blog.blogdesc));
    // if (!validData) {
    //   return res.status(400).json({ message: "Each blog must have name, blogtitle, and blogdesc as an array" });
    // }

    const response = await blogsModel.insertMany(data);

    return res.status(200).json({
      message: "Blogs added successfully",
      data: response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

