import styles from './SecondarySpinner.module.css'

const SecondarySpinner = () => {
     return (
          <div className={`spinner-border text-secondary ${styles.spinner}`} role="status">
               <span className="visually-hidden">Loading...</span>
          </div>
     )
}

export default SecondarySpinner