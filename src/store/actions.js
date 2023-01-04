import {
  SET_TODO_INPUT,
  SET_TODO_INPUT_UPDATE,
  SET_TODO_INDEX_UPDATE, ADD_TODO,
  DELETE_TODO, UPDATE_TODO,
  UPDATE_COMPLETED_TODO,
  SET_CHILD_TODO_INPUT,
  SET_CHILD_TODO_INDEX,
  ADD_CHILD_TODO,
  DELETE_CHILD_TODO,
  SET_CHILD_TODO_INDEX_UPDATE,
  SET_CHILD_TODO_INPUT_UPDATE,
  UPDATE_CHILD_TODO,
  UPDATE_COMPLETED_CHILD_TODO
} from './constant'


export const setTodoInput = payload => ({
  type: SET_TODO_INPUT,
  payload
})

export const setTodoInputUpdate = payload => ({
  type: SET_TODO_INPUT_UPDATE,
  payload
})

export const setTodoIndexUpdate = payload => ({
  type: SET_TODO_INDEX_UPDATE,
  payload
})

export const addTodo = payload => ({
  type: ADD_TODO,
  payload
})

export const deleteTodo = payload => ({
  type: DELETE_TODO,
  payload
})

export const updateTodo = payload => ({
  type: UPDATE_TODO,
  payload
})

export const updateCompletedTodo = payload => ({
  type: UPDATE_COMPLETED_TODO,
  payload
})

// Child todo
export const setChildTodoInput = payload => ({
  type: SET_CHILD_TODO_INPUT,
  payload
})

export const setChildTodoIndex = payload => ({
  type: SET_CHILD_TODO_INDEX,
  payload
})

export const addChildTodo = payload => ({
  type: ADD_CHILD_TODO,
  payload
})

export const deleteChildTodo = payload => ({
  type: DELETE_CHILD_TODO,
  payload
})

export const setChildTodoIndexUpdate = payload => ({
  type: SET_CHILD_TODO_INDEX_UPDATE,
  payload
})

export const setChildTodoInputUpdate = payload => ({
  type: SET_CHILD_TODO_INPUT_UPDATE,
  payload
})

export const updateChildTodo = payload => ({
  type: UPDATE_CHILD_TODO,
  payload
})

export const updateCompletedChildTodo = payload => ({
  type: UPDATE_COMPLETED_CHILD_TODO,
  payload
})




