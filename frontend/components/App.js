import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

const initialState = {
  successMessage: '',
  todos : [
    {name: '', id: '', completed: false}
  ]
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }
    
  componentDidMount() {
    this.getTodos()
  }

  getTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({
          ...this.state,
          todos: res.data.data,
          successMessage: res.data.message
        })
      })
      .catch(err => {
        this.setState({ ...this.state, errorMessage: 'Uh Oh' })
      })
  }
    

  render() {
    return (
      <h1>Todos: </h1>
    )
  }
}
