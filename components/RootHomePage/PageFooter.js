import React from 'react';
import styled from 'styled-components';
import ContentSection from '../shared/ContentSection';
import Icon from '../shared/Icon';
import { below } from '../../utilities';

const Container = styled(ContentSection)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TreeIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
  margin: 10rem 0;

  ${below.med`
    width: 60%;
  `};
`;

const PageFooter = ({ className }) => {
  return (
    <Container
      className={className}
      backgroundColor="thatBlue"
      backgroundOpacity={0.82}
      backgroundImage="/images//group.jpg"
    >
      <TreeIcon
        icon="thatTrees"
        width="300"
        height="100"
        viewBoxHeight="87"
        viewBoxWidth="200"
      />
    </Container>
  );
};

export default styled(PageFooter)``;
