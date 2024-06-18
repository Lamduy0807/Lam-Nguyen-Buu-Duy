import Api from "./api";

import { useQuery } from "react-query";

export const useGetCurrencies = () => {
  return useQuery(["currencies"], async () => {
    const data = await Api.fetchCurencies();

    return data;
  });
};
