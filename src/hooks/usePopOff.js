import { useEffect, useRef } from "react";

export function usePopOff(handler, handleInCapturing) {
    const ref = useRef();
    useEffect(
        function () {
            function modalPopOff(e) {
                if (ref.current && !ref.current.contains(e.target)) {
                    handler();
                }
            }
            const body = document.body;
            body.addEventListener("click", modalPopOff, handleInCapturing);

            return function () {
                body.removeEventListener("click", modalPopOff);
            };
        },
        [handler, handleInCapturing]
    );
    return ref;
}