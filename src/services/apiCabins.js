import supabase, { supabaseUrl } from "./supabase"

async function getCabins() {
    let { data: cabins, error } = await supabase
        .from('cabins')
        .select('*');

    if (error) {
        console.log(error);
        throw new Error("Couldn't get the cabin data.");
    }
    //Sorting the cabins based on their creation in ascending order (As the cabin with less id are created before the one with higher ones)
    cabins.sort((a, b) => a.id - b.id);
    return cabins;
}

async function createOrEditCabin(cabinData, action, previousImage) {
    const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);
    let imageURL = '';
    //To handle duplicating cabin where the image need not to be reuploaded
    if (hasImagePath) {
        imageURL = cabinData.image;
    }
    //If there is a new image and the image is not the old image url then only upload the image; This simply handles the case when the old image URL is replaced by the new image File.
    else if (!(typeof cabinData.image === 'string') && cabinData.image?.[0]) {
        imageURL = await uploadCabinPhoto(cabinData.image[0]);
    }

    //This is to handle the case where the user opens the file selection explorer and doesn't select any file. But the previous image Link is gone;
    if (!cabinData.image[0]) {
        imageURL = previousImage ?? '';
    }

    let data, error;
    if (action === 'create') {
        const { data: createData, error: errorData } = await createCabin(cabinData, imageURL);
        data = createData;
        error = errorData;
    }
    if (action === 'edit') {
        const { data: editData, error: errorData } = await editCabin(cabinData, imageURL);
        data = editData;
        error = errorData;
    }
    if (error) {
        console.log(error);
        throw new Error("Couldn't create the cabin.");
    }
    return data;
}

async function createCabin(cabinData, imageURL) {
    const resp = await supabase
        .from('cabins')
        .insert([
            { ...cabinData, image: imageURL },
        ])
        .select();
    return resp;
}


async function editCabin(cabinData, imageURL) {
    if (imageURL) {
        cabinData = { ...cabinData, image: imageURL }
    }
    const resp = await supabase
        .from('cabins')
        .update(cabinData)
        .eq('id', cabinData.id)
        .select();
    return resp;
}

async function uploadCabinPhoto(image) {
    const imageName = `${Math.random() * 100000}-${image.name}`;
    const uploadURL = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { error } = await supabase.storage.from('cabin-images').upload(imageName, image);
    if (error) {
        console.log(error);
        throw new Error("Couldn't upload the cabin image.");
    }
    return uploadURL;
}

async function deleteCabins(id) {
    console.log(id);
    console.log('Hello');
    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);
    console.log(error);
    if (error) {
        console.log(error);
        throw new Error("Couldn't delete the cabin.");
    }
    return null;
}

export { getCabins, deleteCabins, createOrEditCabin };