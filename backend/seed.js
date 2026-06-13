import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

const seedDB = async () => {
    try {
        console.log("Connecting to MongoDB for seeding...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected successfully.");

        // Clear existing data to avoid unique constraint errors
        await Job.deleteMany({});
        await Company.deleteMany({});
        await User.deleteMany({});

        // Create a Recruiter User
        const hashedPassword = await bcrypt.hash("password123", 10);
        const recruiter = await User.create({
            fullname: "John Doe",
            email: "recruiter@jobhub.com",
            phoneNumber: 9876543210,
            password: hashedPassword,
            role: "recruiter",
        });

        console.log("Created Recruiter:", recruiter.email);

        // Create a Company
        const company = await Company.create({
            name: "Tech Solutions Inc",
            description: "Leading tech solutions.",
            website: "https://tech.com",
            location: "Mumbai",
            logo: "https://www.shutterstock.com/image-vector/tech-logo-design-vector-template-600w-1652157016.jpg",
            userId: recruiter._id
        });

        console.log("Created Company:", company.name);

        // Create Jobs
        const jobs = [
            {
                title: "Frontend Developer",
                description: "Looking for a skilled React developer for our Mumbai office.",
                requirements: ["React", "JavaScript", "Tailwind CSS"],
                salary: 35000,
                experienceLevel: 1,
                location: "Mumbai",
                jobType: "Full-time",
                position: 2,
                company: company._id,
                created_by: recruiter._id
            },
            {
                title: "Backend Developer",
                description: "Node.js developer needed in Delhi NCR.",
                requirements: ["Node.js", "Express", "MongoDB"],
                salary: 85000,
                experienceLevel: 3,
                location: "Delhi NCR",
                jobType: "Full-time",
                position: 1,
                company: company._id,
                created_by: recruiter._id
            },
            {
                title: "FullStack Developer",
                description: "Experienced FullStack developer for Bangalore headquarters.",
                requirements: ["MERN Stack", "AWS", "Docker"],
                salary: 250000,
                experienceLevel: 4,
                location: "Bangalore",
                jobType: "Full-time",
                position: 3,
                company: company._id,
                created_by: recruiter._id
            }
        ];

        await Job.insertMany(jobs);
        console.log("Database successfully seeded with 4 dummy jobs!");
        
        console.log("You can log in with Email: recruiter@jobhub.com, Password: password123");
        process.exit(0);
    } catch (error) {
        console.log("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
