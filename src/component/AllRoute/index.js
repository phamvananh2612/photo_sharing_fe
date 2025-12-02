import { useRoutes, useLocation } from "react-router-dom";
import routes from "../../routes";
import { AnimatePresence } from "framer-motion";
import React from "react";

const AllRoute = () => {
  const location = useLocation();
  const elements = useRoutes(routes, location);
  return (
    <>
      <AnimatePresence mode="wait">
        {elements && React.cloneElement(elements, { key: location.pathname })}
      </AnimatePresence>
    </>
  );
};
export default AllRoute;
