export default postsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return action.payload;
    case 'EDIT_POST':
      return state.map(post => {
        return post.id === action.payload.id ? action.payload : post;
      });
    case 'REMOVE_POST':
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};
