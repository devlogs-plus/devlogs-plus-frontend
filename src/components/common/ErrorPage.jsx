import usePageTitle from "../../hooks/usePageTitle.js";

export default function ErrorPage({message}) {
    usePageTitle('Error')
    return <div className="errorPage">
        <h1>Error</h1>
        <p>{message}</p>
    </div>
}