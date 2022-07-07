export const ModuleLoader = () => {
    return (
        <div className="overlay active flex justify-center items-center">
            <div style={{ maxWidth: '80%' }}>
                <svg height="100" width="100" viewBox="0 0 100 100">
                    <circle className="loader-svg bg" cx="50" cy="50" r="45"></circle>
                    <circle className="loader-svg animate" cx="50" cy="50" r="45"></circle>
                </svg>
            </div>
        </div>
    )
}
