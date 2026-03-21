export default function LoadingSpinner() {
    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-main)" }}>
            <div style={{
                width: 48,
                height: 48,
                border: "3px solid rgba(255, 107, 154, 0.15)",
                borderTopColor: "var(--accent-pink)",
                borderRadius: "50%",
                animation: "spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                boxShadow: "0 0 15px var(--accent-glow)",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
