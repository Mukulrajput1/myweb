const profileModel = require("../models/profileSchema")
const projectModel = require("../models/projectSchema")
const resumeModel = require("../models/resume")
const commentsModel = require("../models/comments")
const blogsModel = require('../models/blogs')
const techSkillModel = require('../models/techSkillSchema')

exports.getAllData = async (req, res) => {
    try {
        const profile = await profileModel.find();
        const projects = await projectModel.find();
        const comments = await commentsModel.find();
        const blogs = await blogsModel.find();
        const techSkills = await techSkillModel.find();
        
        // const resume = await resumeModel.findOne({ name: "resume.pdf" });

        // if (!resume) {
        //     return res.status(404).json({ message: "Resume not found" });
        // }

        // const pdfBase64 = resume.content;
        const response = {
            data: {
                profile,
                projects,
                comments,
                blogs,
                techSkills
            },
            // pdf: pdfBase64,
        };
        const project =
            console.log(req.user)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "error" })
    }
}

