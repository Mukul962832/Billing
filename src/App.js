import { useState } from "react";
import TodoForm from "./TodoForm";
import Todos from "./Todos";
import MonthlyIncomeChart from "./MonthlyIncomeChart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
    const [todos, setTodos] = useState([]);
    const [sortType, setSortType] = useState("all"); // Default sorting: all types
    const [monthlyBudget, setMonthlyBudget] = useState(0); // User-defined monthly budget
    const [maxBudget, setMaxBudget] = useState(0); // User-defined maximum budget
    const [selectedBills, setSelectedBills] = useState([]); // Bills to highlight for minimum budget
    const [maxSelectedBills, setMaxSelectedBills] = useState([]); // Bills to highlight for max budget

    const addTodo = (newTodo) => {
        setTodos((prevState) => [...prevState, newTodo]);
    };

    const removeTodo = (id) => {
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
    };

    const editTodo = (id, updatedTodo) => {
        setTodos((prevState) =>
            prevState.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
        );
    };

    const processDataForGraph = () => {
        const data = {};

        // Filter by type if a specific type is selected
        const filteredTodos = sortType === "all" ? todos : todos.filter((todo) => todo.type === sortType);

        filteredTodos.forEach((todo) => {
            const date = new Date(todo.date);
            const key = `${date.getMonth() + 1}/${date.getFullYear()}`; // Group by month
            data[key] = (data[key] || 0) + todo.price;
        });

        return data;
    };

    const calculateMinimumBills = () => {
        const filteredTodos = sortType === "all" ? todos : todos.filter((todo) => todo.type === sortType);

        // Sort bills by price in ascending order
        const sortedTodos = [...filteredTodos].sort((a, b) => a.price - b.price);

        let total = 0;
        const selected = [];

        for (let i = 0; i < sortedTodos.length; i++) {
            if (total + sortedTodos[i].price <= monthlyBudget) {
                total += sortedTodos[i].price;
                selected.push(sortedTodos[i].id); // Track selected bills
            } else {
                break; // Stop adding more bills
            }
        }

        setSelectedBills(selected); // Highlight selected bills
    };

    const calculateMaximumBills = () => {
        const filteredTodos = sortType === "all" ? todos : todos.filter((todo) => todo.type === sortType);

        // Sort bills by price in ascending order
        const sortedTodos = [...filteredTodos].sort((a, b) => a.price - b.price);

        let total = 0;
        const selected = [];

        for (let i = 0; i < sortedTodos.length; i++) {
            if (total + sortedTodos[i].price <= maxBudget) {
                total += sortedTodos[i].price;
                selected.push(sortedTodos[i].id); // Track selected bills
            } else {
                break; // Stop adding more bills
            }
        }

        setMaxSelectedBills(selected); // Highlight selected bills for max budget
    };

    const uniqueTypes = [...new Set(todos.map((todo) => todo.type))]; // Get unique types

    return (
        <div className="container">
            <ToastContainer />
            <h1 className="main-title">Billing Dashboard</h1>
            <TodoForm addTodo={addTodo} />
            <div className="total-price-box">
                <h3>
                    Total Income: $
                    {todos.reduce((total, todo) => total + todo.price, 0).toFixed(2)}
                </h3>
            </div>
            <div className="filter-sort-box">
                <label>
                    Filter by Type:
                    <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                        <option value="all">All</option>
                        {uniqueTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Monthly Budget:
                    <input
                        type="number"
                        value={monthlyBudget}
                        onChange={(e) => setMonthlyBudget(parseFloat(e.target.value) || 0)}
                        placeholder="Enter budget"
                    />
                </label>
                <button onClick={calculateMinimumBills} className="highlight-btn">
                    Calculate Minimum Bills
                </button>
                <label>
                    Max Budget:
                    <input
                        type="number"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(parseFloat(e.target.value) || 0)}
                        placeholder="Enter max budget"
                    />
                </label>
                <button onClick={calculateMaximumBills} className="highlight-btn max">
                    Calculate Max Bills
                </button>
            </div>
            
            <Todos
                todos={todos.filter((todo) => sortType === "all" || todo.type === sortType)}
                removeTodo={removeTodo}
                editTodo={editTodo}
                selectedBills={selectedBills}
                maxSelectedBills={maxSelectedBills}
            />

<MonthlyIncomeChart incomeData={processDataForGraph()} />
        </div>
    );
}

export default App;
