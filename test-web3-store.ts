// Test file to verify Zustand store functionality
// This can be run in a browser console or as a simple test

import { useWeb3Store } from '../src/store/useWeb3Store';

// Test the store functionality
export function testWeb3Store() {
  console.log('Testing Web3 Store...');
  
  // Get initial state
  const store = useWeb3Store.getState();
  console.log('Initial state:', {
    walletAddress: store.walletAddress,
    network: store.network,
    isConnected: store.isConnected,
    isLoading: store.isLoading,
    balances: store.balances
  });

  // Test updateBalances
  store.updateBalances({
    'USDC': 1000.50,
    'XLM': 500.25,
    'yXLM': 250.75
  });
  
  console.log('After updateBalances:', useWeb3Store.getState().balances);

  // Test setNetwork
  store.setNetwork('MAINNET');
  console.log('After setNetwork:', useWeb3Store.getState().network);

  // Test disconnect
  store.disconnectWallet();
  console.log('After disconnect:', {
    walletAddress: useWeb3Store.getState().walletAddress,
    isConnected: useWeb3Store.getState().isConnected,
    balances: useWeb3Store.getState().balances
  });

  console.log('Web3 Store test completed!');
}

// Export for potential use in tests
export { testWeb3Store as default };
