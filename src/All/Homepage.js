import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../CSS/Homepage.css'; // Import CSS file for styling

const Homepage = () => {
  return (
    <div>
      {/* Background with moving gradient */}
      <div className="background">
        <div className="moving-background"></div>
      </div>
      {/* Content */}
      <div className="container">
        <h1>CGPA Calculator</h1>
        <div className="buttons">
          <Link to="/viewallcourses" className="nav-link"><button>View all Courses</button></Link>
          <Link to="/calculatecgpa" className="nav-link"><button>Calculate CGPA</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
