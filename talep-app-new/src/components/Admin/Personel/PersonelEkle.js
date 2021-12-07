//import { listClasses } from '@mui/material';
import React,{useState,useEffect} from 'react'
//import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import './personelEkle.css'
import alertify from 'alertifyjs';
import moment from 'moment'

const PersonelEkle = (props) => {



//const [talep,setTalepList] = useState([]);
const [cinsiyetList,setCinsiyetList] = useState([]);
const [sektorList,setSektorList] = useState([]);
const [sirketList,setSirketList] = useState([]);
const [departmanList,setDepartmanList] = useState([]);
const [statuList,setStatuList] = useState([]);
const [durumList,setDurumList] = useState([]);

let text = moment().format("YYYY-MM-DD");
const [personelTarih,setPersonelTarih] = useState(text);

//const arrayList = [...sirketList,...sektorList,...statuList,...durumList];


/*
güncelleme işleminde modal açmak yerine 2 adet button koyabiliriz onayla yaada onaylama diye
 */

//RandomPass
function autoPass(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

////////////////////////////////////////////
const [cinsiyetID,setCinsiyetID] = useState('');
const [sektorID,setSektorID] = useState('');
const [sirketID,setSirketID] = useState('');
//const [sektorAd,setSektorAd] = useState('');
const [departmanID,setDepartmanID] = useState('');
const [personelTel,setPersonelTel] = useState('');
const [personelPassword,setPersonelPassword] = useState('');
const [statuID,setStatuID] = useState('');
const [durumID,setDurumID] = useState('');
const [yetkiliButce,setYetkiliButce] = useState('');

const [personelResim,setPersonelResim] = useState("anonymouse.png");
const [personelAd,setpersonelAd] = useState('');
//const [sirketAd,setSirketAd] = useState('');

const [personelEmail,setPersonelEmail] = useState('');

const [toPassEmail,setToPassEmail] = useState('');
const [password,setPassword] = useState('');


//Ranadom Pass
// const [passwordLength, setPasswordLength] = useState(20)
// const [includeUppercase, setIncludeUppercase] = useState(false)
// const [includeLowercase, setIncludeLowercase] = useState(false)
// const [includeNumbers, setIncludeNumbers] = useState(false)
// const [includeSymbols, setIncludeSymbols] = useState(false)
// const [show, setShow] = useState(true);


// const handleGeneratePassword = (e) => {
//     if (
//         !includeUppercase &&
//         !includeLowercase &&
//         !includeNumbers &&
//         !includeSymbols
//     ) {
//         document.getElementById("error").innerHTML="Select At Least One Option to Generate the Password";

//     }
//     let characterList = ''

//     if (includeLowercase) {
//         characterList = characterList + lowerCaseLetters
//         document.getElementById("error").style.visibility="hidden";
//     }

//     if (includeUppercase) {
//         characterList = characterList + upperCaseLetters
//         document.getElementById("error").style.visibility="hidden";
//     }

//     if (includeNumbers) {
//         characterList = characterList + numbers
//         document.getElementById("error").style.visibility="hidden";
//     }

//     if (includeSymbols) {
//         characterList = characterList + specialCharacters
//         document.getElementById("error").style.visibility="hidden";
//     }
//     setPassword(createPassword(characterList))
// }
// const createPassword = (characterList) => {
//     let password = ''
//     const characterListLength = characterList.length

//     for (let i = 0; i < passwordLength; i++) {
//         const characterIndex = Math.round(Math.random() * characterListLength)
//         password = password + characterList.charAt(characterIndex)
//     }
//     return password
// }
//Ranadom Pass



function emailSend(){  
    let data = {toPassEmail,personelAd,personelEmail,password}
    fetch(process.env.REACT_APP_API+'passemail/send',{
      method:'POST',
      headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
      },
      body:JSON.stringify(data)
  })
  .then((result) => {
  
  });
 
}


// const [image,setImage] = useState('');

// const uploadImage = async e => {
//   const files = e.target.files
//   const data = new FormData()
//   data.append('file',files[0])
//   data.append('upload-preset','PersonelResim')

//   const res = await fetch
// }

/////////////////////////////////////////////
const [redirect,setRedirect] = useState(false);


   
const handleFileSelected = (e) => {
  const formData = new FormData();
  setPersonelResim(e.target.files[0].name)
  formData.append(
      "myFile",
      e.target.files[0],
      e.target.files[0].name
  );
  fetch(process.env.REACT_APP_API+'personel/SaveFile',{
      method:'POST',
      body:formData
  })
  .then(resp => resp.json())
 
}
const submit = async (e) => {
    e.preventDefault(); 

    
    emailSend();

    let data ={personelAd,personelTarih,personelResim,yetkiliButce,cinsiyetID,sektorID,sirketID,departmanID,personelTel,personelEmail,personelPassword,statuID,durumID}

    if(personelPassword.length >= 8){
      await fetch(process.env.REACT_APP_API+'Personel/admin',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then((result) => {
        //console.war(result);
        result.status===200 ? alertify.success("Kayıt Başarılı") : result.status === 400 ? alertify.warning("Bu Email hesabı zaten kullanımda") : alertify.error("Kayıt başarısız");
        result.json().then((resp) => {
                console.log(resp);
        })
    }).catch(err => {
      console.log("Personel Ekle err"+err);
    });
    }else{
      alert("şifre 8 karakterden düşük")
    }

    setRedirect(true);
}





useEffect(() => {
    axios.get(process.env.REACT_APP_API+'cinsiyet')
        .then((response) => {
            setCinsiyetList(response.data);
          
        })
},[])
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
useEffect(() => {
    axios.get(process.env.REACT_APP_API+'departman')
        .then((response) => {
            setDepartmanList(response.data);
            
        })
},[])
useEffect(() => {
    axios.get(process.env.REACT_APP_API+'statu')
        .then((response) => {
            setStatuList(response.data);
        })
},[])
useEffect(() => {
    axios.get(process.env.REACT_APP_API+'durum')
        .then((response) => {
            setDurumList(response.data);
        })
      
},[])




if(redirect){

    return <Redirect to="/personelListele"/>;
}







    return (
        <div>
{/* {arrayList.map(arra => 
      <div>
<tr key={arra.sirketID}>
  <td>{arra.sirketAd}</td>
</tr>
<tr key={arra.departmanID}>
  <td>{arra.departmanAd}</td>
</tr>
<tr key={arra.sektorID}>
  <td>{arra.sektorAd}</td>
</tr>
<tr key={arra.cinsiyetID}>
  <td>{arra.cinsiyetAd}</td>
</tr>
<tr key={arra.durumID}>
  <td>{arra.durumAd}</td>
</tr>
      </div>
      )} */}

      <div class="card">
            <div class="card-body"  style={{height:"85vh"}}>
              <h5 class="card-title">Personel Kayıt Formu</h5>

              <form class="row g-3"  onSubmit={submit}>
                <input value={personelTarih} onChange={(e) => setPersonelTarih(e.target.value)} hidden/>
            
              <div class="row mb-12">
                  <label for="inputNumber" class="col-sm-2 col-form-label">Resim Yükle</label>
             
                  <div class="col-sm-10">
                    <input class="form-control" onChange={handleFileSelected} type="file" accept="image/*" name="file"/>
                  </div>
                  </div>
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" placeholder="Kalem,Silgi,Notebook..." value={personelAd} onChange={(e)=>{setpersonelAd(e.target.value)}} name="personelAd"/>
                    <label for="floatingName">Personel Ad</label>
                  </div>
                </div>
             
                <div class="col-md-4">
                  <select id="inputState" class="form-select" onChange={(e) => setCinsiyetID(e.target.value)}>
                    <option selected>Cinsiyet Seç</option>
                    {cinsiyetList.map(cins => 
                
                    <option key={cins.cinsiyetID} value={cins.cinsiyetAd} >{cins.cinsiyetAd}
                   

                    </option>
                    
                    )}
                  </select>
                </div>
                <div class="col-md-8">
                  <select id="inputState" class="form-select" onChange={(e) => (setSektorID(e.target.value))}>
                    <option selected>Sektör Seç</option>
                    {sektorList.map(sek => 
                    <option key={sek.sektorID} value={sek.sektorAd}>{sek.sektorAd}</option>
                    )}
                  </select>
                </div>
                <div class="col-md-6">
                  <select id="inputState" class="form-select" onChange={(e) => (setSirketID(e.target.value))}>
                    <option selected>Şirket Seç</option>
                    {sirketList.filter(sir => {
                      return sektorID===sir.sektorID
                    }).map(sir => 
                    <option key={sir.sirketID} value={sir.sirketAd} >{sir.sirketAd}</option>
                    )}
                  </select>
                </div>
                <div class="col-md-6">
                  <select id="inputState" class="form-select" onChange={(e) => setDepartmanID(e.target.value)}>
                    <option selected>Departman Seç</option>
                    {departmanList.filter(deps=>{
                      return sirketID === deps.sirketID
                    }).map(deps => 
                    
                    <option key={deps.departmanID} value={deps.departmanAd} >{deps.departmanAd }</option>
                    )}
                  </select>
                </div>
                <div class="col-md-4">
                <div class="form-floating">
                    <input type="text" class="form-control" placeholder="Talep Miktarı"  value={personelTel} onChange={(e)=>{setPersonelTel(e.target.value)}} name="talepMiktar"/>
                    <label for="floatingZip">Telefon</label>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="form-floating">
                 
                    <input type="email" class="form-control" placeholder="Talep Tahmini Fiyatı"  value={personelEmail,toPassEmail} onChange={(e)=>(setPersonelEmail(e.target.value),setToPassEmail(e.target.value))} name="talepTahminiDeger"/>
                    <label for="floatingZip">Email</label>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-floating">
                    <input type="password" class="form-control" placeholder="Talep Tahmini Fiyatı"  value={personelPassword,password} onChange={(e)=>(setPersonelPassword(e.target.value),setPassword(e.target.value))} name="talepTahminiDeger"/>
                    <label for="floatingZip">Password</label>
                  </div>
                </div>
                <div class="col-md-4">
                <div className="row">
                  <div className="col-md-6">
                  <select id="inputState" class="form-select" onChange={(e) => setStatuID(e.target.value)}>
                    <option selected>Yetki seç</option>
                    { statuList.map(stat => 
                    <option key={stat.statuID} value={stat.statuAd} >{stat.statuAd}</option>
                    )}
                  </select>
                  </div>
                  <div className="col-md-6">
                  {
                  <div class="form-floating">
                    <input type="text" class="form-control" placeholder="Talep Tahmini Fiyatı"  value={yetkiliButce} onChange={(e)=>{setYetkiliButce(e.target.value)}} name="YetkiliButce"/>
                    <label for="floatingZip">Bütçe</label>
                  </div>
                
                  }
                  </div>
                </div>
                  

                 
                </div>
               
                <div class="col-md-4">
                  <select id="inputState" class="form-select" onChange={(e) => setDurumID(e.target.value)}>
                    <option selected>Durum seç</option>
                    {durumList.map(durum => 
                    <option key={durum.durumID} value={durum.durumAd} >{durum.durumAd}</option>
                    )}
                  </select>
                </div>
                <div class="text-center">
                  <button type="submit" id="btnKayit" class="btn btn-success w-25 float-end">Kayıt oluştur</button>
                </div>
              </form>

            </div>
          </div>
        </div>
    )
}
export default PersonelEkle
