"use client";

import toast from "react-hot-toast";

export default function useTransactionToast() {
  const loading = (message = "Waiting for confirmation...") =>
    toast.loading(message);
  const success = (message = "Invoice Minted Successfully!") =>
    toast.success(message);
  const error = (message = "Transaction Failed") => toast.error(message);

  return { loading, success, error };
}
