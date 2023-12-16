import { component$ } from "@builder.io/qwik";
import { routeAction$, zod$, z, Form, Link } from "@builder.io/qwik-city";
import { prisma } from "~/lib/prisma";

export const useAddContact = routeAction$(
  async (formData, { redirect }) => {
    const contact = await prisma.contact.create({
      data: formData,
    });

    throw redirect(303, `/contacts/${contact.id}`);
  },
  zod$({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string(),
    twitter: z.string(),
    avatarUrl: z.string(),
    notes: z.string(),
  })
);
export default component$(() => {
  const addContactAction = useAddContact();
  const firstNameError = addContactAction.value?.fieldErrors?.firstName;

  return (
    <section class="min-h-screen grid place-items-center">
      <Form
        action={addContactAction}
        class="grid grid-cols-2 gap-4 max-w-md w-full mx-auto px-4 md:px-0"
      >
        <section class="col-span-1 flex flex-col space-y-2">
          <label for="firstName">First name</label>
          <input type="text" name="firstName" id="firstName" />
          {firstNameError?.length ? (
            <span class="text-red-500 text-sm">{firstNameError[0]}</span>
          ) : null}
        </section>
        <section class="col-span-1 flex flex-col space-y-2">
          <label for="lastName">Last name</label>
          <input
            value={addContactAction.formData?.get("lastName") ?? ""}
            type="text"
            name="lastName"
            id="lastName"
          />
        </section>
        <section class="col-span-2 flex flex-col space-y-2">
          <label for="twitter">Twitter</label>
          <input
            value={addContactAction.formData?.get("twitter") ?? ""}
            type="text"
            name="twitter"
            id="twitter"
          />
        </section>
        <section class="col-span-2 flex flex-col space-y-2">
          <label for="avatarUrl">Avatar URL</label>
          <input
            value={addContactAction.formData?.get("avatarUrl") ?? ""}
            type="text"
            name="avatarUrl"
            id="avatarUrl"
          />
        </section>
        <section class="col-span-2 flex flex-col space-y-2">
          <label for="notes">Notes</label>
          <textarea
            value={(addContactAction.formData?.get("notes") as string) ?? ""}
            name="notes"
            id="notes"
            rows={5}
          />
        </section>

        <section class="flex space-x-2 items-center">
          <button
            type="submit"
            disabled={addContactAction.isRunning}
            class="bg-white border text-blue-500 shadow px-2 py-2 rounded-md disabled:bg-gray-100 disabled:text-gray-500"
          >
            Save
          </button>
          <Link
            href="/"
            class="bg-white border text-red-500 shadow px-2 py-2 rounded-md"
          >
            Cancel
          </Link>
        </section>
      </Form>
    </section>
  );
});
