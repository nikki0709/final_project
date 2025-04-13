import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Header from './components/Header';
import Canvas from './components/Canvas';
import ShapeLibrary from './components/ShapeLibrary';
import About from './components/About';
import SmallScreenMessage from './components/SmallScreenMessage';

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  flex: 1;
`;

const MainContent = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  align-items: flex-start; /* Align items to the top */
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
`;

const PopupButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

function App() {
  const [shapes, setShapes] = useState([]);
  const [showAbout, setShowAbout] = useState(false);
  const [currentPersonCategory, setCurrentPersonCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1110);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleShapeAdd = (shape) => {
    // Handle person figures specially
    if (shape.type === 'male' || shape.type === 'female') {
      const newCategory = shape.type === 'male' ? 'male' : 'female';
      
      // If there's already a person figure from a different category
      if (currentPersonCategory && currentPersonCategory !== newCategory) {
        setPopupMessage("Only one category is allowed at a time. Please delete the current person to switch categories.");
        setShowPopup(true);
        return;
      }

      // Update the current person category
      setCurrentPersonCategory(newCategory);

      // Remove any existing person figure
      const newShapes = shapes.filter(s => s.type !== 'male' && s.type !== 'female');
      
      // Add the new person figure
      const newShape = {
        ...shape,
        id: `${shape.type}-${Date.now()}`,
      };
      setShapes([...newShapes, newShape]);
      return;
    }

    // Handle non-person shapes as before
    const existingShapeIndex = shapes.findIndex(s => s.type === shape.type);
    
    if (existingShapeIndex !== -1) {
      const newShapes = [...shapes];
      newShapes[existingShapeIndex] = {
        ...shape,
        id: `${shape.type}-${Date.now()}`,
      };
      setShapes(newShapes);
    } else {
      const newShape = {
        ...shape,
        id: `${shape.type}-${Date.now()}`,
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
      // If deleting a person figure, reset the current person category
      if (shapeToDelete.type === 'male' || shapeToDelete.type === 'female') {
        setCurrentPersonCategory(null);
      }
      setShapes(shapes.filter(shape => shape.id !== shapeId));
    }
  };

  if (isSmallScreen) {
    return <SmallScreenMessage />;
  }

  return (
    <AppWrapper>
      <Header onAboutClick={() => setShowAbout(true)} />
      <AppContainer>
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
        {showPopup && (
          <Popup>
            <p>{popupMessage}</p>
            <PopupButton onClick={() => setShowPopup(false)}>OK</PopupButton>
          </Popup>
        )}
      </AppContainer>
    </AppWrapper>
  );
}

export default App;
