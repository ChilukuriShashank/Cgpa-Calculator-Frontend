import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Viewall.css';
import { Link, useNavigate } from 'react-router-dom';

const Viewall = () => {
  const [passcode, setPasscode] = useState('');
  const [isPasscodeCorrect, setIsPasscodeCorrect] = useState(false);
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if passcode is correct when component mounts
    if (isPasscodeCorrect) {
      fetchCourses();
    }
  }, [isPasscodeCorrect]);

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  };

  const handlePasscodeSubmit = () => {
    // You should replace '1234' with your actual passcode
    if (passcode === '5320') {
      setIsPasscodeCorrect(true);
    } else {
      setMessage('Incorrect passcode. Please try again.');
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getall');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setMessage('Error fetching courses. Please try again later.');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updatecourse/${id}`); // Navigate to the update course page with the course ID
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setMessage('Course deleted successfully');
      fetchCourses(); // Refresh course list after deletion
    } catch (error) {
      console.error('Error deleting course:', error);
      setMessage('Error deleting course. Please try again later.');
    }
  };

  const toggleDetails = (courseId) => {
    setDetailsVisible(prevState => ({
      ...prevState,
      [courseId]: !prevState[courseId]
    }));
  };

  return (
    <div className="view-all-container">
      {!isPasscodeCorrect ? (
        <div className="passcode-container">
          <h2>Enter Passcode</h2>
          <input
            type="password"
            value={passcode}
            onChange={handlePasscodeChange}
            placeholder="Enter passcode"
          />
          <button onClick={handlePasscodeSubmit}>Submit</button>
          {message && <p className="message">{message}</p>}
        </div>
      ) : (
        <>
          <Link to="/createcourse">
            <button className="create-new-course-btn">Create New Course</button>
          </Link>
          <Link to="/">
            <button className="home-btn">Go to Home Page</button>
          </Link>
          {message && <p className="message">{message}</p>}
          <div className="courses-list">
            {courses.map((course) => (
              <div className="course-item" key={course._id}>
                <h3>{course.title}</h3>
                <p>Year: {course.year}</p>
                <p>Semester: {course.semester}</p>
                <p>Type: {course.Type}</p>
                {detailsVisible[course._id] && (
                  <div className="course-details">
                    {course.courses && course.courses.map((courseDetail, index) => (
                      <div key={index}>
                        <p>{courseDetail.name} - Credits: {courseDetail.credits}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="buttons-container">
                  <button className="update-btn" onClick={() => handleUpdate(course._id)}>Update</button>
                  <button className="delete-btn" onClick={() => handleDelete(course._id)}>Delete</button>
                  <button className="details-btn" onClick={() => toggleDetails(course._id)}>
                    {detailsVisible[course._id] ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Viewall;
