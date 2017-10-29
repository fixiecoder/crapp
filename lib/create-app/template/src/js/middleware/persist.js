export default store => next => action => {
  next(action);
  switch(action.type) {
    default:
      localStorage.setItem('state', JSON.stringify(store.getState().toJS()));
  }
};
