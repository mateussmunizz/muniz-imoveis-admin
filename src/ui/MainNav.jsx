import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-400);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: #c4a764;
    background-color: rgba(196, 167, 100, 0.1);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #c4a764;
  }
`;

function MainNav({ onClose }) {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard" onClick={onClose}>
            <HiOutlineHome />
            <span>Início</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/contratos" onClick={onClose}>
            <HiOutlineCalendarDays />
            <span>Aluguéis</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/imoveis" onClick={onClose}>
            <HiOutlineHomeModern />
            <span>Imóveis</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/corretores" onClick={onClose}>
            <HiOutlineUsers />
            <span>Corretores</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/configuracoes" onClick={onClose}>
            <HiOutlineCog6Tooth />
            <span>Configurações</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
