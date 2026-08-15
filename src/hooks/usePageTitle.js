import {useEffect} from "react";

export default function usePageTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} | Devlogs+` : 'Devlogs+'
        return () => {
            document.title = 'Devlogs+'
        }
    }, [title]);
}