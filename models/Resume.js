const { url } = require('inspector');
const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    Type: String,
    Title: String,
    Employeer: String,
    City: String,
    Country: String, 
    SDate: String,
    EDate: String,
    Description: String,
})

const EducationSchema = new mongoose.Schema({
    Type: String,
    Degree: String,
    College: String,
    City: String,
    Country: String, 
    SDate: String,
    EDate: String,
    Description: String,
})

const ProjectSchema = new mongoose.Schema({
    Type: String,
    Title: String,
    Subtitle: String,
    SDate: String,
    EDate: String,
    Description: String,
})

const SkillSchema = new mongoose.Schema({
   Type: Number,
   Title: String,
   Category: String,
})

const ComponentSchema = new mongoose.Schema({
    Exp: [ExperienceSchema],
    Edu: [EducationSchema],
    Pro: [ProjectSchema],
    Skills: [SkillSchema],
})

const LinksSchema = new mongoose.Schema({
    Linkid: Number,
    Title: String,
    URL: String,
})

const ResumeSchema = new mongoose.Schema({
    FullName: String,
    EmailID: String,
    Phone: Number,
    Links: [LinksSchema],
    Components: [ComponentSchema],
  });

const Resume = mongoose.model('Resume', ResumeSchema);

module.exports = Resume;
