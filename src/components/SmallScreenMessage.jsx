import React from 'react';
import styled from '@emotion/styled';

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

const Message = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const SubMessage = styled.p`
  color: #666;
  font-size: 1rem;
  max-width: 500px;
`;

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