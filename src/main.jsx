import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackPage from "./pages/ErrorFallbackPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallbackPage}
      onReset={() => {
        window.location.replace("/");
      }}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
