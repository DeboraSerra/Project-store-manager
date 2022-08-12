import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SHome = styled.section`
  width: 90%;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 500px;
`

export const SHomeTitle = styled.h2`
  font-size: 3rem;
  font-weight: 600;
`;

export const SHomeP = styled.p`
  font-size: 2rem;
`

export const SHomeSect = styled.section`
  display: flex;
  width: 50%;
  justify-content: space-between
`

export const SHomeSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 12px;
`

export const SLink = styled(Link)`
color: black;
text-decoration: none;
font-size: 1.3rem;
padding: 12px 12px 6px;

&:hover {
  opacity: 0.8;
}

&:active {
  color: var(--accent);
}
`;
