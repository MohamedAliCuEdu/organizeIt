import { useEffect, useState } from "react";

function useAxiosGetData(configObj) {
  // 1. destructure configObj:
  const { axiosInstance, url, requestConfig = {} } = configObj;
  // 2. create states:
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchDataErr, setFetchDataErr] = useState("");
  const [reload, setReload] = useState(0);
  function refetchData() {
    setReload(reload + 1);
  }
  useEffect(() => {
    // 3. axios request;
    async function fetchRequest() {
      try {
        setIsLoading(true);
        const ctrl = new AbortController();
        const res = await axiosInstance.get(url, {
          ...requestConfig,
          signal: ctrl.signal,
        });
        setData(res.data);
        setFetchDataErr(null);
      } catch (err) {
        console.log(err);
        err === "canceled"
          ? setFetchDataErr("")
          : !err?.response
          ? setFetchDataErr({ msg: "server not response" })
          : setFetchDataErr({
              msg: "faild to fetch data!",
              status: err.response.status,
            });
      } finally {
        setTimeout(() => setIsLoading(false), 1500);
      }
      // 4. cleanup useEffect;
      return () => ctrl.abort();
    }
    fetchRequest();
  }, [reload]);
  // 5. return:
  return { data, isLoading, fetchDataErr, refetchData };
}

export default useAxiosGetData;
