import styled from '@emotion/styled';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const AboutContainer = styled.div`
  max-width: 800px;
  width: 90%;
  margin: 20px;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 5px;
  
  &:hover {
    color: #333;
  }
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
  padding-right: 40px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #444;
  margin-bottom: 15px;
`;

const Paragraph = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const List = styled.ul`
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  padding-left: 20px;

  li {
    margin-bottom: 8px;
  }
`;

const Disclaimer = styled.div`
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  color: #856404;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
`;

function About({ onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <AboutContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>About the House-Tree-Person Test</Title>
        
        <Section>
          <SectionTitle>What is the HTP Test?</SectionTitle>
          <Paragraph>
            The House-Tree-Person (HTP) test is a projective psychological test developed by John Buck in 1948. 
            It is designed to assess personality traits and emotional functioning through the analysis of drawings 
            of a house, a tree, and a person.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>How Our Interactive Version Works</SectionTitle>
          <Paragraph>
            In this interactive version, you'll create your drawing using pre-designed elements. The system analyzes:
          </Paragraph>
          <List>
            <li><strong>Element Selection:</strong> Your choice of specific house, tree, and person components</li>
            <li><strong>Positioning:</strong> Where you place each element on the canvas (left, right, top, bottom, or center)</li>
            <li><strong>Size:</strong> How large or small you make each element</li>
            <li><strong>Relationships:</strong> How close or far apart you place the elements from each other</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Understanding the Analysis</SectionTitle>
          <Paragraph>
            The interpretation considers several factors:
          </Paragraph>
          <List>
            <li><strong>Left Placement:</strong> May indicate connection to past experiences and memories</li>
            <li><strong>Right Placement:</strong> Often suggests future orientation and goals</li>
            <li><strong>Top Placement:</strong> Can represent aspirations and idealism</li>
            <li><strong>Bottom Placement:</strong> Might indicate groundedness and stability</li>
            <li><strong>Central Placement:</strong> Often suggests current focus and balance</li>
            <li><strong>Element Proximity:</strong> Reveals relationships between different aspects of life</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Using This Tool</SectionTitle>
          <Paragraph>
            To get the most meaningful interpretation:
          </Paragraph>
          <List>
            <li>Take your time selecting and placing each element</li>
            <li>Consider the size and position of each component</li>
            <li>Think about how the elements relate to each other</li>
            <li>Complete all three aspects: house, tree, and person</li>
          </List>
        </Section>

        <Disclaimer>
          <strong>Important Note:</strong> This is an educational and self-reflection tool. 
          The interpretations provided are based on general psychological principles but should not 
          be considered as professional psychological evaluation. If you have concerns about your 
          mental health, please consult with a qualified mental health professional.
        </Disclaimer>
      </AboutContainer>
    </Overlay>
  );
}

export default About; 