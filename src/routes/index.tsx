import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <section class="grid min-h-screen place-items-center">
      <div class="mx-auto flex w-full max-w-md flex-col space-y-4 text-center">
        <img
          src="https://qwik.builder.io/logos/qwik-logo.svg"
          class="mx-auto h-16 w-16"
          loading="lazy"
          alt="Logo"
          width={64}
          height={64}
        />

        <div class="text-gray-500">
          <p>This is a demo for Qwikcity</p>
          <p>
            Check out the docs at{" "}
            <a
              href="https://qwik.builder.io/docs/"
              target="_blank"
              class="text-blue-500"
            >
              https://qwik.builder.io/docs/
            </a>
          </p>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Contacts | Qwikcity",
};
