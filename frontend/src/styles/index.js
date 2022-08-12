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
  flex-direction: column;
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

const SListCard = styled.section`
  display: flex;
  width: 80%;
  margin: 24px auto;
  justify-content: space-around;
  background-color: var(--secondary);
  border-radius: 8px;
  padding: 32px 0;
  align-items: center;
`;

const SVerticalCards = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const SForm = styled.form`
  width: 50%;
  margin: auto;
`;

const SInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1.5rem;
  background-color: var(--secondary-light);

  &::placeholder {
    color: var(--main);
  }
`;

const SButton = styled.button`
  border: none;
  width: 200px;
  border-radius: 8px;
  background-color: var(--accent-light);
  margin: 24px;
  padding: 12px 0;
  font-size: 1.2rem;
  box-shadow: 0 0 30px gray;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    background-color: var(--secondary);
    color: var(--accent-light);
    box-shadow: 0 0 10px gray;
  }
`;

const SCheck = styled.input`
  position: absolute;
  top: 10px;
  right: 10px;
  accent-color: var(--accent);
`;

const SLabel = styled.label`
  padding: 12px;
  width: 150px;
  text-align: center;
  height: 150px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  position: relative;
  background-color: var(--secondary);
`;

const SNum = styled.input`
  width: 20%;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1.5rem;
  background-color: var(--secondary-light);

  &::placeholder {
    color: var(--main);
  }
`

export { SHeader, SHome, SHomeP, SHomeSect, SHomeSubtitle, SHomeTitle, SLink,
  SNav, SNavLi, SNavLink, SH2, SMain, SP, SCard, SCardsSect, SListCard, SVerticalCards,
  SForm, SInput, SButton, SCheck, SLabel, SNum };
