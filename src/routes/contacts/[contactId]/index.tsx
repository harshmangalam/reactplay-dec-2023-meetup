import { component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { prisma } from "~/lib/prisma";
import { DeleteContact } from "./delete-contact";
import { Favorite } from "./favorite";

export const useGetContact = routeLoader$(async ({ params, error }) => {
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
  }
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
  }
);

export default component$(() => {
  const contact = useGetContact();

  return (
    <section class="p-6">
      <div class="flex flex-col items-center md:items-start text-center md:text-start gap-4 md:flex-row">
        <div class="flex-none">
          <img
            class="w-36 h-36 rounded-xl"
            src={
              contact.value.avatarUrl ||
              "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=996&t=st=1680856511~exp=1680857111~hmac=2ea5e2b237c5da1755e858ed01dd5d3d6e5638d3edcfa0e34c62dc5bc518435a"
            }
            alt={contact.value.firstName}
          />
        </div>

        <div class="flex flex-col space-y-2 justify-center md:justify-start">
          <div class="flex items-center gap-4 justify-center md:justify-start">
            <h1 class="text-2xl font-bold">
              {contact.value?.firstName} {contact.value?.lastName}
            </h1>
            <Favorite favorite={contact.value.favorite} />
          </div>
          {contact.value.twitter && (
            <a
              href={`https://twitter.com/${contact.value.twitter}`}
              target="_blank"
              class="text-xl text-blue-500"
            >
              @{contact.value?.twitter}
            </a>
          )}
          <p class="text-gray-500">{contact.value?.notes}</p>

          <div class="flex items-center justify-center md:justify-start space-x-2">
            <a
              href={`/contacts/${contact.value?.id}/edit`}
              class="py-2 px-2 rounded-md border text-sm font-medium text-blue-500 shadow"
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
