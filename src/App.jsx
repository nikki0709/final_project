import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from '@emotion/styled';
import { useState } from 'react';

// Components
import Canvas from './components/Canvas';
import ShapeLibrary from './components/ShapeLibrary';
import Header from './components/Header';
import About from './components/About';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
  padding: 20px;
  gap: 20px;
`;

function App() {
  const [currentPage, setCurrentPage] = useState('test'); // 'test' or 'about'
  const [testData, setTestData] = useState({
    house: [],
    tree: [],
    person: []
  });

  const handleTestComplete = async () => {
    // TODO: Implement GenAI analysis
    console.log('Test completed:', testData);
  };

  const handleShapeAdd = (shape) => {
    setTestData(prev => ({
      ...prev,
      [shape.type]: [...(prev[shape.type] || []), shape]
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContainer>
        <Header currentPage={currentPage} onPageChange={setCurrentPage} />
        <MainContent>
          {currentPage === 'test' ? (
            <>
              <ShapeLibrary onShapeAdd={handleShapeAdd} />
              <Canvas 
                testData={testData}
                setTestData={setTestData}
                onTestComplete={handleTestComplete}
              />
            </>
          ) : (
            <About />
          )}
        </MainContent>
      </AppContainer>
    </DndProvider>
  );
}

export default App;
