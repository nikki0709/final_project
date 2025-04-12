import React, { useState } from 'react';
import styled from '@emotion/styled';
import Header from './components/Header';
import Canvas from './components/Canvas';
import ShapeLibrary from './components/ShapeLibrary';
import About from './components/About';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const MainContent = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

function App() {
  const [shapes, setShapes] = useState([]);
  const [showAbout, setShowAbout] = useState(false);

  const handleShapeAdd = (shape) => {
    // Remove any existing shape of the same type/category
    const existingShapeIndex = shapes.findIndex(s => s.type === shape.type);
    
    if (existingShapeIndex !== -1) {
      // Replace the existing shape with the new one
      const newShapes = [...shapes];
      newShapes[existingShapeIndex] = {
        ...shape,
        id: `${shape.type}-${Date.now()}`, // Ensure unique ID
      };
      setShapes(newShapes);
    } else {
      // Add new shape if none exists of this type
      const newShape = {
        ...shape,
        id: `${shape.type}-${Date.now()}`, // Ensure unique ID
      };
      setShapes([...shapes, newShape]);
    }
  };

  const handleShapeMove = (shapeId, newPosition) => {
    setShapes(shapes.map(shape => 
      shape.id === shapeId 
        ? { ...shape, position: newPosition }
        : shape
    ));
  };

  const handleShapeResize = (shapeId, updates) => {
    setShapes(shapes.map(shape =>
      shape.id === shapeId
        ? {
            ...shape,
            width: updates.width,
            height: updates.height,
            position: updates.position
          }
        : shape
    ));
  };

  const handleShapeDelete = (shapeId) => {
    const shapeToDelete = shapes.find(s => s.id === shapeId);
    if (shapeToDelete) {
      setShapes(shapes.filter(shape => shape.id !== shapeId));
    }
  };

  return (
    <AppContainer>
      <Header onAboutClick={() => setShowAbout(true)} />
      <MainContent>
        <ShapeLibrary onShapeAdd={handleShapeAdd} />
        <Canvas 
          shapes={shapes}
          onShapeMove={handleShapeMove}
          onShapeResize={handleShapeResize}
          onShapeDelete={handleShapeDelete}
        />
      </MainContent>
      {showAbout && (
        <About onClose={() => setShowAbout(false)} />
      )}
    </AppContainer>
  );
}

export default App;
