
// // Helper function to calculate aggregated stats
// const getAggregatedData = async (filters: any) => {
//     const results = await Result.find({
//         ...filters,
//     }).sort({ aggregatedCgpa: -1 });

//     const totalStudents = results.length;
//     if (totalStudents === 0) return null;

//     const totalCGPA = results.reduce((sum, result) => sum + result.aggregatedCgpa, 0);
//     const meanCGPA = totalCGPA / totalStudents;
//     const medianCGPA = results[Math.floor((totalStudents - 1) / 2)].aggregatedCgpa;
//     const modeCGPA = (3 * medianCGPA) - (2 * meanCGPA);

//     return {
//         MEAN: meanCGPA,
//         MEDIAN: medianCGPA,
//         MODE: modeCGPA
//     };
// };

// // Define filters for different groupings
// const universityFilters = {
//     university: result.university,
//     graduationYear: result.graduationYear
// };

// const collegeFilters = {
//     ...universityFilters,
//     college: result.college
// };

// const courseFilters = {
//     ...collegeFilters,
//     course: result.course
// };

// const majorFilters = {
//     ...courseFilters,
//     major: result.major
// };

// // Get aggregated stats for course and major
// const [COURSE_DATA, MAJOR_DATA] = await Promise.all([
//     getAggregatedData(courseFilters),
//     getAggregatedData(majorFilters)
// ]);
