import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../CSS/updatecourse.css';

const UpdateCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [type, setType] = useState('');
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`https://cgpacalculator-backend.vercel.app/getbyid/${id}`);
      setCourse(response.data);
      setYear(response.data.year);
      setSemester(response.data.semester);
      setType(response.data.Type);
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching course:', error);
      setMessage('Error fetching course. Please try again later.');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://cgpacalculator-backend.vercel.app/update/${id}`, {
        year,
        semester,
        Type: type,
        courses
      });
      setMessage(response.data.message);
      navigate(`/viewallcourses`);
    } catch (error) {
      console.error('Error updating course:', error);
      setMessage('Error updating course. Please try again later.');
    }
  };

  const handleAddCourse = () => {
    setCourses([...courses, { name: '', credits: '' }]);
  };

  const handleCourseChange = (index, field, value) => {
    setCourses(courses.map((course, i) => 
      i === index ? { ...course, [field]: value } : course
    ));
  };

  const handleRemoveCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div className="update-course-container">
      <h2>Update Course</h2>
      <div>
        <label htmlFor="year">Year:</label>
        <input
          type="text"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="semester">Semester:</label>
        <select
          id="semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
        >
          <option value="even">Even</option>
          <option value="odd">Odd</option>
        </select>
      </div>
      <div>
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="advance">Advance</option>
          <option value="regular">Regular</option>
        </select>
      </div>
      <div>
        {courses.map((course, index) => (
          <div key={index} className="course-container">
            <div className="course-details">
              <label htmlFor={`courseName-${index}`}>Course Name:</label>
              <input
                type="text"
                id={`courseName-${index}`}
                value={course.name}
                onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
                required
              />
              <label htmlFor={`courseCredits-${index}`}>Course Credits:</label>
              <input
                type="number"
                id={`courseCredits-${index}`}
                value={course.credits}
                onChange={(e) => handleCourseChange(index, 'credits', e.target.value)}
                required
              />
            </div>
            <button className="remove-btn" onClick={() => handleRemoveCourse(index)}>Remove Course</button>
          </div>
        ))}
        <button className="add-course-btn" onClick={handleAddCourse}>Add New Course</button>
      </div>
      <button className="update-btn" onClick={handleUpdate}>Update Course</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UpdateCourse;
