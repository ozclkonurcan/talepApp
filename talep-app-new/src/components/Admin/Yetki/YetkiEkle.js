import { listClasses } from '@mui/material';
import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import axios from 'axios';

const YetkiEkle = (props) => {

////////////////////////////////////////////
const [StatuAd,setStatuAd] = useState('');


/////////////////////////////////////////////
const [redirect,setRedirect] = useState(false);

const submit = async (e) => {
    e.preventDefault();
//,,
    let data ={StatuAd}
    await fetch(process.env.REACT_APP_API+'statu',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then((result) => {
        //console.war(result);
        result.json().then((resp) => {
                console.log(resp);
        })
    });
    setRedirect(true);
}



if(redirect){

    return <Redirect to="/statuListele"/>;
}

    return (
        <div>
    


      <div class="card">
            <div class="card-body"  style={{height:"85vh"}}>
              <h5 class="card-title">Yetki Kayıt Formu</h5>

              <form class="row g-3"  onSubmit={submit}>
        
              <div class="col-12">
                  <div class="form-floating">
                    <input class="form-control"placeholder="Talep Açıklaması"  value={StatuAd} onChange={(e)=>{setStatuAd(e.target.value)}} name="statuAd"/>
                    <label for="floatingTextarea">Yetki Adı</label>
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

export default YetkiEkle
