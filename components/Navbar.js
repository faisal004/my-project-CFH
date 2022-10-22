import React, { useRef } from "react";
import Link from "next/Link";
import { useEffect, useState } from "react";
import Web3Modal, { getProviderInfo } from "web3modal";
import { providers } from "ethers";

const Navbar = () => {
  const [walletconnected, setWalletconnected] = useState(false);
  const web3ModalRef = useRef();
 


  const getProviderOrSigner = async (needSigner = false) => {
    try {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);
      const { chainId } = await web3Provider.getNetwork();
      if (chainId != 5) {
        window.alert("Change network to goerli");
        throw new Error("Change network to goerli");
      }
      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }
      return web3Provider;
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletconnected(true);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!walletconnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletconnected]);

  return (
    <div className="bg-black ">
      <header className="text-gray-600 body-font ">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href={"/"}>
            <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
              <span className="ml-3 text-3xl font-mono">REKTIFY</span>
            </a>
          </Link>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center space-x-10 font-mono font-semibold">
            <Link href={"/about"} className="mr-5 hover:text-gray-900 ">
              About
            </Link>
            <Link href={"/about"} className="mr-5 hover:text-gray-900 ">
              Something
            </Link>
            <Link href={"/about"} className="mr-5 hover:text-gray-900">
              Something
            </Link>
            <Link href={"/about"} className="mr-5 hover:text-gray-900">
              Something
            </Link>
          </nav>

          <button
            onClick={connectWallet}
            className="inline-flex font-mono items-center text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500  border-0 py-1 px-3 focus:outline-none hover:bg-orange-400 rounded text-base mt-4 md:mt-0"
          >
            Connect your Wallet
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
