import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const GuestLayout = lazy(() => import("./Layouts/Guest"));
const Home = lazy(() => import("./Pages/Home"));

const SuspendPage = (element, fallback = <div>Loading...</div>) => {
  return (
    <Suspense fallback={fallback}>
      {element}
    </Suspense>
  )
}

function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<GuestLayout />}>
          <Route index element={SuspendPage(<Home />)} />
        </Route>
      </Routes>
    </>
  )
}

export default App
