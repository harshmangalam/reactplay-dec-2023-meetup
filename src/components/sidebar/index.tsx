import { type Signal, component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { ChevronLeftIcon } from "~/icons/chevron-left";
import { Search } from "./search";

export const Sidebar = component$(
  ({
    drawer,
    contacts,
  }: {
    drawer: Signal<boolean>;
    contacts: { id: string; firstName: string; lastName: string | null }[];
  }) => {
    const loc = useLocation();

    return (
      <aside
        class={`${
          !drawer.value ? "hidden md:flex" : ""
        } absolute md:static md:max-w-xs w-full flex flex-col divide-y bg-gray-100 border-r h-screen`}
      >
        <header class="z-10 py-2 px-2 md:px-6 flex items-center gap-2">
          <Search />
          <a
            href="/contacts/new"
            class="bg-white border text-blue-500 shadow px-2 py-2 rounded-md"
          >
            New
          </a>
        </header>

        <section class="flex-1 overflow-y-auto px-2 md:px-6 py-4">
          {contacts.length ? (
            <ul class="h-full flex flex-col space-y-2">
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link
                    href={`/contacts/${contact.id}`}
                    class={`py-2 block rounded-md px-2  ${
                      loc.url.pathname === `/contacts/${contact.id}/`
                        ? "bg-blue-500 text-white "
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {contact.firstName} {contact.lastName}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p class="text-gray-500 italic">No Contacts</p>
          )}
        </section>

        <footer class="py-4 flex space-x-2 items-center px-2 md:px-6">
          <Link class="flex space-x-2 items-center flex-1" href="/">
            <img
              src="https://qwik.builder.io/logos/qwik-logo.svg"
              class="w-6 h-6 flex-none"
              loading="lazy"
              alt=""
            />
            <span class="font-medium text-sm">Qwikcity Contacts</span>
          </Link>
          <button
            class="block md:hidden"
            onClick$={() => (drawer.value = false)}
          >
            <ChevronLeftIcon />
          </button>
        </footer>
      </aside>
    );
  }
);
