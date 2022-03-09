import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

const initialState = {
  successMessage: '',
  todos: [],
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  getTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({
          ...this.state,
          todos: res.data.data,
          successMessage: res.data.message
        })
        console.log('Grabbing State', this.state)
      })
      .catch(err => {
        this.setState({ ...this.state, errorMessage: 'Uh Oh' })
      })
  }

  componentDidMount() {
    this.getTodos()
  }


  handleNew = (name) => {
    const newTodo = {
      name: name,
      completed: false
    }
    axios.post(URL, newTodo)
      .then(res => {
        this.setState({
          ...this.state, todos: [...this.state.todos, res.data.data]
        });
      })
      .catch(err => {
        this.setState({
          ...this.state,
          errorMessage: err.response.data.message,
        })
      })
  }

  handleCompleted = () => {
    this.setState({
      ...this.state, todos: this.state.todos.filter(todo => {
        return (todo.completed === false)
      })
    })
  }

  handleToggle = (clickedId) => {
    axios.patch(`${URL}/${clickedId}`)
      .then(res => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map(todo => {
            if (todo.id === clickedId) {
              return {
                ...todo, completed: !todo.completed
              }
            }
            return todo
      })
      })
    })

  }


  render() {
    const { todos } = this.state;
    return (
      <div>
        <h1>Todos:</h1>
        <TodoList handleToggle={this.handleToggle} todos={todos} />
        <Form handleNew={this.handleNew} />
        <button onClick={this.handleCompleted}>Clear Completed</button>
      </div>
    )
  }
}
