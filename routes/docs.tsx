import Header from "../components/Header.tsx";

export default function Docs() {
  return (
    <div class="bg-dark-background min-h-screen text-dark-onBackground font-dmsans">
      <Header />
      <main class="w-full p-6 md:p-12 pt-24 md:pt-32">
        <h1 class="text-white text-3xl font-extrabold text-center">
          Documentation
        </h1>
        <p class="text-center mt-4 text-dark-onSurfaceVariant">
          Coming soon...
        </p>
      </main>
    </div>
  );
}
