import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

import { Web3Api } from "./types";

const Web3Context = createContext<Web3Api | null>(null);

export default function Web3Provider({ children }: { children: ReactNode }) {
  const [web3Api, setWeb3Api] = useState<Web3Api>({
    provider: null,
    web3: null,
    contract: null,
    isInitialized: false,
  });

  const loadProvider = useCallback(async () => {
    const provider = await detectEthereumProvider()
      if (provider) {
        const web3 = new Web3(provider as any)
        setWeb3Api({
          provider,
          web3,
          contract: null,
          isInitialized: true
        })
      } else {
        setWeb3Api((api) => ({ ...api, isInitialized: true }));
        console.error("Please, install Metamask.");
      }
  }, []);

  useEffect(() => {
    loadProvider();
  }, [loadProvider]);

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3Provider() {
  return useContext(Web3Context);
}
