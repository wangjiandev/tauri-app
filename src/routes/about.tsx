import { useUsers } from "@/hooks/use-users";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  const { data: users, isLoading } = useUsers();

  return (
    <div className="p-2">
      <h3>About</h3>
      {isLoading
        ? "Loading..."
        : users?.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))}
    </div>
  );
}
