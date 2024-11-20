import React, { useState, useEffect } from "react";

function useAxiosFunction() {
  // 1. states:
  const [loadingStates, setLoadingStates] = useState({});
  const [errorStates, setErrorStates] = useState({});
  const [responseStates, setResponsesStates] = useState({});
  const [controllerStates, setControllerStates] = useState({});

  // 2. axios fetch function:
  const axiosFetch = async (key, configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;

    try {
      setLoadingStates((prev) => ({ ...prev, [key]: true }));
      const ctrl = new AbortController();
      setControllerStates((prev) => ({ ...prev, [key]: ctrl }));

      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: controllerStates[key],
      });
      setResponsesStates((prev) => ({ ...prev, [key]: res.data }));
    } catch (err) {
      setErrorStates((prev) => ({ ...prev, [key]: err.message }));
    } finally {
      setLoadingStates((prev) => ({ ...prev, [key]: false }));
    }
  };

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controllerStates[key]]);

  return [axiosFetch, loadingStates, errorStates, responseStates];
}

export default useAxiosFunction;
