import { Outlet } from "react-router-dom";

export function Page() {
  return (
    <main className="max-w-3xl mx-auto min-h-screen grid">
      <Outlet />
    </main>
  );
}
