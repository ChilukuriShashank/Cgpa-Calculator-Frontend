import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/createcourse.css'; 
import { Link } from 'react-router-dom';

const CreateCourse = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [type, setType] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCredits, setCourseCredits] = useState('');
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://cgpacalculator-backend.vercel.app/create', {
        year,
        semester,
        Type: type,
        courses
      });
      setMessage(response.data.message);
      setErrorMessage(null);
      // You can redirect or show a success message here
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setMessage(null);
    }
  };

  const handleAddCourse = () => {
    if (courseName && courseCredits) {
      setCourses([...courses, { name: courseName, credits: courseCredits }]);
      setCourseName('');
      setCourseCredits('');
    }
  };

  return (
    <div className="create-course-container">
      <h2>Create New Course List</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="semester">Semester:</label>
          <select
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          >
            <option value="">Select Semester</option>
            <option value="even">Even</option>
            <option value="odd">Odd</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="advance">Advance</option>
            <option value="regular">Regular</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseCredits">Course Credits:</label>
          <input
            type="number"
            id="courseCredits"
            value={courseCredits}
            onChange={(e) => setCourseCredits(e.target.value)}
            
          />
        </div>
        <button type="button" className="add-course-btn" onClick={handleAddCourse}>Add Course</button>
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course.name} - Credits: {course.credits}</li>
          ))}
        </ul>
        {message && <p className="message success">{message}</p>}
        {errorMessage && <p className="message error">{errorMessage}</p>}
        <button type="submit" className="submit-btn">Create Course List</button>
      </form>
      <Link to="/">
        <button className="home-btn">Go to Home Page</button>
      </Link>
    </div>
  );
};

export default CreateCourse;
