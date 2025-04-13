import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDrop } from 'react-dnd';
import html2canvas from 'html2canvas';

// Fixed dimensions for the canvas
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const CanvasContainer = styled.div`
  width: ${CANVAS_WIDTH}px;
  height: ${CANVAS_HEIGHT}px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  position: relative;
  background-color: white;
  overflow: hidden;
  flex-shrink: 0; /* Prevent flexbox from shrinking the canvas */
`;

const Shape = styled.div`
  position: absolute;
  cursor: move;
  user-select: none;
  transition: transform 0.1s ease;
  
  &:hover {
    z-index: 1000;
    
    .shape-controls {
      opacity: 1;
    }
    
    .resize-handle {
      opacity: 1;
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
  }
`;

const ShapeControls = styled.div`
  position: absolute;
  top: -30px;
  right: 0;
  display: flex;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.2s ease;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 4px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DeleteButton = styled.button`
  padding: 4px 8px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: #c82333;
  }
`;

const ResizeHandle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #007bff;
  border: 1px solid white;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
  
  &.top-left { top: -5px; left: -5px; cursor: nw-resize; }
  &.top-right { top: -5px; right: -5px; cursor: ne-resize; }
  &.bottom-left { bottom: -5px; left: -5px; cursor: sw-resize; }
  &.bottom-right { bottom: -5px; right: -5px; cursor: se-resize; }
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

function Canvas({ testData, setTestData, onTestComplete, shapes = [], onShapeMove, onShapeResize, onShapeDelete }) {
  const [draggingShape, setDraggingShape] = useState(null);
  const [resizingShape, setResizingShape] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

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
      
      setTestData(prev => ({
        ...prev,
        [item.type]: [...(prev[item.type] || []), newShape]
      }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }), []);

  const handleMouseDown = (e, shape) => {
    if (e.target.classList.contains('resize-handle')) {
      const handle = e.target.dataset.handle;
      setResizingShape({ shape, handle });
      setStartSize({ width: shape.width, height: shape.height });
      setStartPos({ x: shape.position.x, y: shape.position.y });
    } else {
      const shapeElement = e.currentTarget;
      const rect = shapeElement.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setDraggingShape(shape);
    }
  };

  const handleMouseMove = (e) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();

    if (draggingShape) {
      const x = e.clientX - canvasRect.left - offset.x;
      const y = e.clientY - canvasRect.top - offset.y;

      const boundedX = Math.max(0, Math.min(x, canvasRect.width - draggingShape.width));
      const boundedY = Math.max(0, Math.min(y, canvasRect.height - draggingShape.height));

      onShapeMove(draggingShape.id, { x: boundedX, y: boundedY });
    }

    if (resizingShape) {
      const { shape, handle } = resizingShape;
      const dx = e.clientX - canvasRect.left - (startPos.x + startSize.width);
      const dy = e.clientY - canvasRect.top - (startPos.y + startSize.height);

      let newWidth = startSize.width;
      let newHeight = startSize.height;
      let newX = startPos.x;
      let newY = startPos.y;

      // Maintain aspect ratio
      const aspectRatio = startSize.width / startSize.height;

      if (handle.includes('right')) {
        newWidth = Math.max(30, startSize.width + dx);
        newHeight = newWidth / aspectRatio;
      } else if (handle.includes('left')) {
        const proposedWidth = Math.max(30, startSize.width - dx);
        newWidth = proposedWidth;
        newHeight = newWidth / aspectRatio;
        newX = startPos.x + (startSize.width - newWidth);
      }

      if (handle.includes('bottom')) {
        newHeight = Math.max(30, startSize.height + dy);
        newWidth = newHeight * aspectRatio;
      } else if (handle.includes('top')) {
        const proposedHeight = Math.max(30, startSize.height - dy);
        newHeight = proposedHeight;
        newWidth = newHeight * aspectRatio;
        newY = startPos.y + (startSize.height - newHeight);
      }

      // Ensure the shape stays within canvas bounds
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + newWidth > canvasRect.width) newWidth = canvasRect.width - newX;
      if (newY + newHeight > canvasRect.height) newHeight = canvasRect.height - newY;

      onShapeResize(shape.id, {
        width: Math.round(newWidth),
        height: Math.round(newHeight),
        position: { x: Math.round(newX), y: Math.round(newY) }
      });
    }
  };

  const handleMouseUp = () => {
    setDraggingShape(null);
    setResizingShape(null);
  };

  const handleSave = async () => {
    if (canvasRef.current) {
      setIsExporting(true);
      
      try {
        // Get the device pixel ratio to account for high DPI displays
        const pixelRatio = window.devicePixelRatio || 1;
        
        // Create a clone of the canvas element to avoid any potential issues with the original
        const canvasElement = canvasRef.current;
        
        // Use html2canvas with specific options to ensure correct scaling
        const canvas = await html2canvas(canvasElement, {
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          scale: pixelRatio, // Use device pixel ratio for high DPI displays
          useCORS: true, // Enable CORS for images
          backgroundColor: '#ffffff', // Ensure white background
          logging: false, // Disable logging
          allowTaint: true, // Allow tainted canvas
          foreignObjectRendering: false, // Disable foreignObject rendering
          removeContainer: true, // Remove temporary container after rendering
        });
        
        // Create a download link with the correct dimensions
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'htp-test.png';
        link.click();
      } catch (error) {
        console.error('Error saving canvas:', error);
      } finally {
        setIsExporting(false);
      }
    }
  };

  const handleComplete = () => {
    onTestComplete();
  };

  return (
    <CanvasContainer
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }}
    >
      {shapes.map((shape) => (
        <Shape
          key={shape.id}
          style={{
            width: shape.width + 'px',
            height: shape.height + 'px',
            left: shape.position.x + 'px',
            top: shape.position.y + 'px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseDown={(e) => handleMouseDown(e, shape)}
        >
          <img 
            src={shape.image} 
            alt={shape.type} 
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              width: 'auto',
              height: 'auto',
            }}
          />
          <ShapeControls className="shape-controls">
            <DeleteButton onClick={() => onShapeDelete(shape.id)}>
              Delete
            </DeleteButton>
          </ShapeControls>
          <ResizeHandle className="resize-handle top-left" data-handle="top-left" />
          <ResizeHandle className="resize-handle top-right" data-handle="top-right" />
          <ResizeHandle className="resize-handle bottom-left" data-handle="bottom-left" />
          <ResizeHandle className="resize-handle bottom-right" data-handle="bottom-right" />
        </Shape>
      ))}
      <Controls>
        <Button onClick={handleSave} disabled={isExporting}>
          {isExporting ? 'Saving...' : 'Save as Image'}
        </Button>
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