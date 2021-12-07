import React,{useState,useEffect} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
const Yetki = (props) => {

    const [sirketList, setSirketList] = useState([]);
    const [sektorList, setSektorList] = useState([]);
    const [sektorID,setSektorID] = useState('');
    const [sirketID,setSirketID] = useState('');

    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'sirket')
            .then((response) => {
                setSirketList(response.data);
            })
    },[])

    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'sektor')
            .then((response) => {
                setSektorList(response.data);
            })
    },[])
   

    return (
        <div>
          <div class="card">
            <div class="card-body"  style={{height:"85vh"}}>
              <h5 class="card-title">Şirket Listesi</h5>
       <div className="container">
       <div className="row">
        <div class="col-md-12">
                  <select id="inputState" class="form-select" onChange={(e) => (setSektorID(e.target.value))}>
                    <option selected>Sektör Seç</option>
                    {sektorList.map(sek => 
                    <option key={sek.sektorID} value={sek.sektorAd}>{sek.sektorAd}</option>
                    )}
                  </select>
                </div>
               
        </div>
       <div className="row g-0 justify-content-center">
           <div className="col-md-12">
           <div className="row g-0 mt-3">
        
           </div>
          
           {/* <BootstrapTable keyField='talepID' columns={columns} data={talepList} /> */}
           <table className="table mt-1 table-bordered">
               <thead className="table-light">
                   <tr>
                       <th>Sirket ID</th>
                       <th>Sektor Ad</th>
                       <th>Şirket Ad</th>
                   </tr>
               </thead>
               <tbody>
              
               {
                sirketList && sirketList.length > 0 ?
                   
                sirketList.filter(sir => {
                    return sektorID === sir.sektorID
                }).map(tal => 
               
                   <tr key={tal.sirketID}>
                       <td>{tal.sirketID}</td>
                       <td>{tal.sektorID}</td>
                       <td>{tal.sirketAd}</td>
                    
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
