import React from "react";


function useLocalStorage(itemName, initialValue) {


   const [state, dispatch] = React.useReducer(reducer, initialState({ initialValue }))
   const {
      synconizedItem,
      error,
      loading,
      item,
   } = state

   // Actions creator
   const onError = (err) => dispatch({ type: actionTypes.ERROR, payload: err })
   const onSuccess = (parsedItem) => dispatch({ type: actionTypes.SUCCESS, payload: parsedItem })
   const onSave = (item) => dispatch({
      type: actionTypes.SAVE,
      payload: item
   })
   const onSincronize = () => dispatch({type:actionTypes.SINCRONIZE})

   React.useEffect(() => {
      setTimeout(() => {
         try {
            const localStorageItem = localStorage.getItem(itemName)
            let parsedItem;

            if (!localStorageItem) {
               localStorage.setItem(itemName, JSON.stringify(initialValue))
               parsedItem = []
            } else {
               parsedItem = JSON.parse(localStorageItem)
            }
            onSuccess(parsedItem)
         } catch (err) {
            onError(err)
         }
      }, 2000);
   }, [synconizedItem]);


   const saveItem = (newItem) => {
      try {
         const stringifiedItem = JSON.stringify(newItem)
         localStorage.setItem(itemName, stringifiedItem)
         onSave(newItem)
         // setItem(newItem)
      } catch (err) {
         onError(err)
      }
   }

   const sincronizeItem = () => {
      onSincronize()
   }

   return {
      item,
      saveItem,
      loading,
      error,
      sincronizeItem
   }
}

const initialState = ({ initialValue }) => ({
   synconizedItem: true,
   error: false,
   loading: true,
   item: initialValue,
})

const reducer = (state, action) => {
   return reducerObject(state, action.payload)[action.type] || state
}

const actionTypes = {
   ERROR: 'ERROR',
   SUCCESS: 'SUCCESS',
   SAVE: 'SAVE',
   SINCRONIZE: 'SINCRONIZE'
}


const reducerObject = (state, payload) => ({
   [actionTypes.ERROR]: {
      ...state,
      error: true
   },
   [actionTypes.SUCCESS]: {
      ...state,
      loading: false,
      error: false,
      synconizedItem: true,
      item: payload,
   },
   [actionTypes.SAVE]: {
      ...state,
      item: payload,
   },
   [actionTypes.SINCRONIZE]: {
      ...state,
      loading: true,
      synconizedItem: false
   },
})


export { useLocalStorage } 