export default function ErrorPage({message}) {
    return <div className="errorPage">
        <h1>Error</h1>
        <p>{message}</p>
    </div>
}