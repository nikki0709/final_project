# Interactive House-Tree-Person (HTP) Test

An interactive web application that allows users to take the House-Tree-Person psychological test using a modern, drag-and-drop interface. The application provides instant interpretations based on the user's drawings and element placements.

## Features

- **Interactive Drawing Interface**
  - Drag-and-drop functionality for placing elements
  - Pre-designed components for house, tree, and person
  - Resizable and repositionable elements
  - Responsive canvas that adapts to screen size

- **Position-Based Analysis**
  - Analyzes element placement (left, right, top, bottom, center)
  - Interprets relationships between elements
  - Considers size and proximity of components
  - Provides instant feedback on psychological interpretations

- **User Experience**
  - Responsive design that works on larger screens
  - Clear instructions and guidance
  - About section with detailed test information
  - Save functionality for completed drawings

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Use

1. **Start the Test**
   - Read the instructions carefully

2. **Create Your Drawing**
   - Select elements from the shape library
   - Drag and drop elements onto the canvas
   - Resize and reposition as needed
   - Place at least one element from each category (House, Tree, Person)

3. **Complete the Test**
   - Click "Complete Test" when finished
   - View your interpretation results
   - Option to save your drawing

## Technical Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Emotion (CSS-in-JS)
- **Drag and Drop**: react-dnd
- **Image Processing**: html2canvas

## Project Structure

```
src/
├── components/
│   ├── About.jsx
│   ├── Canvas.jsx
│   ├── Header.jsx
│   ├── ShapeLibrary.jsx
│   └── SmallScreenMessage.jsx
├── services/
│   └── interpretationService.js
├── App.jsx
└── main.jsx
```

## Interpretation System

The application uses a rule-based interpretation system that analyzes:

- **Element Selection**: Choice of specific house, tree, and person components
- **Positioning**: Placement on the canvas (left, right, top, bottom, center)
- **Size**: Relative size of elements
- **Relationships**: Proximity and arrangement of elements

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Based on the House-Tree-Person test developed by John Buck in 1948
- Built with modern web technologies for educational purposes
- Designed for self-reflection and personal insight

## Disclaimer

This is an educational and self-reflection tool. The interpretations provided are based on general psychological principles but should not be considered as professional psychological evaluation. If you have concerns about your mental health, please consult with a qualified mental health professional.
