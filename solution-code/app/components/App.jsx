import React from 'react'
import FoodList from './FoodList'
import LikeCounter from './LikeCounter'

class App extends React.Component{
  render() {
    return(
      <div>
        <FoodList/>
        <LikeCounter/>
      </div>
    )
  }
}

export default App
