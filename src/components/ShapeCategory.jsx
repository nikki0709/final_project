import styled from '@emotion/styled';
import { useDrag } from 'react-dnd';

const CategoryContainer = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
`;

const CategoryHeader = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #f8f9fa;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const ShapesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: ${props => props.isExpanded ? '10px' : '0'};
  background-color: white;
  max-height: ${props => props.isExpanded ? '300px' : '0'};
  opacity: ${props => props.isExpanded ? '1' : '0'};
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  margin: ${props => props.isExpanded ? '0' : '0'};
  border-top: ${props => props.isExpanded ? '1px solid #eee' : 'none'};
`;

const ShapeItem = styled.div`
  width: 100px;
  height: 100px;
  border: 2px solid ${props => props.isSelected ? '#007bff' : '#ccc'};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${props => props.isSelected ? '#e3f2fd' : 'white'};
  padding: 10px;
  
  &:hover {
    border-color: #007bff;
    transform: scale(1.05);
    transition: all 0.2s ease;
    background-color: ${props => props.isSelected ? '#e3f2fd' : '#f8f9fa'};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
  }
`;

const Arrow = styled.span`
  transform: ${props => props.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s ease;
`;

function ClickableShape({ shape, isSelected, onClick }) {
  const handleImageError = (e) => {
    console.error(`Error loading image for ${shape.type}:`, e);
    console.log('Image source:', shape.image);
  };

  return (
    <ShapeItem
      onClick={onClick}
      isSelected={isSelected}
    >
      <img
        src={shape.image}
        alt={shape.type}
        onError={handleImageError}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </ShapeItem>
  );
}

function ShapeCategory({ item, isExpanded, onToggle, selectedShape, onShapeSelect }) {
  return (
    <CategoryContainer>
      <CategoryHeader onClick={onToggle}>
        {item.title}
        <Arrow isExpanded={isExpanded}>▼</Arrow>
      </CategoryHeader>
      <ShapesGrid isExpanded={isExpanded}>
        {item.shapes.map((shape) => (
          <ClickableShape
            key={shape.id}
            shape={shape}
            isSelected={selectedShape?.id === shape.id}
            onClick={() => onShapeSelect(shape)}
          />
        ))}
      </ShapesGrid>
    </CategoryContainer>
  );
}

export default ShapeCategory; 