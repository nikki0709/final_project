import React from 'react';
import female1 from '../assets/shapes/female1.PNG';

const TestImage = () => {
  return (
    <div>
      <h2>Test Image Component</h2>
      <img src={female1} alt="Test Female 1" style={{ width: '100px', height: 'auto' }} />
    </div>
  );
};

export default TestImage; 