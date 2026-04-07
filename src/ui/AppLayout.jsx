import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import Sidebar from "./Sidebar";
import Header from "./Header";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  /* No mobile, a grade tem só 1 coluna (o conteúdo principal) */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;

  /* Ajuste de espaçamento para telas pequenas */
  @media (max-width: 768px) {
    padding: 2.4rem 1.6rem 6.4rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

// O Botão flutuante que só aparece no mobile
const MobileMenuButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 2.4rem;
    right: 2.4rem;
    z-index: 1000;
    background-color: #c4a764;
    color: #0a0f1e;
    border: none;
    border-radius: 50%;
    width: 5.6rem;
    height: 5.6rem;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: all 0.3s;
  }
`;

// A camada escura e desfocada por trás do menu
const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.$isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 998;
  }
`;

function AppLayout() {
  // Estado que controla se o menu mobile está aberto ou fechado
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <StyledAppLayout>
      <Sidebar
        $isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <Header />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>

      <Overlay
        $isOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
      </MobileMenuButton>
    </StyledAppLayout>
  );
}

export default AppLayout;
