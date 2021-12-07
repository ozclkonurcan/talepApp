import React,{useState,useEffect} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
import { TextField } from '@mui/material';
import { Stack } from 'react-bootstrap';
import alertify from 'alertifyjs';
import { WindowSharp } from '@mui/icons-material';

const Yetki = (props) => {

    const [sektorList, setSektorList] = useState([]);
 
    const [sektorAd,setSektorAd] = useState('');

    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'sektor')
            .then((response) => {
                setSektorList(response.data);
            })
    },[])
    


    function sektorEkle(){
       
        fetch(process.env.REACT_APP_API+'sektor',{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
              'Accept':'application/json'
          },
          body:JSON.stringify({
              sektorAd
          })
          
      })
      .then((result) => {
          result.status === 200 ? alertify.success("Sektor Eklendi") && window.location.reload(true) : alertify.error("Ekleme işlemi başarısız")
      })
    }



    return (
        <div>
            
   <div class="card">
            <div class="card-body"  style={{height:"85vh"}}>
              <h5 class="card-title">Sektör Listesi
              <button hidden type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
 Sektör Ekle
</button>
              </h5>
              
       <div className="container">
      
       <div className="row g-0 justify-content-center">
           <div className="col-md-12">
           <div className="row g-0 mt-3">
        
           </div>
          
           {/* <BootstrapTable keyField='talepID' columns={columns} data={talepList} /> */}
           <table className="table mt-1 table-bordered">
               <thead className="table-light">
                   <tr>
                       <th>Sektor ID</th>
                       <th>Sektor Ad</th>
                   </tr>
               </thead>
               <tbody>
              
               {
                sektorList && sektorList.length > 0 ?
                   
                sektorList.map(tal => 
               
                   <tr key={tal.sektorID}>
                       <td>{tal.sektorID}</td>
                       <td>{tal.sektorAd}</td>
                    
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

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Sektör</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <Stack>
      <TextField id="outlined-basic" label="Sektör Ekle"  variant="outlined" onChange={(e) => setSektorAd(e.target.value)} />
      </Stack>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
        <button type="button" class="btn btn-primary" onClick={() => sektorEkle()}>Ekle</button>
      </div>
    </div>
  </div>
</div>


       </div>
    )
}

export default Yetki



