import {useEffect} from "react";

export default function usePageTitle(title) {
    useEffect(() => {
        const prevTitle = document.title
        document.title = title ? `${title} | Devlogs+` : 'Devlogs+'
        return () => {
            document.title = prevTitle
        }
    }, [title]);
}