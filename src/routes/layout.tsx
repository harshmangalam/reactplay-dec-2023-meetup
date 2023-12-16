import { component$, Slot, useSignal } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { AddContact } from "~/components/add-contact";
import { Sidebar } from "~/components/sidebar";
import { MenuIcon } from "~/icons/menu";
import { prisma } from "~/lib/prisma";

export const useContacts = routeLoader$(async ({ url }) => {
  const search = url.searchParams.get("search");

  const contacts = await prisma.contact.findMany({
    where: search?.trim().length
      ? {
          name: {
            contains: search,
          },
        }
      : undefined,
    select: {
      id: true,
      name: true,
      avatar: true,
    },
  });

  return contacts;
});
export default component$(() => {
  const drawer = useSignal(false);
  return (
    <div class="flex">
      <Sidebar drawer={drawer} />
      <div class="absolute left-4 top-4 block md:hidden">
        <button onClick$={() => (drawer.value = true)}>
          <MenuIcon />
        </button>
      </div>
      <main class="flex-1">
        <Slot />
        <AddContact />
      </main>
    </div>
  );
});
