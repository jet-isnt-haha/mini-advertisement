import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AdOperatorProvider } from "./contexts/AdOperator/AdOperatorContext";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdOperatorProvider>
        <RouterProvider router={router} />
      </AdOperatorProvider>
    </Suspense>
  );
}

export default App;
