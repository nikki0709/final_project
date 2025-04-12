import styled from '@emotion/styled';
import { useState } from 'react';
import ShapeCategory from './ShapeCategory';

// Import roof images
const roof1 = new URL('../assets/shapes/roof1.PNG', import.meta.url).href;
const roof2 = new URL('../assets/shapes/roof2.PNG', import.meta.url).href;
const roof3 = new URL('../assets/shapes/roof3.PNG', import.meta.url).href;
const roof4 = new URL('../assets/shapes/roof4.PNG', import.meta.url).href;

// Import wall images
const wall1 = new URL('../assets/shapes/wall1.PNG', import.meta.url).href;
const wall2 = new URL('../assets/shapes/wall2.PNG', import.meta.url).href;
const wall3 = new URL('../assets/shapes/wall3.PNG', import.meta.url).href;
const wall4 = new URL('../assets/shapes/wall4.PNG', import.meta.url).href;

// Import door images
const door1 = new URL('../assets/shapes/door1.PNG', import.meta.url).href;
const door2 = new URL('../assets/shapes/door2.PNG', import.meta.url).href;
const door3 = new URL('../assets/shapes/door3.PNG', import.meta.url).href;
const door4 = new URL('../assets/shapes/door4.PNG', import.meta.url).href;

// Import window images
const window1 = new URL('../assets/shapes/window1.PNG', import.meta.url).href;
const window2 = new URL('../assets/shapes/window2.PNG', import.meta.url).href;
const window3 = new URL('../assets/shapes/window3.PNG', import.meta.url).href;
const window4 = new URL('../assets/shapes/window4.PNG', import.meta.url).href;

// Import trunk images
const trunk1 = new URL('../assets/shapes/trunk1.PNG', import.meta.url).href;
const trunk2 = new URL('../assets/shapes/trunk2.PNG', import.meta.url).href;
const trunk3 = new URL('../assets/shapes/trunk3.PNG', import.meta.url).href;
const trunk4 = new URL('../assets/shapes/trunk4.PNG', import.meta.url).href;

// Import crown images
const crown1 = new URL('../assets/shapes/crown1.PNG', import.meta.url).href;
const crown2 = new URL('../assets/shapes/crown2.PNG', import.meta.url).href;
const crown3 = new URL('../assets/shapes/crown3.PNG', import.meta.url).href;
const crown4 = new URL('../assets/shapes/crown4.PNG', import.meta.url).href;

// Import male images
const male1 = new URL('../assets/shapes/male1.PNG', import.meta.url).href;
const male2 = new URL('../assets/shapes/male2.PNG', import.meta.url).href;
const male3 = new URL('../assets/shapes/male3.PNG', import.meta.url).href;
const male4 = new URL('../assets/shapes/male4.PNG', import.meta.url).href;

// Import female images
const female1 = new URL('../assets/shapes/female1.PNG', import.meta.url).href;
const female2 = new URL('../assets/shapes/female2.PNG', import.meta.url).href;
const female3 = new URL('../assets/shapes/female3.PNG', import.meta.url).href;
const female4 = new URL('../assets/shapes/female4.PNG', import.meta.url).href;

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

const CategoryTabs = styled.div`
  display: flex;
  gap: 5px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

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

const categories = {
  house: [
    { id: 'roof', title: 'Roof', shapes: [
      { id: 'roof1', type: 'roof', image: roof1, width: 100, height: 60 },
      { id: 'roof2', type: 'roof', image: roof2, width: 100, height: 60 },
      { id: 'roof3', type: 'roof', image: roof3, width: 100, height: 60 },
      { id: 'roof4', type: 'roof', image: roof4, width: 100, height: 60 },
    ]},
    { id: 'wall', title: 'Wall', shapes: [
      { id: 'wall1', type: 'wall', image: wall1, width: 100, height: 100 },
      { id: 'wall2', type: 'wall', image: wall2, width: 100, height: 100 },
      { id: 'wall3', type: 'wall', image: wall3, width: 100, height: 100 },
      { id: 'wall4', type: 'wall', image: wall4, width: 100, height: 100 },
    ]},
    { id: 'door', title: 'Door', shapes: [
      { id: 'door1', type: 'door', image: door1, width: 60, height: 100 },
      { id: 'door2', type: 'door', image: door2, width: 60, height: 100 },
      { id: 'door3', type: 'door', image: door3, width: 60, height: 100 },
      { id: 'door4', type: 'door', image: door4, width: 60, height: 100 },
    ]},
    { id: 'window', title: 'Window', shapes: [
      { id: 'window1', type: 'window', image: window1, width: 60, height: 60 },
      { id: 'window2', type: 'window', image: window2, width: 60, height: 60 },
      { id: 'window3', type: 'window', image: window3, width: 60, height: 60 },
      { id: 'window4', type: 'window', image: window4, width: 60, height: 60 },
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

function ShapeLibrary() {
  const [activeCategory, setActiveCategory] = useState('house');
  const [expandedItem, setExpandedItem] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setExpandedItem(null);
  };

  const handleItemClick = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  return (
    <LibraryContainer>
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

      {categories[activeCategory].map((item) => (
        <ShapeCategory
          key={item.id}
          item={item}
          isExpanded={expandedItem === item.id}
          onToggle={() => handleItemClick(item.id)}
        />
      ))}
    </LibraryContainer>
  );
}

export default ShapeLibrary; 