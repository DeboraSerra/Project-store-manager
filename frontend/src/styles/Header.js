import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SHeader = styled.header`
  width: 100%;
  background-color: var(--main-darker);
  position: sticky;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 0 0;
  align-items: center;
`;

const SNav = styled.nav`
  flex-grow: 1;
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 24px;
  align-items: center;
`;

const SNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  font-size: 2rem;
  padding: 12px 12px 6px;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    color: var(--accent);
  }
`;

const SNavLi = styled.li`
  list-style: none;
  ${SNavLink}.active {
    border-bottom: 2px solid var(--accent);
  }
`

export {
  SHeader,
  SNav,
  SNavLink,
  SNavLi,
}
