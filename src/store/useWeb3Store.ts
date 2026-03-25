import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { connectWallet as connectWalletApi } from '../lib/stellar';

export interface Web3State {
  walletAddress: string | null;
  network: string;
  balances: Record<string, number>;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Web3Actions {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  updateBalances: (balances: Record<string, number>) => void;
  setNetwork: (network: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export type Web3Store = Web3State & Web3Actions;

export const useWeb3Store = create<Web3Store>()(
  devtools(
    (set, get) => ({
      // Initial state
      walletAddress: null,
      network: 'TESTNET',
      balances: {},
      isConnected: false,
      isLoading: false,
      error: null,

      // Actions
      connectWallet: async () => {
        const { setLoading, setError, setNetwork, setWalletAddress } = get();
        
        try {
          setLoading(true);
          setError(null);
          
          const userInfo = await connectWalletApi();
          
          if (userInfo.publicKey) {
            setWalletAddress(userInfo.publicKey);
            setNetwork('TESTNET'); // We know this from the stellar.ts implementation
            set({ isConnected: true });
          }
        } catch (error: any) {
          setError(error.message || 'Failed to connect wallet');
          console.error('Wallet connection error:', error);
        } finally {
          setLoading(false);
        }
      },

      disconnectWallet: () => {
        set({
          walletAddress: null,
          balances: {},
          isConnected: false,
          error: null,
        });
      },

      updateBalances: (balances: Record<string, number>) => {
        set({ balances });
      },

      setNetwork: (network: string) => {
        set({ network });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      // Helper setters
      setWalletAddress: (address: string | null) => {
        set({ walletAddress: address });
      },
    }),
    {
      name: 'web3-store',
    }
  )
);

// Selectors for easier access to specific state
export const useWalletAddress = () => useWeb3Store((state) => state.walletAddress);
export const useNetwork = () => useWeb3Store((state) => state.network);
export const useBalances = () => useWeb3Store((state) => state.balances);
export const useIsConnected = () => useWeb3Store((state) => state.isConnected);
export const useIsLoading = () => useWeb3Store((state) => state.isLoading);
export const useWeb3Error = () => useWeb3Store((state) => state.error);
