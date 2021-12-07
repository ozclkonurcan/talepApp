import React,{useState,useEffect,useRef} from 'react'
import {Redirect} from 'react-router-dom'
import emailjs from 'emailjs-com';
import alertify from 'alertifyjs';
import axios from 'axios'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2'
import { Autocomplete, Chip, FormControl } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import moment from 'moment';

const PersonelTalep = (props) => {
//const [talep,setTalepList] = useState([]);
////////////////////////////////////////////
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








//const d = new Date();
let text = moment().format("YYYY-MM-DD");

const [talepTarih,setTalepTarih] = useState(text);
/////////////////////////////////////////////
const [redirect,setRedirect] = useState(false);

const [mailYetkili,setMailYetkili] = useState([])

const [dolar,setDolar] = useState([])
const [talepListFiltre,setTalepListFiltre] = useState([]);
console.log(dolar)
// console.log(baslik,toEmail)

useEffect(() => {
  axios.get('http://localhost:5000/api/personel')
      .then((response) => {
        setMailYetkili(response.data);
      })
     
},[])
useEffect(() => {
  axios.get('https://finans.truncgil.com/today.json')
  .then(resp => {
    setDolar(resp.data.USD)
  })
     

},[])
useEffect(() => {
  axios.get(process.env.REACT_APP_API+"talep")
  .then(resp => {
    setTalepListFiltre(resp.data)
  })
     
},[])


  const [toEmail,setToEmail] = useState('ozclkonurcan@gmail.com');
const [emailPersonelAd,setEmailPersonelAd] = useState(props.PersonelAd);
const [emailTalepAciklama,setEmailTalepAciklama] = useState('');
const [emailTalepAd,setEmailTalepAd] = useState('');
const [emailTalepTarih,setEmailTalepTarih] = useState(text);


function emailSend(){
  
    let data = {toEmail,emailPersonelAd,emailTalepAd,emailTalepAciklama,emailTalepTarih}
    fetch(process.env.REACT_APP_API+'email/send',{
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
      })
  });
 
}


//Tekrar eden verileri engelle



//Tekrar eden verileri engelle


const submit = async (e) => {
    e.preventDefault();

    emailSend();

    let data ={personelID,talepPersonelResim,agirlikBirimi,paraBirimi,personelEmail,personelStatuID,sektorID,sirketID,departmanID,talepAd,talepAciklamasi,talepMiktar,talepTahminiDeger,talepTarih}
   


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
      alertify.success('Talep Gönderildi') &&  setRedirect(true) :
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
        })
    });

    
    emailjs.sendForm('service_talepApp', 'template_livo6cd', e.target, 'user_Vo7InhnodJW9RQgXoum5s')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });


//       const accountSid = "AC7f65fd047775be9fbc95016f3f6d37b4";
// const authToken = "39a2a1845c86fc135736d0ed36e67f02";

// // require the Twilio module and create a REST client
// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//     to: '+15558675310',
//     from: '+14235563769',
//     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//   })
//   .then(message => console.log(message.sid));
}



  const form = useRef();


  const [Tags,setTags] = useState([talepAd])

if(redirect){

    return <Redirect to="/personelTalepListesi"/>;
}



    return (
        <div>
         
     {Tags.map((t,i) => {
       return (
        <div key={i}>
          {t}
        </div>
       );
     })}


      <div class="card">
            <div class="card-body" style={{height:"85vh"}}>
              <h5 class="card-title">Personel Talep Oluşturma Formu</h5>
    
              <form class="row g-3" ref={form}  onSubmit={submit}>


{mailYetkili.filter(mailYet => {
  {/* console.log(props.departmanID) */}
  return mailYet.departmanID === (props.PersonelDepartmanID === 1 ? "IT" :"None" ) && mailYet.statuID === "Yetkili" 

}).map(mail =>
<input type="email"  value={mail.personelEmail}  onChange={(e)=>setToEmail(e.target.value)} name="user_email" hidden/>

      )}

      <input value={toEmail} hidden/>
                <div class="col-md-12">
                  <div class="form-floating">
                  {/* {talepListFiltre.filter(tal => {
                    return tal.personelID === props.PersonelAd
                  }).sort(()=>Math.random() - Math.random()).slice(0,5).map(talepListFilter => 
                  <Chip variant="outlined"  label={ talepListFilter.talepAd}/>
                  )} */}

                    <FormControl fullWidth sx={{ m: 1 }}>

     
                    
          <TextField  options={talepListFiltre.map((option) => option.talepAd)} value={talepAd,emailTalepAd} onChange={(e)=>(setTalepAd(e.target.value),setEmailTalepAd(e.target.value))} id="outlined-basic"   label="Kalem,Silgi,Notebook" variant="outlined"  name="talepAd" />
                    </FormControl>
                  </div>
                </div>
             
                <div class="col-md-12">
                  <div class="form-floating">
                  <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField id="outlined-multiline-static" label="Talep Açıklaması" multiline  rows={4} defaultValue="Default Value" 
          value={talepAciklamasi,emailTalepAciklama} onChange={(e)=>(setTalepAciklamasi(e.target.value),setEmailTalepAciklama(e.target.value))} name="talepAciklamasi"
        /></FormControl>
                    {/* <textarea class="form-control"placeholder="Talep Açıklaması"  value={talepAciklamasi,emailTalepAciklama} onChange={(e)=>(setTalepAciklamasi(e.target.value),setEmailTalepAciklama(e.target.value))} name="talepAciklamasi" style={{height: "100px;"}}></textarea>
                    <label for="floatingTextarea">Talep Açıklaması</label> */}
                  </div>
                </div>
                <div class="col-md-6" hidden >
                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" value={talepTarih,emailTalepTarih} onChange={(e) => (setTalepTarih(e.target.value),setEmailTalepTarih(e.target.value))}/>
                      <label for="floatingCity">Tarih</label>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                <div class="form-floating">
                    {/* <input type="text" class="form-control" placeholder="Talep Miktarı"  value={talepMiktar} onChange={(e)=>{setTalepMiktar(e.target.value)}} name="talepMiktar"/>
                    <label for="floatingZip">Talep Miktarı</label> */}
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
  <option value="USD">USD [{dolar.Satış}]</option>
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

export default PersonelTalep
