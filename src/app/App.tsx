import { RouterProvider } from "react-router-dom"

import { router } from "@/routes/router"

/**
 * Composition root. Toda la navegación vive en src/routes/router.tsx.
 */
function App() {
  return <RouterProvider router={router} />
}
export default App
