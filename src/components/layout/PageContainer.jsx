export function PageContainer({ title, actions, className = "", children }) {
    return (
        <main className={`page-container ${className}`}>
            {(title || actions) && (
                <header className="page-header">
                    {title ? <h1 className="page-title">{title}</h1> : <div />}
                    {actions && <div className="page-actions">{actions}</div>}
                </header>
            )}

            <div className="page-body">{children}</div>
        </main>
    );
}

export default PageContainer