import React,{useEffect, useState} from 'react'

const Pagination = ({pages,setCurrentPage,personelAd}) => {


    const numOfPages = [];

    for (let i=1; i <= pages; i++){
        numOfPages.push(i);
    }

    const [currentButton,setCurrentButton] = useState(1);

    useEffect(() => {
      setCurrentPage(currentButton)
    },[currentButton,setCurrentPage])

    return (
        <>
         <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className={` ${currentButton === 1 ? 'page-item disabled' : 'page-item'} `}>
                    <a className="page-link" href="#!" aria-disabled="true"
                    onClick={() => setCurrentButton((prev) => prev === 1 ? prev : prev -1)}
                    >Previous</a>
                  </li>

                {
                    numOfPages.map((page, index) => {
                    return(
                        <li key={index} className={`${currentButton === page ? 'page-item active' : 'page-item'}`}><a className="page-link" href="#!"
                        onClick={() => setCurrentButton(page)}
                        >{page}</a></li>
                    
                    )
                    })
                }


                  <li className={`${currentButton === numOfPages.length ? 'page-item disabled' : 'page-item'}`}>
                    <a className="page-link" href="#!"
                    onClick={() => setCurrentButton((prev) => prev === numOfPages.length ? prev : prev +1)}
                    >Next</a>
                  </li>
                </ul>
              </nav>
        </>
    )
}

export default Pagination
