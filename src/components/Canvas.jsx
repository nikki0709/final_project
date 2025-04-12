import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useDrop } from 'react-dnd';
import html2canvas from 'html2canvas';

const CanvasContainer = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: relative;
  min-height: 400px;
  max-width: 800px;
  margin: 0 auto;
`;

const CanvasArea = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  background-color: #fafafa;
  border: 2px dashed ${props => props.isOver ? '#007bff' : '#ccc'};
  border-radius: 4px;
  overflow: hidden;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ShapeItem = styled.div`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  transition: transform 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

function Canvas({ testData, setTestData, onTestComplete }) {
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'SHAPE',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = canvasRef.current.getBoundingClientRect();
      
      const newShape = {
        ...item,
        id: `${item.type}-${Date.now()}`,
        position: {
          x: offset.x - canvasRect.left - (item.width / 2),
          y: offset.y - canvasRect.top - (item.height / 2)
        }
      };
      
      setShapes(prev => [...prev, newShape]);
      
      // Update test data
      setTestData(prev => ({
        ...prev,
        [item.type]: [...(prev[item.type] || []), newShape]
      }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }), []);

  const handleSave = async () => {
    if (canvasRef.current) {
      const canvas = await html2canvas(canvasRef.current);
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'htp-test.png';
      link.click();
    }
  };

  const handleComplete = () => {
    onTestComplete();
  };

  return (
    <CanvasContainer>
      <CanvasArea 
        ref={drop}
        isOver={isOver}
      >
        {shapes.map((shape) => (
          <ShapeItem
            key={shape.id}
            x={shape.position.x}
            y={shape.position.y}
            width={shape.width}
            height={shape.height}
          >
            <img src={shape.image} alt={shape.type} />
          </ShapeItem>
        ))}
      </CanvasArea>
      <Controls>
        <Button onClick={handleSave}>Save as Image</Button>
        <Button 
          onClick={handleComplete}
          disabled={shapes.length === 0}
        >
          Complete Test
        </Button>
      </Controls>
    </CanvasContainer>
  );
}

export default Canvas; 