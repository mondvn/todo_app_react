import {
  SET_TODO_INPUT,
  SET_TODO_INPUT_UPDATE,
  SET_TODO_INDEX_UPDATE,
  ADD_TODO, DELETE_TODO,
  UPDATE_TODO,
  UPDATE_COMPLETED_TODO,
  SET_CHILD_TODO_INPUT,
  SET_CHILD_TODO_INDEX,
  ADD_CHILD_TODO,
  DELETE_CHILD_TODO,
  SET_CHILD_TODO_INDEX_UPDATE,
  SET_CHILD_TODO_INPUT_UPDATE,
  UPDATE_CHILD_TODO,
  UPDATE_COMPLETED_CHILD_TODO
} from "./constant"

const initState = {
  todos: [],
  todoInput: '',
  todoInputUpdate: '',
  todoInputChild: '',
  todoInputUpdateChild: '',
  todoIndexUpdateChild: [],
  todoIndexUpdate: null,
  todoIndexAddChild: null
}



function reducer(state, action) {
  switch (action.type) {
    case SET_TODO_INPUT:
      return {
        ...state,
        todoInput: action.payload
      }
    case SET_TODO_INPUT_UPDATE:
      return {
        ...state,
        todoInputUpdate: action.payload
      }
    case SET_TODO_INDEX_UPDATE:
      return {
        ...state,
        todoIndexUpdate: action.payload
      }
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, {
          content: action.payload, completed: false, childTodos: [
            {
              childContent: 'Child content 1',
              completed: false
            }, {
              childContent: 'Child content 2',
              completed: true
            }
          ]
        }]
      }
    case DELETE_TODO:
      const newTodosDel = [...state.todos]
      newTodosDel.splice(action.payload, 1)
      return {
        ...state,
        todos: newTodosDel
      }
    case UPDATE_COMPLETED_TODO:
      // const newTodosUpdateCompleted = [...state.todos.slice(0, +action.payload),
      // { ...state.todos[+action.payload], completed: !state.todos[+action.payload].completed },
      // ...state.todos.slice(+action.payload + 1)
      // ]
      const newUpdateCompletedAllChildTodos = [...state.todos[action.payload].childTodos.map(childTodo => ({
        ...childTodo,
        completed: !state.todos[action.payload].completed
      }))]
      const newTodosUpdateCompleted = [
        ...state.todos.slice(0, action.payload),
        {...state.todos[action.payload],
          completed:!state.todos[action.payload].completed,
          childTodos: newUpdateCompletedAllChildTodos
        },
        ...state.todos.slice(action.payload + 1)
      ]
      return {
        ...state,
        todos: newTodosUpdateCompleted
      }
    case UPDATE_TODO:
      const newTodosUpdateContent = [...state.todos.slice(0, +action.payload.index),
      { ...state.todos[action.payload.index], content: action.payload.content },
      ...state.todos.slice(+action.payload.index + 1)
      ]
      return {
        ...state,
        todos: newTodosUpdateContent
      }
    // Child todo
    case SET_CHILD_TODO_INPUT:
      return {
        ...state,
        todoInputChild: action.payload
      }

    case SET_CHILD_TODO_INDEX:
      return {
        ...state,
        todoIndexAddChild: action.payload
      }

    case ADD_CHILD_TODO:
      const newChildTodos = [...state.todos[action.payload.index].childTodos.concat({
        childContent: action.payload.content, completed: false
      })]
      const newTodosAddChild = [
        ...state.todos.slice(0, action.payload.index),
        { ...state.todos[action.payload.index], childTodos: newChildTodos },
        ...state.todos.slice(action.payload.index + 1)
      ]
      return {
        ...state,
        todos: newTodosAddChild
      }
    case DELETE_CHILD_TODO:
      const [parent_index, child_index] = action.payload
      const newChildTodosDelete = [...state.todos[parent_index].childTodos.filter((_, index) => index !== child_index)]
      const newTodosDeleteChild = [
        ...state.todos.slice(0, parent_index),
        { ...state.todos[parent_index], childTodos: newChildTodosDelete },
        ...state.todos.slice(parent_index + 1)
      ]
      return {
        ...state,
        todos: newTodosDeleteChild
      }
    case SET_CHILD_TODO_INDEX_UPDATE:
      return {
        ...state,
        todoIndexUpdateChild: action.payload
      }
    case SET_CHILD_TODO_INPUT_UPDATE:
      return {
        ...state,
        todoInputUpdateChild: action.payload
      }
    case UPDATE_CHILD_TODO:
      const newChildTodosUpdate = [
        ...state.todos[action.payload.parent_index].childTodos.slice(0, action.payload.child_index),
        { ...state.todos[action.payload.parent_index].childTodos[action.payload.child_index], childContent: action.payload.content },
        ...state.todos[action.payload.parent_index].childTodos.slice(action.payload.child_index + 1)
      ]
      const newTodosUpdateChild = [
        ...state.todos.slice(0, action.payload.parent_index),
        { ...state.todos[action.payload.parent_index], childTodos: newChildTodosUpdate },
        ...state.todos.slice(action.payload.parent_index + 1)
      ]
      return {
        ...state,
        todos: newTodosUpdateChild
      }
    case UPDATE_COMPLETED_CHILD_TODO:
      console.log(action.payload);
      const newChildTodosUpdateCompleted = [
        ...state.todos[action.payload.parent_index].childTodos.slice(0, action.payload.child_index),
        {
          ...state.todos[action.payload.parent_index].childTodos[action.payload.child_index],
          completed: !state.todos[action.payload.parent_index].childTodos[action.payload.child_index].completed
        },
        ...state.todos[action.payload.parent_index].childTodos.slice(action.payload.child_index + 1)
      ]
      const newTodosUpdateChildCompleted = [
        ...state.todos.slice(0, action.payload.parent_index),
        {...state.todos[action.payload.parent_index], childTodos: newChildTodosUpdateCompleted},
        ...state.todos.slice(action.payload.parent_index + 1)
      ]
      return {
        ...state,
        todos: newTodosUpdateChildCompleted
      }
    default:
      throw new Error('Invalid action')
  }
}
export { initState }
export default reducer