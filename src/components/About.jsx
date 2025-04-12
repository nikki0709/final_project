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
          <SectionTitle>How It Works</SectionTitle>
          <Paragraph>
            In this interactive version of the test, you'll be able to create your drawings using a click-to-add 
            interface. You can assemble houses, trees, and people using various pre-designed elements, allowing you 
            to express yourself through your choices and arrangements.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>What Each Element Represents</SectionTitle>
          <Paragraph>
            <strong>House:</strong> Represents self-image and family relationships. The way you construct your house 
            can reveal insights about your home life and sense of security.
          </Paragraph>
          <Paragraph>
            <strong>Tree:</strong> Symbolizes growth, strength, and life experiences. The characteristics of your tree 
            can reflect your personal development and resilience.
          </Paragraph>
          <Paragraph>
            <strong>Person:</strong> Represents your self-image and how you relate to others. The details and 
            positioning of the person can reveal aspects of your personality and social interactions.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Using This Tool</SectionTitle>
          <Paragraph>
            This interactive version of the HTP test allows you to:
          </Paragraph>
          <List>
            <li>Select shapes from different categories (House, Tree, Person)</li>
            <li>Click to add elements to your drawing</li>
            <li>Resize and reposition elements as needed</li>
            <li>Save your completed test as an image</li>
          </List>
        </Section>

        <Disclaimer>
          <strong>Important Disclaimer:</strong> This is not a professional psychological evaluation. 
          The interpretations provided are for entertainment and self-reflection purposes only. If you 
          have concerns about your mental health, please consult with a qualified mental health professional.
        </Disclaimer>
      </AboutContainer>
    </Overlay>
  );
}

export default About; 