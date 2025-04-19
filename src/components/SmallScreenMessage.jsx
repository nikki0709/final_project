import React from 'react';
import styled from '@emotion/styled';

// Styled component for the main message container
// Centers the message vertically and horizontally on the screen
// Uses a light background color for better readability
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
`;

// Styled component for the main message heading
// Uses a larger font size and darker color for emphasis
const Message = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

// Styled component for the secondary message text
// Provides additional instructions with a lighter color
// Limits width for better readability on larger screens
const SubMessage = styled.p`
  color: #666;
  font-size: 1rem;
  max-width: 500px;
`;

// Component that displays a message when the screen width is too small
// Informs users that the application requires a larger screen
// Provides instructions to resize the browser window
function SmallScreenMessage() {
  return (
    <MessageContainer>
      <Message>This experience is best viewed on a larger screen.</Message>
      <SubMessage>
      Please make your window wider to continue using the House-Tree-Person Test.
      </SubMessage>
    </MessageContainer>
  );
}

export default SmallScreenMessage; 