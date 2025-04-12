import styled from '@emotion/styled';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
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

const Disclaimer = styled.div`
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  color: #856404;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
`;

function About() {
  return (
    <AboutContainer>
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
          In this interactive version of the test, you'll be able to create your drawings using a drag-and-drop 
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
        <ul>
          <li>Create your drawings using a variety of pre-designed elements</li>
          <li>Save your completed test as an image</li>
          <li>Receive an AI-generated interpretation of your drawings</li>
          <li>Share your results with others</li>
        </ul>
      </Section>

      <Disclaimer>
        <strong>Important Disclaimer:</strong> This is not a professional psychological evaluation. 
        The interpretations provided are for entertainment and self-reflection purposes only. If you 
        have concerns about your mental health, please consult with a qualified mental health professional.
      </Disclaimer>
    </AboutContainer>
  );
}

export default About; 