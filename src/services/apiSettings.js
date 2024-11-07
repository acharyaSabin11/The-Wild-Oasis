import supabase from "./supabase";

export async function getSettings() {
    const { data, error } = await supabase.from('settings').select('*').single();
    if (error) {
        console.log(error);
        throw new Error("Couldn't load the settings");
    }
    return data;
}

export async function updateSettings(updateData) {
    if (Object.values(updateData)[0] <= 0) {
        throw new Error('Value should be greater than 0');
    }
    const { data, error } = await supabase.from('settings').update(updateData).eq('id', 1).select();
    if (error) {
        console.log(error);
        throw new Error("Couldn't load the settings");
    }
    return data;
}