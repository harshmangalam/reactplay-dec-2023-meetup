import { type Signal, component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { ChevronLeftIcon } from "~/icons/chevron-left";
import { Search } from "./search";
import { useContacts } from "~/routes/layout";

export const Sidebar = component$(({ drawer }: { drawer: Signal<boolean> }) => {
  const contacts = useContacts();
  const locationSig = useLocation();

  return (
    <aside
      class={`${
        !drawer.value ? "hidden md:flex" : ""
      } absolute z-10 flex h-screen w-full  flex-col  border-r border-base-300 bg-base-100 md:static md:max-w-xs`}
    >
      <header class="z-10 flex items-center gap-2 px-4 py-4">
        <Search />
        <Link href="/contacts/new" class="btn btn-primary">
          New
        </Link>
      </header>

      <section class="flex-1 overflow-y-auto">
        {contacts.value.length ? (
          <ul
            class={"menu h-full w-full  rounded-none bg-base-200 p-0 px-4 py-2"}
          >
            {contacts.value.map((contact) => (
              <li key={contact.id} class={["active"]}>
                <Link
                  class={[
                    {
                      active: locationSig.url.pathname.startsWith(
                        `/contacts/${contact.id}`,
                      ),
                    },
                  ]}
                  href={`/contacts/${contact.id}`}
                >
                  {contact.avatar && (
                    <div class="avatar">
                      <div class="w-12 rounded-full">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          width={48}
                          height={48}
                        />
                      </div>
                    </div>
                  )}
                  {contact.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p class="px-4 py-2 italic text-base-content">No Contacts</p>
        )}
      </section>

      <footer class="flex items-center space-x-2 px-2 py-4 md:px-6">
        <Link class="flex flex-1 items-center space-x-2" href="/">
          <img
            src="https://qwik.builder.io/logos/qwik-logo.svg"
            class="h-6 w-6 flex-none"
            loading="lazy"
            alt="logo"
            width={24}
            height={24}
          />
          <span class="text-sm font-medium">Qwik Contacts</span>
        </Link>
        <button class="block md:hidden" onClick$={() => (drawer.value = false)}>
          <ChevronLeftIcon />
        </button>
      </footer>
    </aside>
  );
});
