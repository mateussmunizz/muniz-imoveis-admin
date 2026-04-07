import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background: linear-gradient(135deg, #0a0f1e 0%, #171e36 100%);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-800);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 28rem;
    height: 100vh;
    z-index: 999;

    transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
  }
`;

function Sidebar({ $isOpen, onClose }) {
  return (
    <StyledSidebar $isOpen={$isOpen}>
      <Logo />
      <MainNav onClose={onClose} />
    </StyledSidebar>
  );
}

export default Sidebar;
