// Shared LoadingSpinner component
export default function LoadingSpinner() {
    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
                width: 40,
                height: 40,
                border: "4px solid rgba(232,97,74,0.25)",
                borderTopColor: "#e8614a",
                borderRadius: "50%",
                animation: "spin 0.75s linear infinite",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
