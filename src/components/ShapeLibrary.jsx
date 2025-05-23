import styled from '@emotion/styled';
import { useState } from 'react';
import ShapeCategory from './ShapeCategory';

// Import roof images
import roof1 from '../assets/shapes/roof1.PNG';
import roof2 from '../assets/shapes/roof2.PNG';
import roof3 from '../assets/shapes/roof3.PNG';
import roof4 from '../assets/shapes/roof4.PNG';

// Import wall images
import wall1 from '../assets/shapes/wall1.PNG';
import wall2 from '../assets/shapes/wall2.PNG';
import wall3 from '../assets/shapes/wall3.PNG';
import wall4 from '../assets/shapes/wall4.PNG';

// Import door images
import door1 from '../assets/shapes/door1.PNG';
import door2 from '../assets/shapes/door2.PNG';
import door3 from '../assets/shapes/door3.PNG';
import door4 from '../assets/shapes/door4.PNG';

// Import window images
import window1 from '../assets/shapes/window1.PNG';
import window2 from '../assets/shapes/window2.PNG';
import window3 from '../assets/shapes/window3.PNG';
import window4 from '../assets/shapes/window4.PNG';

// Import trunk images
import trunk1 from '../assets/shapes/trunk1.PNG';
import trunk2 from '../assets/shapes/trunk2.PNG';
import trunk3 from '../assets/shapes/trunk3.PNG';
import trunk4 from '../assets/shapes/trunk4.PNG';

// Import crown images
import crown1 from '../assets/shapes/crown1.PNG';
import crown2 from '../assets/shapes/crown2.PNG';
import crown3 from '../assets/shapes/crown3.PNG';
import crown4 from '../assets/shapes/crown4.PNG';

// Import male images
import male1 from '../assets/shapes/male1.PNG';
import male2 from '../assets/shapes/male2.PNG';
import male3 from '../assets/shapes/male3.PNG';
import male4 from '../assets/shapes/male4.PNG';

// Import female images
import female1 from '../assets/shapes/female1.PNG';
import female2 from '../assets/shapes/female2.PNG';
import female3 from '../assets/shapes/female3.PNG';
import female4 from '../assets/shapes/female4.PNG';

// Styled component for the main library container
// Provides a fixed-width sidebar with scrolling for overflow content
const LibraryContainer = styled.div`
  width: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 600px;
  overflow-y: auto;
`;

// Styled component for the category tabs container
// Arranges category tabs in a row with a bottom border
const CategoryTabs = styled.div`
  display: flex;
  gap: 5px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

// Styled component for individual category tabs
// Changes appearance based on active state
const CategoryTab = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: ${props => props.active ? '#007bff' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: ${props => props.active ? '#0056b3' : '#e9ecef'};
  }
`;

