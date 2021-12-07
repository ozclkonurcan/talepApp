import React,{useState,useEffect} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
const Yetki = (props) => {

    const [statuList, setStatuList] = useState([]);
 

    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'statu')
            .then((response) => {
                setStatuList(response.data);
            })
    },[])

    return (
        <div>
          <div class="card">
            <div class="card-body"  style={{height:"85vh"}}>
              <h5 class="card-title">Yetkiler</h5>
       <div className="container">
      
       <div className="row g-0 justify-content-center">
           <div className="col-md-12">
           <div className="row g-0 mt-3">
        
           </div>
          
           {/* <BootstrapTable keyField='talepID' columns={columns} data={talepList} /> */}
           <table className="table mt-1 table-bordered">
               <thead className="table-light">
                   <tr>
                       <th>Yetki ID</th>
                       <th>Yetki Ad</th>
                   </tr>
               </thead>
               <tbody>
              
               {
                   statuList && statuList.length > 0 ?
                   
                   statuList.map(tal => 
               
                   <tr key={tal.statuID}>
                       <td>{tal.statuID}</td>
                       <td>{tal.statuAd}</td>
                    
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

export default Yetki
