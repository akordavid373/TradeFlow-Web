"use client";
import { useWalletAddress, useNetwork, useBalances, useIsConnected } from "../store/useWeb3Store";

export default function Web3Status() {
  const walletAddress = useWalletAddress();
  const network = useNetwork();
  const balances = useBalances();
  const isConnected = useIsConnected();

  if (!isConnected) {
    return (
      <div className="p-4 bg-slate-100 rounded-lg">
        <p className="text-slate-600">No wallet connected</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-100 rounded-lg">
      <h3 className="font-semibold text-slate-800 mb-2">Web3 Status</h3>
      <div className="space-y-1 text-sm">
        <p><span className="font-medium">Network:</span> {network}</p>
        <p><span className="font-medium">Wallet:</span> {walletAddress}</p>
        <p><span className="font-medium">Balances:</span></p>
        <div className="ml-4">
          {Object.keys(balances).length === 0 ? (
            <p className="text-slate-500">No balances loaded</p>
          ) : (
            Object.entries(balances).map(([token, balance]) => (
              <p key={token} className="text-slate-600">
                {token}: {balance}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
