import { useEffect, useState } from "preact/hooks";
import Header from "../components/Header.tsx";
import GoBackArrow from "./GoBackArrow.tsx";
import { formatTimestamp } from "../utils/format.ts";

interface TransactionSummary {
  hash: string;
  block_height: number | null;
  input_count: number;
  output_count: number;
  total_output_wisp: string;
  timestamp: number;
}

interface TransactionsData {
  data: TransactionSummary[];
  page: number;
  limit: number;
  total_transactions: number;
}

const fetchTransactions = async (
  page: number,
  limit: number,
): Promise<TransactionsData> => {
  const response = await fetch(
    `/api/v1/transactions?page=${page}&limit=${limit}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch transaction data");
  }
  return await response.json();
};

export default function TransactionsIsland() {
  const [transactions, setTransactions] = useState<TransactionSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [limit] = useState(25);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    const loadTransactions = async () => {
      setIsLoading(true);
      try {
        setError(null);
        const result = await fetchTransactions(page, limit);
        if (page === 1) {
          setTransactions(result.data);
        } else {
          setTransactions((prev) => [...prev, ...result.data]);
        }
        setTotalTransactions(result.total_transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError(
          "Failed to load transaction data. The node might be offline or there's an issue with the API response.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadTransactions();
  }, [page, limit]);

  // Effect for polling for new transactions
  useEffect(() => {
    const pollForNewTransactions = async () => {
      try {
        // Fetch the most recent page of transactions to check for new ones
        const result = await fetchTransactions(1, limit);
        setTotalTransactions(result.total_transactions);

        setTransactions((prevTxs) => {
          if (prevTxs.length === 0) return result.data;

          const existingHashes = new Set(prevTxs.map((tx) => tx.hash));
          const newTxs = result.data.filter((tx) =>
            !existingHashes.has(tx.hash)
          );

          // Prepend new, unique transactions to the list
          return newTxs.length > 0 ? [...newTxs, ...prevTxs] : prevTxs;
        });
      } catch (error) {
        console.error("Polling for new transactions failed:", error);
      }
    };

    const intervalId = setInterval(pollForNewTransactions, 10000); // Poll every 10 seconds
    return () => clearInterval(intervalId);
  }, [limit]); // Re-run if limit changes

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div class="bg-dark-background min-h-screen text-dark-onBackground font-dmsans">
      <Header />
      <main class="w-full px-12 py-8">
        <div class="flex items-start gap-4 mb-6">
          <GoBackArrow />
          <div>
            <h2 class="text-3xl font-bold">All Transactions</h2>
            <p class="text-dark-onSurfaceVariant mt-1">
              {totalTransactions > 0
                ? `${totalTransactions.toLocaleString()} transactions found`
                : "Loading..."}
            </p>
          </div>
        </div>

        <div class="bg-dark-surfaceContainer rounded-xl shadow-lg overflow-hidden">
          {isLoading && transactions.length === 0
            ? (
              <div class="p-8 flex items-center justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-4 border-t-dark-primary border-transparent">
                </div>
                <span class="ml-4 text-dark-onSurfaceVariant">
                  Loading transactions...
                </span>
              </div>
            )
            : error
            ? (
              <div class="p-8 text-center text-red-400">
                <p class="text-lg font-bold">An Error Occurred</p>
                <p class="mt-2">{error}</p>
              </div>
            )
            : !isLoading && transactions.length === 0
            ? (
              <div class="p-8 text-center text-dark-onSurfaceVariant">
                <p class="text-lg">No transactions have been made yet.</p>
              </div>
            )
            : (
              <div class="overflow-x-auto">
                <table class="w-full table-auto text-left whitespace-nowrap">
                  <thead class="text-dark-onSurfaceVariant uppercase text-xs border-b border-dark-outlineVariant">
                    <tr>
                      <th class="px-6 py-3">Txn Hash</th>
                      <th class="px-6 py-3 text-center">Block</th>
                      <th class="px-6 py-3 text-center">Timestamp</th>
                      <th class="px-6 py-3 text-center">Input Count</th>
                      <th class="px-6 py-3 text-center">Output Count</th>
                      <th class="px-6 py-3 text-right">Output (Wisp)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-dark-outlineVariant">
                    {transactions.map((tx) => (
                      <tr
                        key={tx.hash}
                        class="hover:bg-dark-surfaceVariant transition-colors cursor-pointer"
                        onClick={() => (globalThis.location.href =
                          `/transaction/${tx.hash}`)}
                      >
                        <td class="px-6 py-4 font-mono text-sm text-dark-primary">
                          {`${tx.hash.substring(0, 8)}...${tx.hash.slice(-6)}`}
                        </td>
                        <td class="px-6 py-4 text-center">
                          {tx.block_height ?? "Mempool"}
                        </td>
                        <td class="px-6 py-4 text-center">
                          {formatTimestamp(tx.timestamp)}
                        </td>
                        <td class="px-6 py-4 text-center">
                          {tx.input_count}
                        </td>
                        <td class="px-6 py-4 text-center">
                          {tx.output_count}
                        </td>
                        <td class="px-6 py-4 text-right">
                          {tx.total_output_wisp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div class="p-4 flex justify-center">
                  {totalTransactions > transactions.length
                    ? (
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        class="bg-dark-primaryContainer text-dark-onPrimaryContainer font-bold py-2 px-4 rounded-xl shadow-lg hover:bg-dark-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? "Loading..." : "Load More"}
                      </button>
                    )
                    : transactions.length > 0 && (
                      <p class="text-dark-onSurfaceVariant">
                        All transactions loaded.
                      </p>
                    )}
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}
