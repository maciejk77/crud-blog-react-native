import createDataContext from './createDataContext';
import postsReducer from '../reducers/postsReducer';
import jsonServer from '../api/jsonServer';

const getPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get('/posts');

    dispatch({ type: 'GET_POSTS', payload: response.data });
  };
};

const addPost = dispatch => {
  return async (title, content, callback) => {
    await jsonServer.post('/posts', { title, content });
    callback ? callback() : null;
  };
};

const removePost = dispatch => {
  return async id => {
    await jsonServer.delete(`/posts/${id}`);
    dispatch({ type: 'REMOVE_POST', payload: id });
  };
};

const editPost = dispatch => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/posts/${id}`, { title, content });

    dispatch({ type: 'EDIT_POST', payload: { id, title, content } });
    callback ? callback() : null;
  };
};

export const { Context, Provider } = createDataContext(
  postsReducer,
  { addPost, removePost, editPost, getPosts },
  []
);
