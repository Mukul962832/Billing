import React from "react";
import Todo from "./Todo";

function Todos({ todos, removeTodo, editTodo, selectedBills, maxSelectedBills }) {
    return (
        <div>
            {todos.map((todo) => (
                <Todo
                    key={todo.id}
                    {...todo}
                    removeTodo={removeTodo}
                    editTodo={editTodo}
                    isSelected={selectedBills.includes(todo.id)} // Highlight for minimum budget
                    isMaxSelected={maxSelectedBills.includes(todo.id)} // Highlight for max budget
                />
            ))}
        </div>
    );
}

export default Todos;
