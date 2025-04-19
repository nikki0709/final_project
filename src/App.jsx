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
  box-sizing: border-box;
`;

const MainContent = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  align-items: flex-start; /* Align items to the top */
  width: 100%; /* Ensure the main content takes full width of container */
  max-width: 1120px; /* Matches ShapeLibrary width (300px) + Canvas width (800px) + gap (20px) */
  margin-left: auto;
  margin-right: auto;
`;

const InterpretationSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%; /* Make it take full width of container */
  max-width: 1120px; /* Matches ShapeLibrary width (300px) + Canvas width (800px) + gap (20px) */
  box-sizing: border-box; /* Include padding in width calculation */
  margin-left: auto;
  margin-right: auto;
`;

const InterpretationTitle = styled.h3`
  color: #333;
  margin-bottom: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InterpretationText = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 16px;
  font-style: italic;
`;

const InterpretationContent = styled.div`
  margin-top: 15px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h4`
  color: #444;
  margin-bottom: 8px;
  font-size: 16px;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 10px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
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
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
        setPopupMessage("You can only add one person at a time. To switch between male and female figures, please delete the current person from the canvas first.");
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

  const handleTestComplete = async (analysisResult) => {
    setAnalysis(analysisResult);
    setIsAnalyzing(false);
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
            onAnalysisStart={() => setIsAnalyzing(true)}
            onAnalysisComplete={handleTestComplete}
          />
        </MainContent>
        <InterpretationSection>
          <InterpretationTitle>
            Interpretation
            {isAnalyzing && <LoadingSpinner />}
          </InterpretationTitle>
          {!analysis && !isAnalyzing && (
            <InterpretationText>
              This section will provide insights based on your drawing.
            </InterpretationText>
          )}
          {analysis && (
            <InterpretationContent>
              <Section>
                <SectionTitle>House Analysis</SectionTitle>
                <InterpretationText>{analysis.house}</InterpretationText>
              </Section>
              <Section>
                <SectionTitle>Tree Analysis</SectionTitle>
                <InterpretationText>{analysis.tree}</InterpretationText>
              </Section>
              <Section>
                <SectionTitle>Person Analysis</SectionTitle>
                <InterpretationText>{analysis.person}</InterpretationText>
              </Section>
              <Section>
                <SectionTitle>Overall Interpretation</SectionTitle>
                <InterpretationText>{analysis.overall}</InterpretationText>
              </Section>
            </InterpretationContent>
          )}
        </InterpretationSection>
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
