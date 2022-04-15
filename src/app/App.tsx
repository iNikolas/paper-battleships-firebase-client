import React from "react";
import { useUser } from "reactfire";
import { AuthenticatedLayout, GuestLayout } from "../components";

function App() {
  const { data: user } = useUser();
  const isLogged = !!user;

  if (!isLogged) return <GuestLayout />;

  return <AuthenticatedLayout />;
}

export default App;
