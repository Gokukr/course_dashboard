const prisma = require("../models/index");

// Exported function to get course details
exports.getCourseDetails = async () => {
  try {
    const courseDetails = await prisma.performance.findMany({
      include: {
        user: {
          select: {
            id: true, // emp_id
            name: true, // employee name
          },
        },
        course: {
          select: {
            course_id: true, // course_id
            name: true, // course_name
          },
        },
      },
    });

    // Map the result to get the desired structure
    const result = courseDetails.map((detail) => ({
      emp_id: detail.user.id,
      name: detail.user.name,
      course_id: detail.course.course_id,
      course_name: detail.course.name,
      marks: {
        mark1: detail.mark1,
        mark2: detail.mark2,
      },
    }));

    return result; // Return the structured data
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw new Error("Error fetching course details"); // Throw an error to be handled by the caller
  } finally {
    await prisma.$disconnect(); // Ensure disconnection from the database
  }
};
