import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../CSS/calculatorpage.css';

const CalculatorPage = () => {
  const [course, setCourse] = useState(null);
  const [receivedCourses, setReceivedCourses] = useState([]);
  const { id } = useParams();
  const [courseId, setCourseId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const studentResponse = await axios.get(`https://cgpacalculator-backend.vercel.app/getstudentbyid/${id}`);
        const student = studentResponse.data;

        const courseResponse = await axios.post('https://cgpacalculator-backend.vercel.app/getbydetails', {
          year: student.year,
          semester: student.semester,
          Type: student.Type
        });

        setCourseId(courseResponse.data._id);
        const courseData = courseResponse.data;

        setCourse(courseData);
        const initialReceivedCourses = courseData.courses.map(courseItem => ({
          name: courseItem.name,
          point: ''
        }));
        setReceivedCourses(initialReceivedCourses);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError('Failed to load course details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseById();
  }, [id]);

  const handlePointsChange = (e, index) => {
    const { value } = e.target;
    setReceivedCourses(prevCourses => {
      const updatedCourses = [...prevCourses];
      updatedCourses[index].point = value;
      return updatedCourses;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://cgpacalculator-backend.vercel.app/calculatecgpa`, {
        studentId: id,
        courseId: courseId,
        coursesReceived: receivedCourses
      });
      console.log('CGPA calculated successfully');
      navigate(`/scorecard/${id}`);
    } catch (error) {
      console.error('Error calculating CGPA:', error);
      setError('Failed to calculate CGPA. Please try again later.');
    }
  };

  return (
    <div className="calculator-page">
      {loading ? (
        <p>Loading course details...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : course ? (
        <div>
          <h1>Course Details</h1>
          <form onSubmit={handleSubmit}>
            <div className="course-details">
              <h2>{course.Type} Courses</h2>
              <div className="courses-list">
                {receivedCourses.length > 0 ? (
                  <ul>
                    {receivedCourses.map((receivedCourse, index) => (
                      <li key={index}>
                        <label htmlFor={receivedCourse.name}>{receivedCourse.name}</label>
                        <input
                          type="number"
                          id={receivedCourse.name}
                          value={receivedCourse.point}
                          onChange={(e) => handlePointsChange(e, index)}
                          required
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No courses available.</p>
                )}
              </div>
            </div>
            <button type="submit">Calculate CGPA</button>
            <Link to="/">
              <button type="button">Go to Home Page</button>
            </Link>
          </form>
        </div>
      ) : (
        <p>No course data found.</p>
      )}
    </div>
  );
};

export default CalculatorPage;
