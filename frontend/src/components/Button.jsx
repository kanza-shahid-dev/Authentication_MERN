
function Button({ title, type, onSubmit }) {
    return (
        <button className="bg-indigo-500 text-white p-2 rounded-lg cursor-pointer"
            onClick={onSubmit}
            type={type}
        >{title}</button>

    )
}

export default Button