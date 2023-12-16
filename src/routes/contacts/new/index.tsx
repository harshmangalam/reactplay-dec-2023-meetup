import { component$ } from "@builder.io/qwik";
import { routeAction$, zod$, z, Form, Link } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button";
import { TextInput } from "~/components/ui/text-input";
import { Textarea } from "~/components/ui/textarea";
import { prisma } from "~/lib/prisma";

export const useAddContact = routeAction$(
  async (data, { redirect }) => {
    const contact = await prisma.contact.create({
      data,
    });

    throw redirect(303, `/contacts/${contact.id}`);
  },
  zod$({
    name: z.string().min(1, "Name is required"),
    twitter: z.string(),
    avatar: z.string(),
    notes: z.string(),
  }),
);
export default component$(() => {
  const actionSig = useAddContact();
  return (
    <article class="card card-bordered mx-auto max-w-xl">
      <Form class="card-body" action={actionSig}>
        <header class="card-title">New Contact</header>
        <div>
          <TextInput
            name="name"
            id="name"
            label="Full Name"
            error={actionSig.value?.fieldErrors.name}
            value={actionSig.formData?.get("name")}
          />
          <TextInput
            value={actionSig.formData?.get("twitter")}
            name="twitter"
            id="twitter"
            label="Twitter handler"
          />
          <TextInput
            value={actionSig.formData?.get("avatar")}
            name="avatar"
            id="avatar"
            label="Avatar URL"
          />
          <Textarea
            value={actionSig.formData?.get("notes")?.toString() ?? ""}
            name="notes"
            id="notes"
            label="Notes"
          />
        </div>

        <footer class="card-actions">
          <Link class="btn btn-error" href={"/"}>
            Cancel
          </Link>
          <Button
            loading={actionSig.isRunning}
            type={"submit"}
            colorScheme={"btn-primary"}
          >
            Create
          </Button>
        </footer>
      </Form>
    </article>
  );
});
