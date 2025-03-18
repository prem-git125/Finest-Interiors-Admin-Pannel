import React, { Suspense } from "react";
import DefaultLayout from "./layout/default";
import { useRoutes, useLocation } from "react-router-dom";
import router from "./router";

const App = () => {
  const location = useLocation();
  const sideBarOmitPath = [
    '/auth/login',
    '/auth/register'
  ];

  console.log('Current Path:', location.pathname); // Debugging path

  const shouldHideSidebar = sideBarOmitPath.includes(location.pathname);

  return (
    <div>
      <DefaultLayout hideSidebar={shouldHideSidebar}>
        <Suspense fallback={<p>Loading...</p>}>
          {useRoutes(router)}
        </Suspense>
      </DefaultLayout>
    </div>
  );
};

export default App;
