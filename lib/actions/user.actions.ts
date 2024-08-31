"use server";

import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { parseStringify } from "@/lib/utils";

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password);

        return parseStringify(response);
    } catch (error) {
        console.log(error)
    }
}

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData;

    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });


        return parseStringify(newUserAccount);
    } catch (error) {
        console.log(error);
    }
}

export const getLoggedInUser = async () => {
    try {
        const { account } = await createSessionClient();
        const newUserAccount = await account.get();

        return parseStringify(newUserAccount);
    } catch (error) {
        console.log(error);
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();

        cookies().delete('appwrite-session');

        await account.deleteSession('current');
    } catch (error) {
        console.log(error);
        return null;
    }
}