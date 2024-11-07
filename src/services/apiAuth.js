import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ email, password, fullName }) {
    let { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: ''
            }
        }
    });

    if (error) {
        console.log(error);
        throw new Error("Couldn't signup the user");
    }

    return data;

}

export async function login({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.log(error);
        throw new Error('Either email or password is incorrect');
    }

    return data;
}

export async function getAuthenticatedUser() {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    return data;

}

export async function logout() {
    let { error } = await supabase.auth.signOut();
    if (error) throw new Error('Failed to Log Out');
    return null;
}

export async function updateUser({ fullName, password, avatar }) {
    //STEPS:
    let response;
    //1. If there is full name to be updated, update it directly
    if (fullName) {
        response = await supabase.auth.updateUser({ data: { fullName } });
    }
    //2. If there is password to be updated, update it directly
    if (password) {
        response = await supabase.auth.updateUser({ password });
    }

    if (fullName || password) {
        const { data, error } = response;
        //3. If there occurs some errror, throw error with custom message
        if (error) {
            console.log(error)
            throw new Error('Updating user failed suddenly');
        }
        //4. If above updating is successful, but there is no avatar, return directly
        if (!avatar) return data;
    }
    //5. If above updating is successful, but there is an avatar, upload avatar
    const uploadURL = await uploadAvatar(avatar);
    // 6. If avatar is successfully uploaded, update the url of the avatar for the user.
    const { data2, error2 } = await supabase.auth.updateUser({ data: { avatar: uploadURL } });

    // 7. If error occured in URL updating, throw custom error
    if (error2) {
        console.log(error2);
        throw new Error('Something Went wrong while uploading the Avatar Image');
    }

    //8. Return
    return data2;
}

async function uploadAvatar(image) {
    //a. Create the avatar file Name;
    const imageName = `${Math.random() * 100000}-${image.name}`;
    const uploadURL = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;

    //b. Upload Avatar
    const { error } = await supabase.storage.from('avatars').upload(imageName, image);
    //c. If there occurs some error during avatar uploading throw error with custom message
    if (error) {
        console.log(error);
        throw new Error("Couldn't upload the Avatar Image.");
    }
    return uploadURL;
}