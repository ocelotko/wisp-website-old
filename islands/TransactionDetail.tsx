import { useState } from "preact/hooks";
import { formatTimestamp } from "../utils/format.ts";
import ClipboardCopy from "./ClipboardCopy.tsx";

interface ApiTransactionInput {
  outpoint: string;
  signature: string | null;
}

interface ApiTransactionOutput {
  value: string;
  address: string;
}

interface TransactionDetails {
  hash: string;
  block_height: number | null;
  timestamp: number;
  inputs: ApiTransactionInput[];
  outputs: ApiTransactionOutput[];
  fee_or_reward: string;
  total_output_wisp: string;
  coinbase_message?: string;
}

interface TransactionDetailProps {
  transaction: TransactionDetails;
}

export default function TransactionDetail(
  { transaction }: TransactionDetailProps,
) {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = ["Overview", "Inputs", "Outputs"];
  const isCoinbase = transaction.inputs[0]?.outpoint === "Coinbase (New Coins)";

  return (
    <div class="bg-dark-surfaceContainer rounded-xl shadow-lg">
      {/* Tabs */}
      <div class="border-b border-dark-outlineVariant">
        <nav class="flex gap-4 px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab.toLowerCase())}
              class={`py-4 px-1 font-semibold border-b-2 transition-colors ${
                activeTab === tab.toLowerCase()
                  ? "border-dark-primary text-dark-primary"
                  : "border-transparent text-dark-onSurfaceVariant hover:text-dark-onSurface"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div class="p-6">
        {activeTab === "overview" && (
          <div class="grid grid-cols-1 gap-y-8 justify-start items-start py-8">
            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <span class="col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Hash
              </span>
              <span class="w-full col-span-4 font-mono break-all">
                {transaction.hash}
              </span>
            </p>
            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <span class="col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Block Height
              </span>
              <span class="w-full col-span-4">
                {transaction.block_height ?? "Mempool"}
              </span>
            </p>
            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <span class="col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Timestamp
              </span>
              <span class="w-full col-span-4">
                {formatTimestamp(transaction.timestamp)}
              </span>
            </p>
            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <span class="col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                {isCoinbase ? "Reward" : "Fee"}
              </span>
              <span class="w-full col-span-4">
                {transaction.fee_or_reward} Wisp
              </span>
            </p>
            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <span class="col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Total Output
              </span>
              <span class="w-full col-span-4">
                {transaction.total_output_wisp} Wisp
              </span>
            </p>
            {isCoinbase && transaction.coinbase_message && (
              <div class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-start justify-between">
                <span class="col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                  Coinbase Message
                </span>
                <span class="w-full col-span-4 text-dark-tertiary">
                  "{transaction.coinbase_message}"
                </span>
              </div>
            )}
          </div>
        )}

        {activeTab === "inputs" && (
          <div class="py-4 space-y-4">
            {isCoinbase
              ? (
                <p class="text-dark-onSurfaceVariant">
                  This is a coinbase transaction (no inputs).
                </p>
              )
              : (
                transaction.inputs.map((input, index) => {
                  const prevTxHash = input.outpoint.split(":")[0];
                  return (
                    <div key={index} class="bg-dark-surface p-4 rounded-md">
                      <p class="text-dark-onSurfaceVariant">
                        Input {index + 1}
                      </p>
                      <p class="font-mono break-all text-xs mt-2">
                        <strong>From Outpoint:</strong>{" "}
                        <a
                          href={`/transaction/${prevTxHash}`}
                          class="text-dark-primary hover:underline"
                        >
                          {input.outpoint}
                        </a>
                      </p>
                      <p class="font-mono break-all text-xs mt-2">
                        <strong>Signature:</strong> {input.signature ?? "N/A"}
                      </p>
                    </div>
                  );
                })
              )}
          </div>
        )}

        {activeTab === "outputs" && (
          <div class="py-4 space-y-4">
            {transaction.outputs.map((output, index) => (
              <div key={index} class="bg-dark-surface p-4 rounded-md">
                <p class="text-dark-onSurfaceVariant">Output {index + 1}</p>
                <p class="mt-2">
                  <strong>Value:</strong>{" "}
                  <span class="text-dark-tertiary">{output.value}</span>
                </p>
                <p class="font-mono break-all text-xs mt-2">
                  <strong>Recipient Address:</strong>{" "}
                  <ClipboardCopy
                    text={output.address}
                    className="text-dark-primary"
                  />
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
