import { component$, Slot, useSignal } from "@builder.io/qwik";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { Sidebar } from "~/components/sidebar";
import { MenuIcon } from "~/icons/menu";
import { prisma } from "~/lib/prisma";

export const useContacts = routeLoader$(async ({ url }) => {
  const search = url.searchParams.get("search");

  const contacts = await prisma.contact.findMany({
    where: search?.trim().length
      ? {
          OR: [
            {
              firstName: {
                contains: search,
              },
            },
            {
              lastName: {
                contains: search,
              },
            },
          ],
        }
      : undefined,
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  return contacts;
});

export const useSearch = routeAction$(
  (formData, { redirect }) => {
    throw redirect(303, `/?search=${formData.search}`);
  },
  zod$({
    search: z.string().min(1),
  })
);
export default component$(() => {
  const contactsSignal = useContacts();
  const drawer = useSignal(false);
  return (
    <div class="flex">
      <Sidebar contacts={contactsSignal.value} drawer={drawer} />
      <div class="block md:hidden absolute top-4 left-4">
        <button onClick$={() => (drawer.value = true)}>
          <MenuIcon />
        </button>
      </div>
      <main class="flex-1">
        <Slot />
      </main>
    </div>
  );
});
