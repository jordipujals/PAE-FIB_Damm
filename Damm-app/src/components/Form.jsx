import "./Form.css"

export function Form() {
    return(
        <section>
            <h1>Login</h1>

            <form className="form">
                <input type="text" />
                <input type="password" />
                <button>Login</button>
            </form>
        </section>
    )
}