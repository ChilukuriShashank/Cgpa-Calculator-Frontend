import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../CSS/scorecard.css'; // Import the CSS file

const ScoreCard = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchStudentById = async () => {
      try {
        const st = await axios.get(`https://cgpacalculator-backend.vercel.app/getstudentbyid/${id}`);
        console.log(st.data);
        setStudent(st.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentById();
  }, [id]);

  const highlightCGPA = (cgpa) => {
    if (cgpa >= 3.5) {
      return 'high-cgpa';
    } else if (cgpa >= 3.0) {
      return 'medium-cgpa';
    } else {
      return 'low-cgpa';
    }
  };

  return (
    <div className="scorecard">
      {student ? (
        <div className="scorecard-content">
          <h2>Student Details</h2>
          <p><strong>Name:</strong> {student.sname}</p>
          <p><strong>Year:</strong> {student.year}</p>
          <p><strong>Semester:</strong> {student.semester}</p>
          <p><strong>Type:</strong> {student.Type}</p>
          <h2>Courses</h2>
          <ul className="course-list">
            {student.courses.map((course) => (
              <li key={course.course}>
                {course.course}: {course.gradePoint}
              </li>
            ))}
          </ul>
          <h2 className={`cgpa ${highlightCGPA(student.cgpa)}`}>
            CGPA: {student.cgpa.toFixed(2)} 
          </h2>
          <Link to="/">
            <button className="home-button">Go to Home Page</button>
          </Link>
        </div>
      ) : (
        <p>Loading student details...</p>
      )}
    </div>
  );
};

export default ScoreCard;
