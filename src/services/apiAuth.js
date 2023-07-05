import supabase, { supabaseUrl } from "./supabase";

export const signup = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

export const updateCurrentUser = async ({ fullName, avatar, password }) => {
  let updatedData;
  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updatedData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) throw new Error(uploadError.message);

  const { data: dataWithAvatar, error: errorWithAvatar } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (errorWithAvatar) throw new Error(errorWithAvatar.message);

  return dataWithAvatar;
};
