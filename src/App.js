import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './All/Homepage.js';
import Calculator from './All/Calculator.js';
import CalculatorPage from './All/CalculatorPage.js';
import ScoreCard from './All/Scorecard.js';
import Viewall from './All/Viewall.js';
import UpdateCourse from './All/UpdateCourse.js';
import CreateCourse from './All/createcourse.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/viewallcourses" element={<Viewall />} />
          <Route exact path="/updatecourse/:id" element={<UpdateCourse />} />
          <Route exact path="/createcourse" element={<CreateCourse />} />
          <Route exact path="/calculateCGPA" element={<Calculator />} />
          <Route exact path="/calculator/:id" element={<CalculatorPage />} />
          <Route exact path="/scorecard/:id" element={<ScoreCard />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
