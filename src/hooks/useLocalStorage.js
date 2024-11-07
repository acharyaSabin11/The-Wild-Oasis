import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue = null) {
    //STEPS:
    // 1. Create a state to keep track of value
    const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) || defaultValue);

    // 2. Use UseEffect Hook to update the value to local storage when the state variable changes
    useEffect(function () {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    // 3. Return the state value and the setter function
    return { value, setValue }
}