import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <section class="min-h-screen grid place-items-center">
      <div class="max-w-md w-full mx-auto text-center flex flex-col space-y-4">
        <img
          src="https://qwik.builder.io/logos/qwik-logo.svg"
          class="w-16 h-16 mx-auto"
          loading="lazy"
          alt=""
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
