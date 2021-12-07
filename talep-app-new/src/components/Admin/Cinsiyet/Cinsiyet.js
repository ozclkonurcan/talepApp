import React,{useState,useEffect} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
const Cinsiyet = (props) => {

    const [cinsiyetList, setCinsiyetList] = useState([]);
 

    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'cinsiyet')
            .then((response) => {
                setCinsiyetList(response.data);
            })
    },[])

    return (
        <div>
        <div class="card">
       <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
            <h1>Cinsiyet Listesi</h1>
       <div className="container">
      
       <div className="row g-0 justify-content-center">
           <div className="col-md-12">
           <div className="row g-0 mt-3">
        
           </div>
          
           {/* <BootstrapTable keyField='talepID' columns={columns} data={talepList} /> */}
           <table className="table mt-1 table-bordered">
               <thead className="table-light">
                   <tr>
                       <th>Cinsiyet ID</th>
                       <th>Cinsiyet Ad</th>
                   </tr>
               </thead>
               <tbody>
              
               {
                cinsiyetList && cinsiyetList.length > 0 ?
                   
                cinsiyetList.map(tal => 
               
                   <tr key={tal.cinsiyetID}>
                       <td>{tal.cinsiyetID}</td>
                       <td>{tal.cinsiyetAd}</td>
                    
                   </tr>
                      
                   
                   )
                   :"Yükleniyor"
                   }
              
               </tbody>
               
           </table>
   
           </div>
       </div>
       </div>
       </div>
       </div>
       </div>
    )
}

export default Cinsiyet
