// import axios from "axios";

// const courseService = {
//   addCourse: async (courseData) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/course/add",
//         courseData
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error adding course:", error);
//       throw error; // Rethrow error so it can be handled by the caller
//     }
//   },

//   assignCourseToTrainer: async (trainerId, courseId) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/trainer/assignCourse",
//         {
//           trainerId,
//           courseId,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error assigning course to trainer:", error);
//       throw error; // Rethrow error so it can be handled by the caller
//     }
//   },
// };

// export default courseService;
