import React from 'react'
import store from '../reducers/rootReducer'

class LikeCounter extends React.Component{
  like() {
    store.dispatch({type: 'LIKE'})
  }
  dislike() {
    store.dispatch({type: 'DISLIKE'})
  }
  render() {
    return (
      <div>
        <h3>{store.getState().likes}</h3>
        <button onClick={this.like}>Like</button>
        <button onClick={this.dislike}>Dislike</button>
      </div>
    )
  }
}

export default LikeCounter
