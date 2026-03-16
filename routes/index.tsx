import Button from "../components/Button.tsx";
import Card from "../components/Card.tsx";
import Header from "../components/Header.tsx";
import { JSX } from "preact";

export default function Home(): JSX.Element {
  return (
    <>
      <Header />
      <main class="w-full min-h-screen overflow-x-hidden bg-dark-background">
        <section class="w-full flex flex-col p-6 md:p-12 gap-12 md:gap-24 justify-center pt-24 md:pt-32">
          <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div class="flex flex-1 flex-col gap-4 order-2 md:order-1">
              <h1 class="text-white text-4xl md:text-6xl font-extrabold">
                PROOF-OF-WORK CRYPTOCURRENCY WRITTEN IN RUST
              </h1>

              <Button
                href="about"
                variant="primary"
                bgColorClassName="bg-dark-primaryContainer hover:bg-primary-40"
                textColorClassName="text-dark-onPrimaryContainer"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                }
                iconAfter
                className="mr-auto"
              >
                Read more
              </Button>
            </div>
            <div class="bg-[url('flame.png')] bg-center bg-contain bg-no-repeat h-64 md:h-full order-1 md:order-2">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                  />
                </svg>
              }
              title="Core"
              text="The foundational Rust library powering all wisp features."
              buttonLabel="Download"
              buttonOnClick={() => console.log("Download clicked")}
              secondButtonLabel="Details"
              secondButtonOnClick={() => console.log("Details clicked")}
              secondButtonVariant="ghost"
            />

            <Card
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                  />
                </svg>
              }
              title="Node"
              text="Run a wisp node to join the network and validate transactions."
              buttonLabel="Download"
              buttonOnClick={() => console.log("Download clicked")}
              secondButtonLabel="Details"
              secondButtonOnClick={() => console.log("Details clicked")}
              secondButtonVariant="ghost"
            />

            <Card
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
                  />
                </svg>
              }
              title="Flame"
              text="Use flame to mine wisp and secure the network."
              buttonLabel="Download"
              buttonOnClick={() => console.log("Download clicked")}
              secondButtonLabel="Details"
              secondButtonOnClick={() => console.log("Details clicked")}
              secondButtonVariant="ghost"
            />

            <Card
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>
              }
              title="Wallet"
              text="Securely store, send, and receive your wisp."
              buttonLabel="Download"
              buttonOnClick={() => console.log("Download clicked")}
              secondButtonLabel="Details"
              secondButtonOnClick={() => console.log("Details clicked")}
              secondButtonVariant="ghost"
            />
          </div>
        </section>
      </main>
    </>
  );
}
