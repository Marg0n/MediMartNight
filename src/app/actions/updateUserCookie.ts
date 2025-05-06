/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

//! used for setting the cookies
export const updateUserCookie = async (updatedData: any) => {
  (await cookies()).set("userData", JSON.stringify(updatedData));
};
