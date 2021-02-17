import React, {useState, useEffect} from 'react';
import './App.css';
import {todos} from './utils/todos'

import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

// ListGroup.Item to avoid typing listgroup a bunch of times i destructure the Item out
const { Item } = ListGroup;


function App() {
  // this.state = {showTodos: false}  < equivalent
  const [showTodos, setShowTodos] = useState(false);
  const [activeTodo, setActiveTodo] = useState(null);
  const [todoList, setTodos] = useState([])

  useEffect(() => {
    // we need to set the todos to state when the component loads up
    setTodos(todos)
  });

  function handleShowTodos(){
    setShowTodos(!showTodos)
  }

  function markCompleted(activeTodoId){
    const updatedTodos = todoList.map(
      (todo)=> {
        // only modify the completed of the todo we just clicked on
        if(todo.id === activeTodoId){
          todo.completed = true;
        }
        return todo
      }
    )

    setTodos(updatedTodos)
  }

  return (
    <Container className="App">
     <Jumbotron>
      <h1>Todo List</h1>
      <p>
        If you want to see my secret todo list, click below!!!
      </p>
      <p>
        <Button variant="primary" size="lg" onClick={handleShowTodos}>{showTodos ?
        'Hide Todos'
        :
        'Take a Peak'
      }</Button>
      </p>
    </Jumbotron>

    {showTodos && <ListGroup>
        {todos.map( ({title, id, completed}) => <Item variant={completed && "success"} action onClick={()=> setActiveTodo(id)}>{title}</Item>)}
      </ListGroup>}
<br/> <hr/> <br/>
    {showTodos && <ListGroup>
        {todoList.map( ({title, id, completed}) => <Card as={ Item}>
        <Card.Header>{completed ? "Completed" : "Pending"}</Card.Header>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              Some info about my Todo
            </Card.Text>

            <Button variant="primary" onClick={() => markCompleted(id)
                  // this trick of "Copying the variable into callback function is called a closure
                 }>Mark as completed</Button>
          </Card.Body>
        </Card>
      )}
      </ListGroup>}
    </Container>
  );
}

export default App;
