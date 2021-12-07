//import { listClasses } from '@mui/material';
import React,{useState,useEffect} from 'react'
//import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import alertify from 'alertifyjs';
const DepartmanEkle = (props) => {
const [sirketList,setSirketList] = useState([]);
const [sektorList,setSektorList] = useState([]);
////////////////////////////////////////////
const [sirketID,setSirketID] = useState('');
const [sektorID,setSektorID] = useState('');
const [departmanAd,setDepartmanAd] = useState('');



/////////////////////////////////////////////
const [redirect,setRedirect] = useState(false);

const submit = async (e) => {
    e.preventDefault();
//,,
    let data ={sektorID,sirketID,departmanAd,}
    await fetch(process.env.REACT_APP_API+'departman',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then((result) => {
      result.status===200 ? alertify.success("Kayıt Başarılı") : result.status === 400 ? alertify.warning("Bu Departman zaten kullanımda") : alertify.error("Kayıt başarısız");
       
        //console.war(result);
        result.json().then((resp) => {
                console.log(resp);
        })
    });
    setRedirect(true);
}



useEffect(() => {
    axios.get(process.env.REACT_APP_API+'sektor')
        .then((response) => {
            setSektorList(response.data);
        })
},[])
useEffect(() => {
    axios.get(process.env.REACT_APP_API+'sirket')
        .then((response) => {
            setSirketList(response.data);
        })
},[])



if(redirect){

    return <Redirect to="/departmanListele"/>;
}

    return (
        <div>
         


      <div class="card">
            <div class="card-body"  style={{height:"85vh"}}>
              <h5 class="card-title">Departman Kayıt Formu</h5>

              <form class="row g-3"  onSubmit={submit}>
              <div class="col-md-6">
                  <label for="inputState" class="form-label">Sektor</label>
                  <select id="inputState" class="form-select" onChange={(e) => setSektorID(e.target.value)}>
                    <option selected>Sektör Seç</option>
                    {sektorList.map(sek => 
                    <option key={sek.sektorID} value={sek.sektorAd} >{sek.sektorAd}</option>
                    )}
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="inputState" class="form-label">Şirket</label>
                  <select id="inputState" class="form-select" onChange={(e) => setSirketID(e.target.value)}>
                    <option selected>Şirket Seç</option>
                    {sirketList.filter(sir => {
                      return sektorID === sir.sektorID
                    }).map(sir => 
                    <option key={sir.sirketID} value={sir.sirketAd} >{sir.sirketAd}</option>
                    )}
                  </select>
                </div>
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" placeholder="Kalem,Silgi,Notebook..." value={departmanAd} onChange={(e)=>{setDepartmanAd(e.target.value)}} name="personelAd"/>
                    <label for="floatingName">Departman Ad</label>
                  </div>
                </div>
             
              
             
                <div class="text-center">
                  <button type="submit" class="btn btn-success w-25 float-end">Kayıt oluştur</button>
                </div>
              </form>

            </div>
          </div>
        </div>
    )
}

export default DepartmanEkle
