# House-Tree-Person (HTP) Test Web Application

An interactive web application that allows users to take the House-Tree-Person Test using a drag-and-drop interface. Users can assemble a house, tree, and person from pre-designed shapes and elements, and receive an AI-generated psychological interpretation of their arrangement.

## Features

- Drag-and-drop interface for creating house, tree, and person drawings
- Pre-designed shapes and elements for customization
- AI-powered psychological interpretation
- Save and share functionality
- Responsive design for both desktop and mobile devices
- Educational about section explaining the HTP test

## Technologies Used

- React.js
- TypeScript
- React DnD for drag-and-drop functionality
- Emotion for styled components
- HTML2Canvas for image export
- Vite for build tooling

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

## Usage

1. Click on "Take Test" to start the HTP test
2. Drag and drop shapes from the shape library to create your house, tree, and person
3. Arrange the elements as desired
4. Click "Complete Test" to receive your AI-generated interpretation
5. Save your drawing as an image or share it with others

## Project Structure

```
src/
  ├── components/         # React components
  │   ├── About.jsx      # About page component
  │   ├── Canvas.jsx     # Drawing canvas component
  │   ├── Header.jsx     # Navigation header
  │   └── ShapeLibrary.jsx # Draggable shapes library
  ├── assets/            # Static assets
  │   └── shapes/        # Shape images and SVGs
  ├── hooks/             # Custom React hooks
  ├── utils/             # Utility functions
  ├── context/           # React context
  ├── App.jsx            # Main application component
  └── main.jsx           # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- John Buck for developing the original HTP test
- The React.js community for their excellent documentation and tools
- Contributors and maintainers of all the open-source libraries used in this project
