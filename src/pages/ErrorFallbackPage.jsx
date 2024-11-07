import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "../ui/Button";

const StyledErrorFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  margin: 0;
  padding: 0;
  background-color: var(--color-grey-100);
`;

const FallbackBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 30rem;
  width: 50rem;
  background-color: var(--color-grey-0);
  align-items: center;
  justify-content: center;
  padding: 3rem 4rem;
  gap: 3rem;
  border-radius: var(--border-radius-lg);
`;

const Title = styled.span`
  font-size: 2.5rem;
  font-weight: 500;
`;

const ErrorMessage = styled.span`
  font-size: 1.8rem;
  text-align: center;
`;

function ErrorFallbackPage({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <FallbackBox>
          <Title>Something Went Wrong 🧐</Title>
          <ErrorMessage>{error.message}</ErrorMessage>
          <Button type="primary" onClick={resetErrorBoundary}>
            Go to Home
          </Button>
        </FallbackBox>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallbackPage;
