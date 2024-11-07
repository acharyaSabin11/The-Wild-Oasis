import { subDays } from "date-fns";
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings(filter, sortBy, page) {
    let query = supabase.from('bookings').select('id, totalPrice, numNights, numGuests, status, startDate, endDate, cabins(name), guests(fullName, email)', { count: 'exact' });
    if (filter && filter.value !== 'all') {
        query = query[filter.method ? filter.method : 'eq'](filter.column, filter.value);
    }

    if (sortBy) {
        query = query.order(sortBy.sortColumn, { ascending: sortBy.sortDirection === 'asc' });
    }

    if (page) {
        const from = (page - 1) * PAGE_SIZE;
        const to = page * PAGE_SIZE - 1
        query = query.range(from, to);
    }
    const { data, error, count } = await query;

    if (error) {
        console.log(error);
        throw new Error('Could not get the bookings data');
    }

    return { data, count };
}

export async function getBookingById(id) {
    const { data, error } = await supabase.from('bookings').select('*, cabins(*), guests(*)').eq('id', id).single();

    if (error) {
        console.log(error);
        throw new Error('Could not get the booking data');
    }

    return data;
}

export async function updateBookingData(id, updateValue) {
    const { data, error } = await supabase.from('bookings').update(updateValue).eq('id', id).single();

    if (error) {
        console.log(error);
        throw new Error("Booking Couldn't be updated");
    }

    return data;
}

export async function deleteBooking(id) {
    const { data, error } = await supabase.from('bookings').delete().eq('id', id);

    if (error) {
        console.log(error);
        throw new Error("Booking Couldn't be deleted");
    }

    return data;
}

export async function getRecentBookings(days) {
    const today = getToday({ end: true });
    const startDate = subDays(today, days).toISOString();
    const { data, error } = await supabase.from('bookings').select('*').gte('created_at', startDate).lte('created_at', today).order('created_at', { ascending: true });
    if (error) {
        console.log(error);
        throw new Error('Error getting Bookings data');
    }
    return data;
}

export async function getRecentStays(days) {
    const today = getToday({ end: true });
    const startDate = subDays(today, days).toISOString();
    const { data, error } = await supabase.from('bookings').select('*').gte('startDate', startDate).lte('startDate', today).order('startDate', { ascending: true });
    if (error) {
        console.log(error);
        throw new Error('Error getting Bookings data');
    }
    return data;
}

export async function getTodaysActivities() {
    // const { data, error } = await supabase.from('bookings').select('*, guests(fullName, nationality, countryFlag)').or(`status.eq.unconfirmed.and(startDate.eq.${getToday()}),status.eq.checked-in.and(endDate.eq.${getToday()})`);
    const { data, error } = await supabase.from('bookings').select('*, guests(fullName, nationality, countryFlag)').or(`and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`);
    // const { data, error } = await supabase.from('bookings').select('*, guests(fullName, nationality, countryFlag)').or(`status.eq.unconfirmed,and(status.eq.checked-in,endDate.eq.${getToday()})`);

    if (error) {
        console.log(error);
        throw new Error("Error Today's Activity List");
    }
    return data;
}