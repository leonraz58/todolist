import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

const truck1name = 'What to learn1';

const tasks1 = [
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 3, title: "Python", isDone: false}
]

const tasks2 = [
    {id: 1, title: "Hello", isDone: true},
    {id: 2, title: "World", isDone: true},
    {id: 3, title: "Mazafaka", isDone: false}
]

function App() {
    return (
        <div className="App">
            <Todolist truck={truck1name} truck2 = {12345} tasks={tasks1}/>
            <Todolist truck={'What to learn2'} tasks={tasks2}/>
        </div>
    );
}

export default App;
