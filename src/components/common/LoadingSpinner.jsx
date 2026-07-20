export default function LoadingSpinner() {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <svg width="48" height="48" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="25" cy="25" r="20" fill="none" stroke="#888" strokeWidth="5" strokeLinecap="round" strokeDasharray="31.4 31.4">
                    <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="260 25 25" dur="0.9s" repeatCount="indefinite"/>
                </circle>
            </svg>
        </div>
    )
}