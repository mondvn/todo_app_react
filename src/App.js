import { useStore, actions } from './store'
import React, { useRef, useState, useEffect } from 'react'
import clsx from 'clsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react/headless';
import './App.css'
import { faEllipsis, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [state, dispatch] = useStore()
  const { todos, todoInput, todoInputUpdate, todoIndexUpdate, todoInputChild, todoIndexAddChild, todoIndexUpdateChild, todoInputUpdateChild } = state
  const [isAddChildTodo, setIsAddChildTodo] = useState(false)

  // Update
  const inputRef = useRef()
  const inputUpdateRef = useRef()
  const inputAddChild = useRef()

  const handleAdd = () => {
    if (todoInput === "") {
      alert("Vui lòng điền thông tin!");
      return
    }
    dispatch(actions.addTodo(todoInput))
    inputRef.current.focus()
    dispatch(actions.setTodoInput(''))
  }

  const handleDelete = (index) => {
    dispatch(actions.deleteTodo(index))
  }

  const handleBeforeUpdate = (content, index) => {
    dispatch(actions.setTodoInputUpdate(content))
    dispatch(actions.setTodoIndexUpdate(index))
  }

  const handleUpdate = () => {
    // inputUpdateRef.current.focus()
    const data = {
      index: todoIndexUpdate,
      content: todoInputUpdate
    }
    dispatch(actions.updateTodo(data))

    // Reset UI
    resetUIAfterUpdateTodo()
  }
  const resetUIAfterUpdateTodo = () => {
    dispatch(actions.setTodoIndexUpdate(null))
    dispatch(actions.setTodoInputUpdate(""))
  }

  const handleUpdateCompleted = index => {
    dispatch(actions.updateCompletedTodo(index))
  }

  // Child todo
  const handleBeforeAddChild = (index) => {
    setIsAddChildTodo(true)
    dispatch(actions.setChildTodoIndex(index))
    inputAddChild.current.focus()
  }

  const handleAddChild = () => {
    const data = {
      index: todoIndexAddChild,
      content: todoInputChild
    }
    dispatch(actions.addChildTodo(data))

    // reset UI
    setIsAddChildTodo(false)
    dispatch(actions.setChildTodoIndex(null))
    dispatch(actions.setChildTodoInput(''))
  }

  const handleCancleAddChild = () => {
    setIsAddChildTodo(false)
    dispatch(actions.setChildTodoIndex(null))
    dispatch(actions.setChildTodoInput(''))
  }

  const handleDeleteChild = (index, index_child) => {
    dispatch(actions.deleteChildTodo([index, index_child]))
  }

  const handleBeforeUpdateChild = (content, parent_index, child_index) => {
    console.log(content, parent_index, child_index);
    dispatch(actions.setChildTodoIndexUpdate([parent_index, child_index]))
    dispatch(actions.setChildTodoInputUpdate(content))

  }

  const handleUpdateChild = () => {
    const data = {
      parent_index: todoIndexUpdateChild[0],
      child_index: todoIndexUpdateChild[1],
      content: todoInputUpdateChild
    }
    dispatch(actions.updateChildTodo(data))

    // reset UI
    resetUIAfterUpdateChildTodo()
  }

  const resetUIAfterUpdateChildTodo = () => {
    dispatch(actions.setChildTodoIndexUpdate([]))
    dispatch(actions.setChildTodoInputUpdate(''))
  }

  const handleUpdateCompletedChild = (index, child_index) => {
    const data = {
      parent_index: index,
      child_index,
    }
    dispatch(actions.updateCompletedChildTodo(data))
  }


  return (
    <div className={clsx('app')}
    >
      <div className={clsx("header", {
        'add-child': isAddChildTodo
      })}>
        <h1 className={clsx("header__title")}>todos</h1>
        <input
          className={clsx("header__input")}
          ref={inputRef}
          value={todoInput}
          placeholder="Add a task..."
          onChange={e => {
            dispatch(actions.setTodoInput(e.target.value))
          }}
          onKeyUp={e => { (e.keyCode === 13 && handleAdd()) || (e.keyCode === 27 && dispatch(actions.setTodoInput(""))) }}
          onBlur={() => { dispatch(actions.setTodoInput("")) }}
        />
        <input
          className={clsx("child__input")}
          ref={inputAddChild}
          value={todoInputChild}
          placeholder='Add a child task...'
          onChange={e => {
            dispatch(actions.setChildTodoInput(e.target.value))
          }}
          onKeyUp={e => { (e.keyCode === 13 && handleAddChild()) || (e.keyCode === 27 && handleCancleAddChild() )}}
          onBlur={() => handleCancleAddChild()}
        />
      </div>
      <div className={clsx("content")}>
        <ul className={clsx("todo-list")}>
          {todos.map((todo, index) => (
            <li
              className={clsx('todo-item', {
                'completed': todo.completed,
                'editting': todoIndexUpdate === index
              })}
              key={index}
            >
              <div className={clsx("todo-item__wrapper")}
                onDoubleClick={() => handleBeforeUpdate(todo.content, index)}
              >
                <div className={clsx("todo-item__label")}>
                  <input
                    className={clsx("todo-item--checked")}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleUpdateCompleted(index)}
                  />
                  <span className={clsx("todo-item__content")}>{todo.content}</span>
                </div>
                <Tippy
                  interactive
                  hideOnClick
                  render={attrs => (
                    <div className="todo-item__control" tabIndex="-1" {...attrs}>
                      <div className="todo-item--add-child"
                        onClick={() => handleBeforeAddChild(index)}
                      >
                        <button className={clsx("btn-add-child")}>
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <span className={clsx('todo-item__control-label')}>Add child todo</span>
                      </div>
                      <div
                        className="todo-item--delete"
                        onClick={() => handleDelete(index)}
                      >
                        <button className={clsx("btn-delete")}>
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        <span className={clsx('todo-item__control-label')}>Delete</span>
                      </div>
                    </div>
                  )}
                >
                  <button
                    className={clsx("btn-delete")}
                    onClick={() => handleDelete(index)}
                  >
                    <FontAwesomeIcon icon={faEllipsis} />
                  </button>
                </Tippy >
              </div>
              <input
                ref={inputUpdateRef}
                className={clsx("todo-item__input")}
                value={todoInputUpdate}
                onChange={e => {
                  dispatch(actions.setTodoInputUpdate(e.target.value))
                }}
                onKeyUp={e => { (e.keyCode === 13 && handleUpdate()) || (e.keyCode === 27 && resetUIAfterUpdateTodo()) }}
                onBlur={() => { resetUIAfterUpdateTodo() }}
              />
              <ul className={clsx("child-list")}>
                {todo.childTodos.map((childTodo, child_index) => (
                  <li key={child_index}
                    className={clsx("child-item", {
                      'completed': childTodo.completed,
                      'editting': todoIndexUpdateChild[1] === child_index & todoIndexUpdateChild[0] === index
                    })}
                    onDoubleClick={() => handleBeforeUpdateChild(childTodo.childContent, index, child_index)}
                  >
                    <div className={clsx("child-wrapper")}>
                      <div className={"child-label"}>
                        <input
                          className={clsx("child-checked")}
                          type="checkbox"
                          checked={childTodo.completed}
                          onChange={() => handleUpdateCompletedChild(index, child_index)}
                        />
                        <span className={clsx("child-content")}>{childTodo.childContent}</span>
                      </div>
                      <button
                        className={clsx("child-btn-delete")}
                        onClick={() => handleDeleteChild(index, child_index)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                    <input
                      className={clsx("child-input")}
                      ref={inputUpdateRef}
                      value={todoInputUpdateChild}
                      onChange={e => { dispatch(actions.setChildTodoInputUpdate(e.target.value)) }}
                      onKeyUp={e => {
                        (e.keyCode === 13 && handleUpdateChild()) ||
                          (e.keyCode === 27 && resetUIAfterUpdateChildTodo())
                      }}
                      onBlur={() => { resetUIAfterUpdateChildTodo() }}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App;
