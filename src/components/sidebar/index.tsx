import { type Signal, component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { ChevronLeftIcon } from "~/icons/chevron-left";
import { Search } from "./search";
import { useContacts } from "~/routes/layout";

export const Sidebar = component$(({ drawer }: { drawer: Signal<boolean> }) => {
  const contacts = useContacts();
  const loc = useLocation();

  return (
    <aside
      class={`${
        !drawer.value ? "hidden md:flex" : ""
      } absolute flex h-screen w-full flex-col divide-y border-r bg-gray-100 md:static md:max-w-xs`}
    >
      <header class="z-10 flex items-center gap-2 px-2 py-2 md:px-6">
        <Search />
        <a
          href="/contacts/new"
          class="rounded-md border bg-white px-2 py-2 text-blue-500 shadow"
        >
          New
        </a>
      </header>

      <section class="flex-1 overflow-y-auto px-2 py-4 md:px-6">
        {contacts.value.length ? (
          <ul class="flex h-full flex-col space-y-2">
            {contacts.value.map((contact) => (
              <li key={contact.id}>
                <Link
                  href={`/contacts/${contact.id}`}
                  class={`block rounded-md px-2 py-2  ${
                    loc.url.pathname === `/contacts/${contact.id}/`
                      ? "bg-blue-500 text-white "
                      : "hover:bg-gray-200"
                  }`}
                >
                  {contact.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p class="italic text-gray-500">No Contacts</p>
        )}
      </section>

      <footer class="flex items-center space-x-2 px-2 py-4 md:px-6">
        <Link class="flex flex-1 items-center space-x-2" href="/">
          <img
            src="https://qwik.builder.io/logos/qwik-logo.svg"
            class="h-6 w-6 flex-none"
            loading="lazy"
            alt=""
          />
          <span class="text-sm font-medium">Qwikcity Contacts</span>
        </Link>
        <button class="block md:hidden" onClick$={() => (drawer.value = false)}>
          <ChevronLeftIcon />
        </button>
      </footer>
    </aside>
  );
});
