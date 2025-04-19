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
          <SectionTitle>How Our Analysis Works</SectionTitle>
          <Paragraph>
            Our interactive version analyzes your drawing based on several key factors:
          </Paragraph>
          <List>
            <li><strong>Element Placement:</strong> The position of each element (left, right, top, bottom, or center) 
            provides insights about time orientation, aspirations, and stability.</li>
            <li><strong>Size and Proportions:</strong> The size of elements can indicate their relative importance 
            and your relationship with different aspects of life.</li>
            <li><strong>Relative Positions:</strong> The proximity between elements reveals relationships between 
            different aspects of your personality and life experiences.</li>
            <li><strong>Element Choices:</strong> Your selection of specific shapes and figures reflects personal 
            preferences and perspectives.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Understanding the Elements</SectionTitle>
          <Paragraph>
            <strong>House:</strong> Represents your self-image and family relationships. Elements like doors and 
            windows reflect your openness to connections and experiences, while the roof and walls symbolize 
            protection and boundaries.
          </Paragraph>
          <Paragraph>
            <strong>Tree:</strong> Symbolizes growth, strength, and life experiences. The trunk represents your 
            core stability, while the crown reflects your aspirations and personal growth.
          </Paragraph>
          <Paragraph>
            <strong>Person:</strong> Represents your self-image and how you relate to others. The placement and 
            type of figure can reveal aspects of your personality and social interactions.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Interpretation Guidelines</SectionTitle>
          <List>
            <li><strong>Left Placement:</strong> Often associated with the past and established patterns</li>
            <li><strong>Right Placement:</strong> Typically indicates future orientation and goals</li>
            <li><strong>Top Placement:</strong> May suggest aspirations and idealism</li>
            <li><strong>Bottom Placement:</strong> Often represents groundedness and stability</li>
            <li><strong>Central Placement:</strong> Usually indicates present focus and balance</li>
            <li><strong>Proximity:</strong> Close placement of elements suggests strong connections between different aspects of life</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Using This Tool</SectionTitle>
          <Paragraph>
            To get the most meaningful interpretation:
          </Paragraph>
          <List>
            <li>Take your time to consider the placement of each element</li>
            <li>Trust your intuitive choices about size and position</li>
            <li>Complete all three elements (house, tree, and person)</li>
            <li>Consider how the elements relate to each other in your composition</li>
          </List>
        </Section>

        <Disclaimer>
          <strong>Important Note:</strong> This is an educational and self-reflection tool. The interpretations 
          provided are based on general psychological principles but should not be considered as professional 
          psychological evaluation. If you have concerns about your mental health, please consult with a qualified 
          mental health professional.
        </Disclaimer>
      </AboutContainer>
    </Overlay>
  );
}

export default About; 