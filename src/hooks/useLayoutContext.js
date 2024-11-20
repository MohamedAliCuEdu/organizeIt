import { useContext } from "react";
import LayoutContext from "../context/layoutContext";

function useLayoutContext() {
  return useContext(LayoutContext);
}

export default useLayoutContext;
