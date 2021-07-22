import { usePagination } from '../../hooks/use-pagination' 
import styles from './Pagination.module.css'

const Pagination = props => {
     const {
          onPageChange,
          totalCount,
          siblingCount = 1,
          currentPage,
          pageSize,
          className
     } = props

     const paginationRange = usePagination({
          currentPage,
          totalCount,
          siblingCount,
          pageSize
     })

     // If there are less than 2 times in pagination range we shall not render the component
     if (currentPage === 0 || paginationRange.length < 2) {
          return null
     }

     const onNext = () => {
          onPageChange(currentPage + 1)
     }

     const onPrevious = () => {
          onPageChange(currentPage - 1)
     }

     let lastPage = paginationRange[paginationRange.length - 1]

     return (
          <ul
               className={`${styles['pagination-container']} ${className}`}
          >
               <li
                    className={`${styles['pagination-item']} ${currentPage === 1 && styles['disabled']}`}
                    onClick={onPrevious}
               >
                    <div className={`${styles.arrow} ${styles.left}`} />
               </li>
               {paginationRange.map(pageNumber => {
                    if (pageNumber === 'DOTS') {
                         return (
                              <li 
                                   key={'dots' + (Math.random() * 10).toFixed(3)} 
                                   className={`${styles['pagination-item']} ${styles.dots}`}
                              >
                                   &#8230;
                              </li>
                         )
                    }

                    return (
                         <li
                              key={pageNumber}
                              className={`
                                   ${styles['pagination-item']} 
                                   ${pageNumber === currentPage && styles['selected']}
                              `}
                              onClick={() => onPageChange(pageNumber)}
                         >
                              {pageNumber}
                         </li>
                    )
               })}

               <li
                    className={`
                         ${styles['pagination-item']} 
                         ${currentPage === lastPage && styles['disabled']}
                    `}
                    onClick={onNext}
               >
                    <div className={`${styles.arrow} ${styles.right}`} />
               </li>
          </ul>
     )
}

export default Pagination