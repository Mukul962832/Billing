import React from "react";
import { ImCross, ImPencil } from "react-icons/im";

function Todo({ id, title, type, price, date, isSelected, isMaxSelected, removeTodo, editTodo }) {
    return (
        <div
            className={`todo ${
                isSelected ? "highlight" : isMaxSelected ? "highlight-max" : ""
            }`}
        >
            <div className="todo-details">
                <p>
                    <strong>Title:</strong> {title}
                </p>
                <p>
                    <strong>Type:</strong> {type}
                </p>
                <p>
                    <strong>Price:</strong> ${price.toFixed(2)}
                </p>
                <p>
                    <strong>Date:</strong> {date}
                </p>
            </div>
            <div className="todo-actions">
                <button onClick={() => editTodo(id)} className="edit-btn">
                    <ImPencil />
                </button>
                <button onClick={() => removeTodo(id)} className="delete-btn">
                    <ImCross />
                </button>
            </div>
        </div>
    );
}

export default Todo;
