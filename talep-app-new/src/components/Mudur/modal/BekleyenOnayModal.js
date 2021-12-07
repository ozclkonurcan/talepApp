import Button from '@restart/ui/esm/Button'
import React, { useState,useEffect,useRef } from 'react'
import { Alert, Card, Form } from 'react-bootstrap'

import alertify from 'alertifyjs'
import emailjs from 'emailjs-com';
const BekleyenOnayModal = ({editTalepDurum,PersonelAd,PersonelResim}) => {

    const talepList = editTalepDurum;
    const id = talepList.talepID;
    const [personelID,setPersonelID] = useState(talepList.personelID);
    const [personelEmail,setPersonelEmail] = useState(talepList.personelEmail);
    const [talepAd,setTalepAd] = useState(talepList.talepAd);
    const [talepAciklamasi,setTalepAciklamasi] = useState(talepList.talepAciklamasi);
    const [talepMiktar,setTalepMiktar] = useState(talepList.talepMiktar);
    const [talepDurum,setTalepDurum] = useState(talepList.talepDurum);
    const [onaylayanAd,setOnaylayanAd] = useState(PersonelAd);
    const [talepTarih,setTalepTarih] = useState(talepList.talepTarih);
    const [agirlikBirimi,setAgirlikBirimi] = useState(talepList.agirlikBirimi);
    const [talepTahminiDeger,setTalepTahminiDeger] = useState(talepList.talepTahminiDeger);
    const [onaylayanResim,setOnaylayanResim] = useState(PersonelResim);
    const [paraBirimi,setParaBirimi] = useState(talepList.paraBirimi);

    const d = new Date();
    let text = d.toLocaleString();
    
    const [onayTarih,setOnayTarih] = useState(text);
    
    function updateDurum(){
        let durum = {talepDurum,id,onaylayanAd,onayTarih,onaylayanResim};
        fetch(`${process.env.REACT_APP_API}talep/${id}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(durum)
        }).then(result => {
            result.json().then(resp => {
                console.warn(resp)
            })
        })

     }

     
    const [toEmail,setToEmail] = useState(personelEmail);
    const [emailPersonelAd,setEmailPersonelAd] = useState(personelID);
    const [emailTalepAd,setEmailTalepAd] = useState(talepAd);
    const [emailTalepAciklama,setEmailTalepAciklama] = useState(talepAciklamasi);
    const [emailTalepTarih,setEmailTalepTarih] = useState(talepTarih);
    const [emailTalepDurum,setEmailTalepDurum] = useState(talepList.talepDurum);
    const [emailTalepOnayTarih,setEmailTalepOnayTarih] = useState(onayTarih);
    const [emailTalepOnaylayanAd,setEmailTalepOnaylayanAd] = useState(onaylayanAd);

    function emailSend(){  
        let data = {toEmail,emailPersonelAd,emailTalepAd,emailTalepAciklama,emailTalepTarih,emailTalepDurum,emailTalepOnayTarih,emailTalepOnaylayanAd}
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


     const submit = (e) => {
     
emailSend();
   
    // emailjs.sendForm('service_talepApp', 'template_912od9f', e.target, 'user_Vo7InhnodJW9RQgXoum5s')
    //   .then((result) => {
    //       console.log(result.text);
    //   }, (error) => {
    //       console.log(error.text);
    //   });
      
      alertify.success('İşlem tamamlandı');
}
  const form = useRef();

  
//Güncelleme işlemi sırasında 3 radio btn olacak ve 1 2 0 numaralarnı seçme şansı verecek 
// 0 olan bekleme 1 onay 2 red olacak submit yaptığımız zaman
//seçilen radio btn ye göre işlem görecek 0 olan var sayılan olarak gelecek
    return (
        <Form ref={form}  onSubmit={submit}>
         <input value={toEmail} hidden/>
        <input value={emailTalepDurum} hidden />
            <Form.Group>
            <div className="row">
                <div className="col-md-12"><Alert className="alert alert-warning">Talep Tarih :  <br/> <strong>{talepTarih}</strong></Alert></div>
             </div>
             <hr/>
            <div className="row">
                <div className="col-md-6"><Alert className="alert alert-info">Talep Miktar : <br/> <strong>{talepMiktar} / {agirlikBirimi}</strong></Alert></div>
                <div className="col-md-6"><Alert className="alert alert-info">Talep Tahmini Fiyat : <br/> <strong>{talepTahminiDeger} / {paraBirimi}</strong></Alert></div>
            </div>
            
            </Form.Group>
            <Form.Group>
            <Alert className="alert alert-info">Talep Ad : <br/> <strong>{talepAd}</strong> </Alert>
            </Form.Group>
            <Form.Group>
            <Alert className="alert alert-info">Talep Açıklaması : <br/> <strong>{talepAciklamasi}</strong> </Alert>
            </Form.Group>
    
            <input type="text" value={onayTarih} onChange={(e) => setOnayTarih(e.target.value)} hidden/>
            <input value={talepAd} name="talepAd" hidden/>
            <input value={talepAciklamasi} name="talepAciklamasi" hidden/>
            <input type="email" value={personelEmail} name="user_email" hidden/>
            <input type="text" value={onaylayanAd} name="yetkiliAd" onChange={(e) => setOnaylayanAd(e.target.value)} hidden />

            {talepDurum === 1 ? 
            <input value="Onaylandı" name="durum1" hidden/>:
            talepDurum === 2 ? 
            <input value="Onaylanmadı" name="durum2" hidden/>:
            ""}
            <hr/>
            <Form.Group>
                <Form.Control hidden
                type="text"
                placeholder="Durum *"
                value={talepDurum}
                onChange={(e)=>setTalepDurum(e.target.value)}
                required
                 />
            </Form.Group>
            {/* <Form.Group>
            <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={(e) => (setTalepDurum(e.target.value=1),setEmailTalepDurum(e.target.value="Onaylandı"))}/>
  <label class="form-check-label" for="flexRadioDefault1">
   Onayla
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  onClick={(e) => (setTalepDurum(e.target.value=2),setEmailTalepDurum(e.target.value="Onaylanmadı"))} />
  <label class="form-check-label" for="flexRadioDefault2">
   Red et
  </label>
</div>
            </Form.Group> */}
            
            {/* <hr/>
            <Button className="btn btn-success mt-3 float-end" type="submit" onClick={updateDurum} >İşlemi tamamla</Button> */}

          </Form>
    )
}

export default BekleyenOnayModal
