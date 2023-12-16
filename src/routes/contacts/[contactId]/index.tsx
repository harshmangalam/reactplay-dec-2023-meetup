import { component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { prisma } from "~/lib/prisma";
import { DeleteContact } from "./delete-contact";
import { Favorite } from "./favorite";

export const useContact = routeLoader$(async ({ params, error }) => {
  const contact = await prisma.contact.findUnique({
    where: {
      id: params.contactId,
    },
  });

  if (!contact) {
    throw error(404, "Contact not found");
  }
  return contact;
});

export const useDeleteContact = routeAction$(
  async (_, { redirect, params, error }) => {
    const contact = await prisma.contact.findUnique({
      where: {
        id: params.contactId,
      },
    });

    if (!contact) {
      throw error(404, "Contact not found");
    }

    await prisma.contact.delete({
      where: {
        id: params.contactId,
      },
    });

    throw redirect(303, "/");
  },
);

export const useFavoriteContact = routeAction$(
  async (_, { redirect, error, params }) => {
    const contact = await prisma.contact.findUnique({
      where: {
        id: params.contactId,
      },
      select: {
        favorite: true,
      },
    });

    if (!contact) {
      throw error(404, "Contact not found");
    }

    await prisma.contact.update({
      where: {
        id: params.contactId,
      },
      data: {
        favorite: !contact.favorite,
      },
    });

    throw redirect(303, `/contacts/${params.contactId}`);
  },
);

export default component$(() => {
  const contact = useContact();

  return (
    <section class="p-6">
      <div class="flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:text-start">
        <div class="flex-none">
          <img
            class="h-36 w-36 rounded-xl"
            src={
              contact.value.avatar ||
              "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=996&t=st=1680856511~exp=1680857111~hmac=2ea5e2b237c5da1755e858ed01dd5d3d6e5638d3edcfa0e34c62dc5bc518435a"
            }
            alt={contact.value.name}
          />
        </div>

        <div class="flex flex-col justify-center space-y-2 md:justify-start">
          <div class="flex items-center justify-center gap-4 md:justify-start">
            <h1 class="text-2xl font-bold">{contact.value?.name}</h1>
            <Favorite favorite={contact.value.favorite} />
          </div>
          {contact.value.twitter && (
            <a
              href={`https://twitter.com/${contact.value.twitter}`}
              target="_blank"
              class="text-xl text-blue-500"
            >
              @{contact.value.twitter}
            </a>
          )}
          <p class="text-gray-500">{contact.value.notes}</p>

          <div class="flex items-center justify-center space-x-2 md:justify-start">
            <a
              href={`/contacts/${contact.value.id}/edit`}
              class="btn btn-warning"
              type="submit"
            >
              Edit
            </a>

            <DeleteContact />
          </div>
        </div>
      </div>
    </section>
  );
});
