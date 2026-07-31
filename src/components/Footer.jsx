import "../styles/Footer.css"

function Footer() {
    const currentDate = new Date().toLocaleDateString("en-CA")

    return (
        <footer className="documentation-footer">
            <p>
                <strong>DU1080 HW4 API</strong> was developed by Yuxuan Sun / Tiffany Jia. 
            </p>

            <p>
                Last updated: {currentDate}
            </p>

            <p>
                Built with React, MDX, Vite, and GitHub Pages.
            </p>
        </footer>
    )
}

export default Footer