import styled from 'styled-components';
import { SHome, SHomeP, SHomeSect, SHomeSubtitle, SHomeTitle, SLink } from './Home';
import { SHeader, SNav, SNavLi, SNavLink } from './Header';

const SH2 = styled.h2`
  font-size: 2rem;
`;

const SMain = styled.section`
  width: 90%;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 500px;
`;

const SP = styled.p`
  font-size: 1.5rem;
`;

const SCard = styled.section`
  padding: 12px;
  width: 150px;
  text-align: center;
  height: 150px;
  margin: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary);
  border-radius: 8px;
`;

const SCardsSect = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 12px 0;
  width: 100%;
`;

export { SHeader, SHome, SHomeP, SHomeSect, SHomeSubtitle, SHomeTitle, SLink,
  SNav, SNavLi, SNavLink, SH2, SMain, SP, SCard, SCardsSect };
