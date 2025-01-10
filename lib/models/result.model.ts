import { Schema, model, models } from "mongoose";

// Define semester result schema once
const semesterResultSchema = new Schema({
    semesterNumber: { type: Number, required: true, min: 1 },
    credits: { type: Number, required: true, min: 0 },
    cgpa: { type: Number, required: true, min: 0, max: 10 },
    courseRank: { type: Number, min: 1 },
    majorRank: { type: Number, min: 1 },
}, { timestamps: true });

// Common validation functions
const validateYear = (year: number) => year >= 1900 && year <= new Date().getFullYear();
const validateCgpa = (cgpa: number) => cgpa >= 0 && cgpa <= 10;

// Define main result schema
const resultSchema = new Schema({
    name: { type: String, required: true, trim: true },
    rollNumber: { type: String, required: true, unique: true, trim: true },
    admissionYear: {
        type: Number,
        required: true,
        validate: validateYear
    },
    graduationYear: {
        type: Number,
        required: true,
        validate: function (this: any, year: number) {
            return year >= this.admissionYear && year <= this.admissionYear + 6;
        }
    },
    discipline: { type: String, required: true, trim: true },
    major: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    college: { type: String, default: 'DTU', required: true, trim: true },
    university: { type: String, default: 'DTU', required: true, trim: true },
    semesterResults: [semesterResultSchema],
    universityRank: { type: Number, min: 1 },
    collegeRank: { type: Number, min: 1 },
    majorRank: { type: Number, min: 1 },
    courseRank: { type: Number, min: 1 },
    aggregatedCgpa: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
        validate: validateCgpa
    }
}, {
    timestamps: true
});

// Create compound indexes for better query performance
resultSchema.index({ admissionYear: 1, course: 1 });
resultSchema.index({ major: 1, aggregatedCgpa: -1 });

// Create models only if they don't exist
const Result = models.Result || model("Result", resultSchema);
const SemesterResult = models.SemesterResult || model("SemesterResult", semesterResultSchema);

export { Result, SemesterResult };
