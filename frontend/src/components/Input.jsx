
function Input({ name, type, placeholder, value, onChange, required }) {
    return (
        <input type={type} placeholder={placeholder} name={name}
            value={value} onChange={onChange} required={required}
            className="border-indigo-300 border-1 h-8 py-4 px-2 rounded" />
    )
}

export default Input