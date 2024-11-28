import supabase, { supabaseUrl } from "./supabase";

export const signupApi = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const loginApi = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUserApi = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
};

export const logoutApi = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const updateCurrentUserApi = async ({ password, fullName, avatar }) => {
  let updatedData;

  if (password) {
    updatedData = {
      password,
    };
  }

  if (fullName) {
    updatedData = {
      data: {
        full_name: fullName,
      },
    };
  }

  const { data, error: updateUserError } = await supabase.auth.updateUser(
    updatedData
  );

  if (updateUserError) {
    throw new Error(updateUserError.message);
  }

  if (!avatar) {
    return data;
  }

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: uploadAvatarError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadAvatarError) {
    throw new Error(uploadAvatarError.message);
  }

  const { data: updatedUser, error: updatedAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updatedAvatarError) {
    throw new Error(updatedAvatarError.message);
  }

  return updatedUser;
};