// Data structure defining all available shapes organized by category
// Each category contains subcategories with their respective shapes
const categories = {
  house: [
    { id: 'roof', title: 'Roof', shapes: [
      { id: 'roof1', type: 'roof', image: roof1, width: 120, height: 80 },
      { id: 'roof2', type: 'roof', image: roof2, width: 120, height: 80 },
      { id: 'roof3', type: 'roof', image: roof3, width: 120, height: 80 },
      { id: 'roof4', type: 'roof', image: roof4, width: 120, height: 80 },
    ]},
    { id: 'wall', title: 'Wall', shapes: [
      { id: 'wall1', type: 'wall', image: wall1, width: 90, height: 120 },
      { id: 'wall2', type: 'wall', image: wall2, width: 90, height: 120 },
      { id: 'wall3', type: 'wall', image: wall3, width: 90, height: 120 },
      { id: 'wall4', type: 'wall', image: wall4, width: 90, height: 120 },
    ]},
    { id: 'door', title: 'Door', shapes: [
      { id: 'door1', type: 'door', image: door1, width: 20, height: 30 },
      { id: 'door2', type: 'door', image: door2, width: 20, height: 30 },
      { id: 'door3', type: 'door', image: door3, width: 20, height: 30 },
      { id: 'door4', type: 'door', image: door4, width: 20, height: 30 },
    ]},
    { id: 'window', title: 'Window', shapes: [
      { id: 'window1', type: 'window', image: window1, width: 20, height: 30 },
      { id: 'window2', type: 'window', image: window2, width: 20, height: 30 },
      { id: 'window3', type: 'window', image: window3, width: 20, height: 30 },
      { id: 'window4', type: 'window', image: window4, width: 20, height: 30 },
    ]},
  ],
  tree: [
    { id: 'trunk', title: 'Trunk', shapes: [
      { id: 'trunk1', type: 'trunk', image: trunk1, width: 40, height: 120 },
      { id: 'trunk2', type: 'trunk', image: trunk2, width: 40, height: 120 },
      { id: 'trunk3', type: 'trunk', image: trunk3, width: 40, height: 120 },
      { id: 'trunk4', type: 'trunk', image: trunk4, width: 40, height: 120 },
    ]},
    { id: 'crown', title: 'Crown', shapes: [
      { id: 'crown1', type: 'crown', image: crown1, width: 120, height: 100 },
      { id: 'crown2', type: 'crown', image: crown2, width: 120, height: 100 },
      { id: 'crown3', type: 'crown', image: crown3, width: 120, height: 100 },
      { id: 'crown4', type: 'crown', image: crown4, width: 120, height: 100 },
    ]},
  ],
  person: [
    { id: 'male', title: 'Male', shapes: [
      { id: 'male1', type: 'male', image: male1, width: 60, height: 160 },
      { id: 'male2', type: 'male', image: male2, width: 60, height: 160 },
      { id: 'male3', type: 'male', image: male3, width: 60, height: 160 },
      { id: 'male4', type: 'male', image: male4, width: 60, height: 160 },
    ]},
    { id: 'female', title: 'Female', shapes: [
      { id: 'female1', type: 'female', image: female1, width: 60, height: 160 },
      { id: 'female2', type: 'female', image: female2, width: 60, height: 160 },
      { id: 'female3', type: 'female', image: female3, width: 60, height: 160 },
      { id: 'female4', type: 'female', image: female4, width: 60, height: 160 },
    ]},
  ],
};

// Main component for the shape library
// Manages the display and selection of shapes for the HTP test
// Props:
// - onShapeAdd: Function to handle adding a shape to the canvas
function ShapeLibrary({ onShapeAdd }) {
  // State for tracking the active category (house, tree, person)
  const [activeCategory, setActiveCategory] = useState('house');
  // State for tracking which subcategory is expanded
  const [expandedItem, setExpandedItem] = useState(null);
  // State for tracking selected shapes in each subcategory
  const [selectedShapes, setSelectedShapes] = useState({});

  // Handler for category tab clicks
  // Updates the active category when a tab is clicked
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Handler for subcategory header clicks
  // Toggles the expanded state of a subcategory
  const handleItemClick = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  // Handler for shape selection
  // Manages the selection state and adds shapes to the canvas
  // Args:
  // - categoryId: ID of the subcategory containing the shape
  // - shape: The shape object being selected
  const handleShapeSelect = (categoryId, shape) => {
    // Check if this shape is already selected
    const isCurrentlySelected = selectedShapes[categoryId]?.id === shape.id;

    if (isCurrentlySelected) {
      // If clicking the same shape again, deselect it
      const newSelectedShapes = { ...selectedShapes };
      delete newSelectedShapes[categoryId];
      setSelectedShapes(newSelectedShapes);
    } else {
      // If selecting a new shape, update the selection and add to canvas
      const newSelectedShapes = {
        ...selectedShapes,
        [categoryId]: shape
      };
      setSelectedShapes(newSelectedShapes);

      // Add the shape to the canvas at a default position
      const defaultPosition = {
        x: Math.random() * 400 + 100, // Random position between 100 and 500
        y: Math.random() * 200 + 50,  // Random position between 50 and 250
      };

      onShapeAdd({ ...shape, position: defaultPosition });
    }
  };

  return (
    <LibraryContainer>
      {/* Category tabs for switching between house, tree, and person categories */}
      <CategoryTabs>
        {Object.keys(categories).map((category) => (
          <CategoryTab
            key={category}
            active={activeCategory === category}
            onClick={() => handleCategoryClick(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </CategoryTab>
        ))}
      </CategoryTabs>

      {/* Render shape categories for the active main category */}
      {categories[activeCategory].map((item) => (
        <ShapeCategory
          key={item.id}
          item={item}
          isExpanded={expandedItem === item.id}
          onToggle={() => handleItemClick(item.id)}
          selectedShape={selectedShapes[item.id]}
          onShapeSelect={(shape) => handleShapeSelect(item.id, shape)}
        />
      ))}
    </LibraryContainer>
  );
}

export default ShapeLibrary; 