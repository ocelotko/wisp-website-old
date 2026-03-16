import { JSX } from "preact";
import Button from "../components/Button.tsx";
import Header from "../components/Header.tsx";

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  children: string;
}

function FeatureCard({ icon, title, children }: FeatureCardProps) {
  return (
    <div class="bg-dark-surfaceContainer p-6 rounded-lg flex flex-col gap-4 h-full">
      <div class="flex items-center gap-4">
        <div class="bg-dark-surfaceContainerHigh p-2 rounded-md text-dark-primary">
          {icon}
        </div>
        <h3 class="text-xl font-bold text-dark-onPrimaryContainer">{title}</h3>
      </div>
      <p class="text-dark-onSurfaceVariant">{children}</p>
    </div>
  );
}

export default function Features() {
  const generalFeatures = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      ),
      title: "Fast Transactions",
      description:
        "The Wisp network is designed for speed. With an average 2-minute block time, your transactions are confirmed faster than many other cryptocurrencies, making it ideal for quick payments.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V6.375m18 15-3.82-3.82A5.25 5.25 0 0 0 15.75 15h-1.5a5.25 5.25 0 0 0-2.43 4.43L6 21.75"
          />
        </svg>
      ),
      title: "Low Fees",
      description:
        "Thanks to an efficient block and transaction design, fees for sending Wisp are minimal, enabling even microtransactions without high costs.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
          />
        </svg>
      ),
      title: "Predictable & Limited Supply",
      description:
        "Wisp has a clear monetary policy with a regular halving schedule. This ensures the total supply is finite, making Wisp a scarce and predictable digital asset.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 12a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9A2.25 2.25 0 0 0 18.75 6.75h-1.5a2.25 2.25 0 0 0-2.25 2.25v3.75m-13.5 0V9A2.25 2.25 0 0 1 5.25 6.75h1.5a2.25 2.25 0 0 1 2.25 2.25v3.75m-1.5-6.75h3.75"
          />
        </svg>
      ),
      title: "User-Friendly Wallets",
      description:
        "Wisp offers both an intuitive graphical wallet for desktops and an advanced command-line wallet, making fund management easy and accessible for everyone.",
    },
  ];

  const technicalFeatures = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.166.397.506.71.93.78l.894.149c.542.09.94.56.94 1.11v1.093c0 .55-.398 1.02-.94 1.11l-.894.149c-.424.07-.764.384-.93.78-.164.398-.142.854.108 1.204l.527.738c.32.447.27.96-.12 1.45l-.773.773a1.125 1.125 0 0 1-1.45.12l-.737-.527c-.35-.25-.806-.272-1.204-.108-.397.166-.71.506-.78.93l-.149.894c-.09.542-.56.94-1.11.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-.96.27-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.166-.397-.506-.71-.93-.78l-.894-.149c-.542-.09-.94-.56-.94-1.11v-1.093c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.764-.384.93-.78.164-.398.142-.854-.108-1.204l-.527-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.806.272 1.204.108.397-.166.71-.506.78-.93l.149-.894Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ),
      title: "Modern Difficulty Adjustment",
      description:
        "Wisp adjusts mining difficulty daily (every 720 blocks) to ensure network stability, prevent large fluctuations in block time, and maintain fair conditions for all miners.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>
      ),
      title: "Improved Block Efficiency",
      description:
        "Wisp implements witness separation (similar to SegWit) to increase block capacity and solve transaction malleability, allowing more transactions per block with enhanced security.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Z"
          />
        </svg>
      ),
      title: "Privacy with Tor Support",
      description:
        "The Wisp node has built-in support for the Tor network. Users can easily run their node as a hidden service, increasing their privacy and resistance to censorship.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
          />
        </svg>
      ),
      title: "Developer-Friendly API",
      description:
        "A full-featured JSON-RPC API is available for developers who want to build on Wisp, making it easy to create third-party services, integrations, and applications.",
    },
  ];

  return (
    <div class="bg-dark-background min-h-screen text-dark-onBackground font-dmsans">
      <Header />
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-12">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-white sm:text-5xl">
            Wisp Features
          </h1>
          <p class="mt-4 text-xl text-dark-onSurfaceVariant">
            Discover what makes Wisp a fast, secure, and modern cryptocurrency.
          </p>
        </div>

        <div class="mt-16">
          <h2 class="text-2xl font-bold text-dark-primary text-center">
            For Everyone
          </h2>
          <div class="mt-8 grid gap-8 md:grid-cols-2">
            {generalFeatures.map((feature) => (
              <FeatureCard icon={feature.icon} title={feature.title}>
                {feature.description}
              </FeatureCard>
            ))}
          </div>
        </div>

        <div class="mt-20">
          <h2 class="text-2xl font-bold text-dark-primary text-center">
            For the Technically Inclined
          </h2>
          <div class="mt-8 grid gap-8 md:grid-cols-2">
            {technicalFeatures.map((feature) => (
              <FeatureCard icon={feature.icon} title={feature.title}>
                {feature.description}
              </FeatureCard>
            ))}
          </div>
        </div>

        <div class="mt-20 text-center border-t border-dark-surfaceContainerHigh pt-12">
          <h2 class="text-2xl font-bold text-white">Ready to get started?</h2>
          <div class="mt-8 flex justify-center gap-4 flex-wrap">
            <Button
              href="#"
              variant="primary"
              bgColorClassName="bg-dark-primaryContainer hover:bg-primary-40"
              textColorClassName="text-dark-onPrimaryContainer"
            >
              Download Wallet
            </Button>
            <Button
              href="#"
              variant="secondary"
              bgColorClassName="bg-dark-secondaryContainer hover:bg-secondary-40"
              textColorClassName="text-dark-onSecondaryContainer"
            >
              How to Mine Wisp?
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
