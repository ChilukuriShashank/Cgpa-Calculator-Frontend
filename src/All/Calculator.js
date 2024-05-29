import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
import '../CSS/Calculator.css';

const Calculator = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [studentDetails, setStudentDetails] = useState({
    sname: '',
    year: '',
    semester: '',
    Type: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://cgpacalculator-backend.vercel.app/createstudent', studentDetails);
      console.log(response.data);
      setMessage('Student created successfully');
      // Navigate to the CalculatorPage with the created student's ID
      navigate(`/calculator/${response.data._id}`);
    } catch (error) {
      console.error('Error creating student:', error);
      setMessage('Failed to create student');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  

  return (
    <div className="container">
      <h1>CGPA Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="sname" value={studentDetails.sname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Year:</label>
          <input type="text" name="year" value={studentDetails.year} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Semester:</label>
          <select name="semester" value={studentDetails.semester} onChange={handleChange} required>
            <option value="">Select Semester</option>
            <option value="odd">Odd</option>
            <option value="even">Even</option>
          </select>
        </div>
        <div className="form-group">
          <label>Type:</label>
          <select name="Type" value={studentDetails.Type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="advance">Advanced</option>
            <option value="regular">Regular</option>
          </select>
        </div>
        <button type="submit">Create Student</button>
      </form>
      <p>{message}</p>
      <Link to="/">
            <button>Go to Home Page</button>
          </Link>
    </div>
  );
}

export default Calculator;
