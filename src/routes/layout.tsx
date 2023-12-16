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
          name: {
            contains: search,
          },
        }
      : undefined,
    select: {
      id: true,
      name: true,
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
  }),
);
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
      </main>
    </div>
  );
});
