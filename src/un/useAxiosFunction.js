import { useEffect, useState } from "react";

function useAxiosFunction() {
  // 1. create states:
  const [response, setResponse] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [ctrl, setCtrl] = useState(null);
  // 2. create axios function:
  async function axiosRequest(configObj) {
    setIsPending(true);
    const {
      axiosInstance,
      method,
      url,
      data = {},
      requestConfig = {},
    } = configObj;
    // 3. set ctrl to controler:
    const controler = new AbortController();
    setCtrl(controler);
    const res = await axiosInstance[method.toLowerCase()](url, data, {
      ...requestConfig,
      signal: controler.signal,
    });
    setResponse(res.data);
    setErrMsg(null);
    try {
    } catch (err) {
      setErrMsg(`Error: ${err.message}`);
    } finally {
      setIsPending(false);
    }
  }
  // 4. create useEffect to abort controller:
  useEffect(() => {
    return () => ctrl && ctrl.abort();
  }, [ctrl]);
  // 5. return:
  return { axiosRequest, response, isPending, errMsg };
}

export default useAxiosFunction;
