"use server";

import { googleOAuthClient } from "@/lib/googleOauth";
import { lucia } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { UserDataSignUpSchema, UserDataSignInSchema } from "@/types/UserData";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

export const signUp = async (values: UserDataSignUpSchema) => {
  try {
    //if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (existingUser) return { sucess: false };

    const hashedPassword = await new Argon2id().hash(values.password);

    const user = await prisma.user.create({
      data: {
        email: values.email.toLowerCase(),
        name: values.name,
        hashedPassword,
      },
    });

    //generate a session cookie for the user
    // const session = await lucia.createSession(user.id, {});
    // const sessionCookie = await lucia.createSessionCookie(session.id);

    // cookies().set(sessionCookie.name, sessionCookie.value);
    setCookie(user.id);

    //return success true
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const signIn = async (values: UserDataSignInSchema) => {
  const user = await prisma.user.findUnique({
    where: {
      email: values.email,
    },
  });
  if (!user || !user.hashedPassword) {
    return { success: false, error: "inside !user !user.hashed" };
  }
  const passwordMatch = await new Argon2id().verify(
    user.hashedPassword,
    values.password
  );
  if (!passwordMatch) return { success: false, error: "!passwordMatch" };

  // const session = await lucia.createSession(user.id, {});
  // const sessionCookie = await lucia.createSessionCookie(session.id);
  // cookies().set(sessionCookie.name, sessionCookie.value);
  setCookie(user.id);

  return { success: true };
};

export const logOut = async () => {
  const sessionCookie = await lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value);
  return redirect("/authenticate");
};

export const setCookie = async (userId: string) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = await lucia.createSessionCookie(session.id);
  return cookies().set(sessionCookie.name, sessionCookie.value);
};

export const getGoogleOauthConsentUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    cookies().set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const authUrl = await googleOAuthClient.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["email", "profile"],
      }
    );
    return { success: true, url: authUrl.toString() };
  } catch (error) {
    return { success: false, error: "some wrong in google oauth client" };
  }
};
