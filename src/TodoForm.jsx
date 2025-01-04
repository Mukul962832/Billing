import { useState } from "react";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

function TodoForm({ addTodo }) {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !type.trim() || !price.trim() || !date.trim()) {
            toast.info("Please fill all fields!", { autoClose: 2000 });
            return;
        }
        const newTodo = {
            id: uuid(),
            title,
            type,
            price: parseFloat(price),
            date, // Use manually entered date
        };
        addTodo(newTodo);
        setTitle("");
        setType("");
        setPrice("");
        setDate("");
    };

    return (
        <form onSubmit={handleSubmit} className="todoForm">
            <input
                type="text"
                className="todoForm__input"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                className="todoForm__input"
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <input
                type="number"
                className="todoForm__input"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="date"
                className="todoForm__input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit" className="todoForm__btn">
                Add
            </button>
        </form>
    );
}

export default TodoForm;
