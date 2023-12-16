import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

type ContactItemProps = {
  id: string;
  name: string;
  avatar: string | null;
};
export const ContactItem = component$((props: ContactItemProps) => {
  const { id, name, avatar } = props;
  const locationSig = useLocation();
  return (
    <li key={id} class={["active"]}>
      <Link
        class={[
          {
            active: locationSig.url.pathname.startsWith(`/contacts/${id}`),
          },
        ]}
        href={`/contacts/${id}`}
      >
        {avatar && (
          <div class="avatar">
            <div class="w-12 rounded-full">
              <img src={avatar} alt={name} width={48} height={48} />
            </div>
          </div>
        )}
        {name}
      </Link>
    </li>
  );
});
