"use client";
import { useWeb3Store, useWalletAddress, useIsConnected, useIsLoading, useWeb3Error } from "../store/useWeb3Store";
import Button from "./ui/Button";

export default function ConnectWallet() {
      const walletAddress = useWalletAddress();
      const isConnected = useIsConnected();
      const isLoading = useIsLoading();
      const error = useWeb3Error();
      const { connectWallet, disconnectWallet, clearError } = useWeb3Store();

      const handleConnect = async () => {
            if (isConnected) {
                  disconnectWallet();
            } else {
                  await connectWallet();
            }
      };

      const displayAddress = walletAddress 
            ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
            : "Connect Freighter Wallet";

      return (
            <div className="p-4">
                  <Button
                        onClick={handleConnect}
                        disabled={isLoading}
                        className={`${isConnected ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'} shadow-lg flex items-center gap-2 px-6 py-3`}
                  >
                        {isLoading ? (
                              <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Connecting...
                              </>
                        ) : (
                              <>
                                    {displayAddress}
                              </>
                        )}
                  </Button>
                  {error && (
                        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                              {error}
                              <button
                                    onClick={clearError}
                                    className="ml-2 text-red-500 hover:text-red-700"
                              >
                                    ×
                              </button>
                        </div>
                  )}
            </div>
      );
}
