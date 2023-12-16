import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  zod$,
  z,
  Form,
  Link,
  routeLoader$,
} from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button";
import { TextInput } from "~/components/ui/text-input";
import { Textarea } from "~/components/ui/textarea";
import { prisma } from "~/lib/prisma";
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
export const useEditContact = routeAction$(
  async (formData, { redirect, params }) => {
    const contact = await prisma.contact.update({
      where: {
        id: params.contactId,
      },
      data: formData,
    });

    throw redirect(303, `/contacts/${contact.id}`);
  },
  zod$({
    name: z.string().min(1, "First name is required"),
    twitter: z.string(),
    avatar: z.string(),
    notes: z.string(),
  }),
);
export default component$(() => {
  const actionSig = useEditContact();
  const contactSig = useGetContact();

  return (
    <article class="card card-bordered mx-auto max-w-xl">
      <Form class="card-body" action={actionSig}>
        <header class="card-title">Edit {contactSig.value.name}</header>
        <div>
          <TextInput
            name="name"
            id="name"
            label="Full Name"
            error={actionSig.value?.fieldErrors.name}
            value={contactSig.value.name}
          />
          <TextInput
            value={contactSig.value.twitter}
            name="twitter"
            id="twitter"
            label="Twitter handler"
          />
          <TextInput
            value={contactSig.value.avatar}
            name="avatar"
            id="avatar"
            label="Avatar URL"
          />
          <Textarea
            value={contactSig.value.notes ?? ""}
            name="notes"
            id="notes"
            label="Notes"
            rows={6}
          />
        </div>

        <footer class="card-actions">
          <Link class="btn btn-error" href={`/contacts/${contactSig.value.id}`}>
            Cancel
          </Link>
          <Button
            loading={actionSig.isRunning}
            type={"submit"}
            colorScheme={"btn-primary"}
          >
            Edit
          </Button>
        </footer>
      </Form>
    </article>
  );
});
