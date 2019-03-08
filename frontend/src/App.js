/** @jsx jsx */
import { Component } from 'react';
import moment from 'moment'
import { css, jsx } from '@emotion/core'

const appStyle = css`
  font-family: "Comic Sans MS", cursive, sans-serif;
  text-align: center;
  margin: 100px;
`

const headerStyle = css` 
  padding: 50px;
  font-weight: 400;
`

const daysSince = (dateString) => {
  const diff = moment().diff(moment(dateString))
  const duration = moment.duration(diff).asDays()
  return Math.floor(duration)
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { ministers: [] }
  }

  componentDidMount() {
    fetch("http://localhost:4000/data")
    .then(response => {
      return response.json()
    })
    .then(ministers => {
      this.setState({ministers})
    })
    .catch(error => {
      console.log("Error:", error)
    })
  }

  render() {
    const currentMinister = this.state.ministers.slice(-1)[0]
    const daysSinceChange = currentMinister ? daysSince(currentMinister.startDate) : 'unknown'
    return (
      <div css={appStyle}>
        <h1 css={headerStyle}>
          It has been {daysSinceChange} days since getting a new Minister.
        </h1>
      </div>
    );
  }
}

export default App;