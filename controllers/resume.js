const resumeModel = require("../models/resume")

exports.getResume = async function (req, res) {
    const resume = await resumeModel.findOne({ name: "resume.pdf" });
    const pdfBuffer = Buffer.from(resume.content, "base64");
    res.setHeader(
        "Content-Disposition",
        'attachment; filename="resume.pdf"'
    );
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
}