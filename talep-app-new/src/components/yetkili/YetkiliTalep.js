import React,{useState,useEffect,useRef} from 'react'
import {Redirect} from 'react-router-dom'

import emailjs from 'emailjs-com';
import alertify from 'alertifyjs';
import axios from 'axios'
import Swal from 'sweetalert2'
import { FormControl } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import moment from 'moment'
const YetkiliTalep = (props) => {

    const [personelID,setPersonelID] = useState(props.PersonelID);
const [personelEmail,setPersonelEmail] = useState(props.PersonelEmail);
    const [personelStatuID,setPersonelStatuID] = useState(props.PersonelStatuID);
const [sektorID,setSektorID] = useState(props.PersonelSektorID);
const [sirketID,setSirketID] = useState(props.PersonelSirketID);
const [departmanID,setDepartmanID] = useState(props.PersonelDepartmanID);
const [talepAd,setTalepAd] = useState('');
const [talepAciklamasi,setTalepAciklamasi] = useState('');
const [talepMiktar,setTalepMiktar] = useState('');
const [talepTahminiDeger,setTalepTahminiDeger] = useState('');
const [talepPersonelResim,setTalepPersonelResim] = useState(props.PersonelResim);

const [agirlikBirimi,setAgirlikBirimi] = useState('');
const [paraBirimi,setParaBirimi] = useState('');


// const d = new Date();
// let text = d.toLocaleString();
let text = moment().format("YYYY-MM-DD");
const [talepTarih,setTalepTarih] = useState(text);
/////////////////////////////////////////////
const [redirect,setRedirect] = useState(false);

const [mailYetkili,setMailYetkili] = useState([])

const [talepList,setTalepList] = useState([])

useEffect(() => {
  axios.get(process.env.REACT_APP_API+'personel')
      .then((response) => {
        setMailYetkili(response.data);
      })
},[])
useEffect(() => {
  axios.get(process.env.REACT_APP_API+'talep')
      .then((response) => {
        setTalepList(response.data);
      })
},[])
const submit = async (e) => {
    e.preventDefault();

    let data ={personelID,talepPersonelResim,talepTarih,paraBirimi,agirlikBirimi,personelEmail,personelStatuID,sektorID,sirketID,departmanID,talepAd,talepAciklamasi,talepMiktar,talepTahminiDeger}
    await fetch(process.env.REACT_APP_API+'talep',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then((result) => {



      result.status === 200 ? 
      alertify.success('Talep Gönderildi') &&     setRedirect(true):
      result.status === 400 ? 
      Swal.fire({
        icon: 'error',
        title: 'Kayıt Hatası',
        text: 'Boş Kayıt Oluşturamazsın yada Daha önce yaptığın bir talep sonuçlanma dan tekrar aynı talebi oluşturamazsın!',
        // footer: '<a href="">Why do I have this issue?</a>'
        confirmButtonText: 'Tamam'
      })
      :
		alertify.error('Talep Başarısız')
    
        //console.war(result);
        result.json().then((resp) => {
                // console.log(resp);
        })
    });


   
    emailjs.sendForm('service_talepApp', 'template_livo6cd', e.target, 'user_Vo7InhnodJW9RQgXoum5s')
      .then((result) => {
          // console.log(result.text);
      }, (error) => {
          // console.log(error.text);
      });
}
  const form = useRef();

if(redirect){

    return <Redirect to="/yetkiliBekleyenDurum"/>;
}

    return (



<div>
         


         <div class="card">
         
               <div class="card-body"  style={{height:"85vh"}}>
                 <h5 class="card-title">Yetkili Talep Oluşturma Formu</h5>
                 <input className="form-control mt-3" value={personelID} onChange={(e)=>{setPersonelID(e.target.value)}} name="personelID" disabled hidden />
            <input className="form-control mt-3" value={personelStatuID} onChange={(e)=>{setPersonelStatuID(e.target.value)}} name="personelID" disabled hidden />
            <input className="form-control mt-3" value={sektorID} onChange={(e)=>{setSektorID(e.target.value)}} name="sektorID" disabled hidden  />
            <input className="form-control mt-3" value={sirketID} onChange={(e)=>{setSirketID(e.target.value)}} name="sirketID" disabled hidden />
            <input className="form-control mt-3" value={departmanID} onChange={(e)=>{setDepartmanID(e.target.value)}} name="departmanID" disabled hidden />
       
                 <form class="row g-3" ref={form}  onSubmit={submit}>
                 {mailYetkili.filter(mailYet => {
  // console.log(props.departmanID)
  return mailYet.departmanID === (props.PersonelDepartmanID === 1 ? "IT" :"None" ) && mailYet.statuID === "Yetkili"
}).map(mail => 
     <input type="email" value={mail.personelEmail} name="user_email" hidden />
      )}
                   <div class="col-md-12">
                     <div class="form-floating">
                       {/* <input type="text" class="form-control" placeholder="Kalem,Silgi,Notebook..." value={talepAd} onChange={(e)=>{setTalepAd(e.target.value)}} name="talepAd"/>
                       <label for="floatingName">Kalem,Silgi,Notebook...</label> */}
                       <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic"  label="Kalem,Silgi,Notebook" variant="outlined" value={talepAd} onChange={(e)=>{setTalepAd(e.target.value)}} name="talepAd" />
                    </FormControl>
                     </div>
                   </div>
                
                   <div class="col-12">
                     <div class="form-floating">
                       {/* <textarea class="form-control"placeholder="Talep Açıklaması"  value={talepAciklamasi} onChange={(e)=>{setTalepAciklamasi(e.target.value)}} name="talepAciklamasi" style={{height: "100px;"}}></textarea>
                       <label for="floatingTextarea">Talep Açıklaması</label> */}
                       <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField id="outlined-multiline-static" label="Talep Açıklaması" multiline  rows={4} defaultValue="Default Value" 
           value={talepAciklamasi} onChange={(e)=>{setTalepAciklamasi(e.target.value)}} name="talepAciklamasi"
        /></FormControl>
                     </div>
                   </div>
                   <div class="col-md-6" hidden >
                  <div class="col-md-12" >
                    <div class="form-floating">
                      <input type="text" class="form-control" value={talepTarih} onChange={(e) => setTalepTarih(e.target.value)}/>
                      <label for="floatingCity">Tarih</label>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                <div class="form-floating">
                    {/* <input type="text" class="form-control" placeholder="Talep Miktarı"  value={talepMiktar} onChange={(e)=>{setTalepMiktar(e.target.value)}} name="talepMiktar"/>
                    <label for="floatingZip">Talep Miktarı</label>
                     */}
                     <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic"  label="Talep Miktarı" variant="outlined"  value={talepMiktar} onChange={(e)=>{setTalepMiktar(e.target.value)}} name="talepMiktar" />
                    </FormControl>
                  </div>
                  
                </div>
                <div class="col-md-2">
                {/* <select class=" form-floating form-select mb-2 p-2" onChange={(e) => setAgirlikBirimi(e.target.value)} aria-label=".form-select-lg example">
  <option selected>Ağırlık</option>
  <option value="Adet">Adet</option>
  <option value="Koli">Koli</option>
  <option value="Kilogram">Kilogram</option>
  <option value="Litre">Litre</option>
  <option value="Gram">Gram</option>
</select> */}
<FormControl fullWidth sx={{ m: 1 }}>
                <TextField
          id="outlined-select-currency"
          select
          label="Ağırlık"
          onChange={(e) => setAgirlikBirimi(e.target.value)}>
            <MenuItem value="Adet">Adet</MenuItem>
            <MenuItem value="Koli">Koli</MenuItem>
            <MenuItem value="Kilogram">Kilogram</MenuItem>
            <MenuItem value="Litre">Litre</MenuItem>
            <MenuItem value="Gram">Gram</MenuItem>
        </TextField>
                </FormControl>
                  </div>
                <div class="col-md-4">
                
                  <div class="input-group mb-3 form-floating">
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic"  label="Tahmini Fiyatı" variant="outlined" value={talepTahminiDeger} onChange={(e)=>{setTalepTahminiDeger(e.target.value)}} name="talepTahminiDeger" />
                    </FormControl>
  {/* <input type="text" class="form-control" placeholder="Tahmini Fiyatı" aria-label="Amount (to the nearest dollar)"  value={talepTahminiDeger} onChange={(e)=>{setTalepTahminiDeger(e.target.value)}} name="talepTahminiDeger"/>
  <label for="floatingZip">Tahmini Fiyatı</label> */}
</div>
                 
                </div>
                <div class="col-md-2">
                <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
          id="outlined-select-currency"
          select
          label="Para Birimi"
          onChange={(e) => setParaBirimi(e.target.value)}>
            <MenuItem value="TL">TL</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
        </TextField>
                </FormControl>
                {/* <select class=" form-floating form-select " onChange={(e) => setParaBirimi(e.target.value)} aria-label=".form-select-lg example">
  <option selected>Para Birimi</option>
  <option value="TL">TL</option>
  <option value="EUR">EUR</option>
  <option value="USD">USD</option>
</select> */}
                  </div>
                   <div class="text-center">
                   <Button variant="outlined" type="submit" className="float-end" endIcon={<SendIcon />}>Talep Oluştur</Button>
                     {/* <button type="submit" class="btn btn-primary w-50">Talep Oluştur</button> */}
                   </div>
                 </form>
   
               </div>
             </div>
           </div>


    )
}

export default YetkiliTalep
