import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import ContentSection from '../shared/ContentSection';
import Icon from '../shared/Icon';
import NewsletterSignupForm from '../shared/NewsletterSignupForm';
import LinkButton from '../shared/LinkButton';
import { gridRepeat, below } from '../../utilities';

const Container = styled(ContentSection)``;

const StyledGrid = styled(Grid)`
  ${below.small`
    display: flex;
    flex-direction: column;
  `};
`;

const Section = styled(Cell)`
  h3 {
    color: ${({ theme }) => theme.colors.fonts.light};
  }
`;

const ConversationSection = styled(Section)`
  h3 {
    margin-bottom: 0;
    margin-top: 0;
  }

  .slack-button {
    width: 25rem;
    height: 4.4rem;
    margin-right: auto;
    margin-left: auto;

    img {
      height: 6rem;
      margin-top: -1rem;
      float: left;
    }

    p {
      margin-top: 0;
      margin-right: 1rem;
      font-size: 2rem;
    }
  }
`;

const NewsletterSection = styled(Section)`
  h3 {
    margin-bottom: 2rem;
  }

  button {
    background-color: ${({ theme }) => theme.colors.backgroundColor};

    svg {
      fill: ${({ theme }) => theme.colors.primary};

      &:hover {
        fill: ${({ theme }) => theme.colors.fonts.light};
      }
    }
  }
`;

const TreeIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
  margin: auto;

  ${below.small`
    width: 60%;
  `};
`;

const SignUp = ({ className }) => {
  return (
    <Container
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images/root_join_conversation.jpg"
    >
      <StyledGrid columns={gridRepeat.small} alignContent="center">
        <ConversationSection middle center>
          <h3>Join The Conversation</h3>
          <LinkButton
            className="slack-button"
            label="THAT Slack"
            href="https://wwww.thatslack.slack.com"
            image="./images/Slack_Mark.svg"
          />
        </ConversationSection>
        <TreeIcon
          icon="thatTrees"
          width="600"
          height="250"
          viewBoxHeight="87"
          viewBoxWidth="200"
        />
        <NewsletterSection middle center>
          <NewsletterSignupForm headerType="h3" title="Stay Up-To Date" />
        </NewsletterSection>
      </StyledGrid>
    </Container>
  );
};

export default styled(SignUp)``;
