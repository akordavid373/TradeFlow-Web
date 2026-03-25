import React from "react";
import { X, ArrowDown, Info } from "lucide-react";
import Card from "./Card";
import Button from "./ui/Button";

interface TradeReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fromAmount: string;
  fromToken: string;
  toAmount: string;
  toToken: string;
  priceImpact: number;
  slippageTolerance: number;
  fee: string;
  route: string;
}

export default function TradeReviewModal({
  isOpen,
  onClose,
  onConfirm,
  fromAmount,
  fromToken,
  toAmount,
  toToken,
  priceImpact,
  slippageTolerance,
  fee,
  route,
}: TradeReviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Review Trade</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {/* Swap Summary */}
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-400 mb-1">You Pay</p>
                <p className="text-2xl font-bold text-white uppercase">
                  {fromAmount} {fromToken}
                </p>
              </div>
            </div>
            <div className="flex justify-center my-2">
              <div className="bg-slate-700 p-1.5 rounded-full border border-slate-600">
                <ArrowDown size={14} className="text-slate-300" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-400 mb-1">You Receive</p>
                <p className="text-2xl font-bold text-blue-400 uppercase">
                  {toAmount} {toToken}
                </p>
              </div>
            </div>
          </div>

          {/* Details List */}
          <div className="space-y-3 px-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Price Impact</span>
              <span className={`${priceImpact > 5 ? "text-red-400 font-bold" : "text-slate-200"}`}>
                {priceImpact.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 font-medium">Max Slippage</span>
              <span className="text-slate-200">{slippageTolerance}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Fee (0.3%)</span>
              <span className="text-slate-200">{fee}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Network Cost</span>
              <span className="text-slate-200 text-xs flex items-center gap-1">
                ~0.00001 XLM <Info size={12} className="text-slate-500" />
              </span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-slate-700/50">
              <span className="text-slate-400">Routing Path</span>
              <span className="text-blue-300 text-xs font-mono">{route}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={onConfirm} className="w-full py-4 text-lg font-bold shadow-blue-500/20 shadow-xl">
            Confirm & Sign in Wallet
          </Button>
          <button
            onClick={onClose}
            className="w-full py-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </Card>
    </div>
  );
}
