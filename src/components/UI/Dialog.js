import { Fragment } from 'react'
import ReactDOM from 'react-dom'

import styles from './Dialog.module.css'

const Dialog = (props) => {
     const { message, fixed, onClose } = props

     const closeHandler = () => {
          if(fixed) {
               return
          }
          onClose()
     }

     return (
          <Fragment>
               {ReactDOM.createPortal(
                    <Fragment>
                         <div className={styles.backdrop} onClick={closeHandler}></div>

                         <dialog className={styles.dialog} open>
                              <h5>{message}</h5>

                              {props.children}

                              {!fixed && <button onClick={closeHandler}>Close</button>}
                         </dialog>
                    </Fragment>,
                    document.getElementById('root')
               )}
          </Fragment>
     )
}

export default Dialog