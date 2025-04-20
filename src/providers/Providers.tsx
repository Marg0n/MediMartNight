"use client";

import UserProvider from "@/contex/UserContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;