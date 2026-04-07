import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  /* Garante que o contêiner não amassa o conteúdo */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.4rem 0;
`;

const Img = styled.img`
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 12rem;
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-dark.png" alt="Muniz Imóveis Logo" />
    </StyledLogo>
  );
}

export default Logo;
