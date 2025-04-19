import styled from '@emotion/styled';
import { useDrag } from 'react-dnd';

// Styled component for the category container
// Provides a bordered container with rounded corners for each shape category
const CategoryContainer = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
`;

// Styled component for the category header button
// Displays the category title and expand/collapse arrow
// Changes background color on hover for better user interaction
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

// Styled component for the grid of shapes within a category
// Uses CSS Grid to display shapes in a 2-column layout
// Handles expand/collapse animation with opacity and max-height transitions
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

// Styled component for individual shape items
// Displays a shape image with a border that changes color when selected
// Includes hover effects for better user interaction
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

// Styled component for the expand/collapse arrow
// Rotates based on the expanded state of the category
const Arrow = styled.span`
  transform: ${props => props.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s ease;
`;

// Component for rendering a clickable shape with error handling for image loading
// Props:
// - shape: The shape object containing image and type information
// - isSelected: Boolean indicating if this shape is currently selected
// - onClick: Function to handle shape selection
function ClickableShape({ shape, isSelected, onClick }) {
  // Error handler for image loading failures
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

// Main component for rendering a category of shapes with expand/collapse functionality
// Props:
// - item: Category data containing title and shapes array
// - isExpanded: Boolean indicating if the category is expanded
// - onToggle: Function to handle category expansion/collapse
// - selectedShape: Currently selected shape object
// - onShapeSelect: Function to handle shape selection
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