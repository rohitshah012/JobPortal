import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    const userId = req.id;

    if (
        !title ||
        !description ||
        !requirements ||
        salary === undefined ||
        salary === "" ||
        !location ||
        !jobType ||
        experience === undefined ||
        experience === "" ||
        position === undefined ||
        position === "" ||
        !companyId
    ) {
        return res.status(400).json({
            message: "Something is missing.",
            success: false
        })
    };

    const salaryNumber = Number(salary);
    const experienceNumber = Number(experience);
    const positionNumber = Number(position);

    if (!Number.isFinite(salaryNumber) || salaryNumber <= 0) {
        return res.status(400).json({
            message: "Salary must be a valid number.",
            success: false
        });
    }

    if (!Number.isFinite(experienceNumber) || experienceNumber < 0) {
        return res.status(400).json({
            message: "Experience must be a valid number.",
            success: false
        });
    }

    if (!Number.isInteger(positionNumber) || positionNumber <= 0) {
        return res.status(400).json({
            message: "Position must be a valid whole number.",
            success: false
        });
    }

    const requirementsList = Array.isArray(requirements) && requirements.every((requirement) => typeof requirement === "string")
        ? requirements
        : typeof requirements === "string"
            ? requirements.split(",")
            : null;
    if (!requirementsList) {
        return res.status(400).json({
            message: "Requirements must be provided as a list or comma-separated text.",
            success: false
        });
    }

    const job = await Job.create({
        title,
        description,
        requirements: requirementsList.map((requirement) => requirement.trim()).filter(Boolean),
        salary: salaryNumber,
        location,
        jobType,
        experienceLevel: experienceNumber,
        position: positionNumber,
        company: companyId,
        created_by: userId
    });
    return res.status(201).json({
        message: "New job created successfully.",
        job,
        success: true
    });
}
// student k liye
export const getAllJobs = async (req, res) => {
    const keyword = typeof req.query.keyword === "string"
        ? req.query.keyword.trim().slice(0, 100)
        : "";
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchPattern = new RegExp(escapedKeyword, "i");
    const query = keyword ? {
        $or: [
            { title: searchPattern },
            { description: searchPattern },
        ]
    } : {};
    const jobs = await Job.find(query).populate({
        path: "company"
    }).sort({ createdAt: -1 });
    return res.status(200).json({
        jobs,
        success: true
    })
}
// student
export const getJobById = async (req, res) => {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
        path:"applications"
    });
    if (!job) {
        return res.status(404).json({
            message: "Jobs not found.",
            success: false
        })
    };
    return res.status(200).json({ job, success: true });
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
        path:'company'
    }).sort({ createdAt: -1 });
    return res.status(200).json({
        jobs,
        success: true
    })
}

export const updateJob = async (req, res) => {
    const jobId = req.params.id;
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (requirements) updateData.requirements = typeof requirements === "string" ? requirements.split(",").map(r => r.trim()).filter(Boolean) : requirements;
    if (salary !== undefined && salary !== "") updateData.salary = Number(salary);
    if (location) updateData.location = location;
    if (jobType) updateData.jobType = jobType;
    if (experience !== undefined && experience !== "") updateData.experienceLevel = Number(experience);
    if (position !== undefined && position !== "") updateData.position = Number(position);
    if (companyId) updateData.company = companyId;

    const job = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
    if (!job) {
        return res.status(404).json({
            message: "Job not found.",
            success: false
        });
    }

    return res.status(200).json({
        message: "Job updated successfully.",
        job,
        success: true
    });
};

export const deleteJob = async (req, res) => {
    const jobId = req.params.id;
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
        return res.status(404).json({
            message: "Job not found.",
            success: false
        });
    }
    return res.status(200).json({
        message: "Job deleted successfully.",
        success: true
    });
};
