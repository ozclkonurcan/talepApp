import Button from '@restart/ui/esm/Button'
import React,{useState,useEffect,useRef} from 'react'
import { Alert, Card, Form } from 'react-bootstrap'
import alertify from 'alertifyjs'
import emailjs from 'emailjs-com';
import jsPDF from 'jspdf'
const BekleyenOnayModal = ({editTalepDurum,PersonelAd,PersonelResim}) => {

    const talepList = editTalepDurum;
    const id = talepList.talepID;
    const [personelID,setPersonelID] = useState(talepList.personelID);
    const [talepAd,setTalepAd] = useState(talepList.talepAd);
    const [personelEmail,setPersonelEmail] = useState(talepList.personelEmail);
    const [talepAciklamasi,setTalepAciklamasi] = useState(talepList.talepAciklamasi);
    const [talepMiktar,setTalepMiktar] = useState(talepList.talepMiktar);
    const [agirlikBirimi,setAgirlikBirimi] = useState(talepList.agirlikBirimi);
    const [talepTahminiDeger,setTalepTahminiDeger] = useState(talepList.talepTahminiDeger);
    const [paraBirimi,setParaBirimi] = useState(talepList.paraBirimi);
    const [talepDurum,setTalepDurum] = useState(talepList.talepDurum);
    const [talepTarih,setTalepTarih] = useState(talepList.talepTarih);
    const [onaylayanAd,setOnaylayanAd] = useState(PersonelAd);
    const [onaylayanResim,setOnaylayanResim] = useState(PersonelResim);
    const d = new Date();
    let text = d.toLocaleString();
    
    const [onayTarih,setOnayTarih] = useState(text);

    function updateDurum(e){
        let durum = {talepDurum,onayTarih,id,onaylayanAd,onaylayanResim};
        fetch(`${process.env.REACT_APP_API}talep/${id}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(durum)
        }).then(result => {
            result.status === 200 ? 
            alertify.success('Güncelleştirme Başarılı'):
              alertify.error('Güncelleştirme Başarısız')
            result.json().then(resp => {
                // console.warn(resp)
            })
        })
    }

    // console.log("Talep Durum"+talepDurum)

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
          result.status === 200 ? alertify.success("Mail gönderildir"):
          alertify.error('Mail gönderilirken bir hata oluştu')
          //console.war(result);
          result.json().then((resp) => {
          })
      });
     
    }
    
     const submit =(e) => {
        
    
       
    //     emailjs.sendForm('service_talepApp', 'template_912od9f', e.target, 'user_Vo7InhnodJW9RQgXoum5s')
    //       .then((result) => {
    //           console.log(result.text);
    //       }, (error) => {
    //           console.log(error.text);
    //       });
        emailSend();
          alertify.success('İşlem tamamlandı');
         }
      const form = useRef();

      const pdfGenerate=()=>{
        var doc=new jsPDF('landscape','px','a4','false');
        doc.setFont('Helvertica','bold')
        doc.text(60,40,'Talep Tarih :')
        doc.text(60,50,talepTarih)
        // doc.text(10,10,talepMiktar," / ",agirlikBirimi)
        // doc.text(10,10,talepTahminiDeger," / ",paraBirimi)
         doc.text(60,70,'Talep Ad :')
         doc.text(60,80,talepAd)
         doc.text(60,110,'Talep Açıklaması :')
         doc.text(60,120,talepAciklamasi)
         doc.text(60,150,'Personel Email :')
         doc.text(60,160,personelEmail)

        doc.save(`${personelID}/${talepAd}.pdf`)
      }
  
//Güncelleme işlemi sırasında 3 radio btn olacak ve 1 2 0 numaralarnı seçme şansı verecek 
// 0 olan bekleme 1 onay 2 red olacak submit yaptığımız zaman
//seçilen radio btn ye göre işlem görecek 0 olan var sayılan olarak gelecek
    return (
        <Form ref={form}  onSubmit={submit}>
        <input value={toEmail} hidden/>
        <input value={emailTalepDurum} hidden/>
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
            <Alert className="alert alert-info">Talep Ad : <br/> <strong >{talepAd}</strong> </Alert>
            </Form.Group>
            <Form.Group>
            <Alert className="alert alert-info">Talep Açıklaması : <br/> <strong >{talepAciklamasi}</strong> </Alert>
            </Form.Group>
            <input value={talepAd} name="talepAd" hidden/>
            <input value={talepAciklamasi} name="talepAciklamasi" hidden/>
            <input type="email" value={personelEmail} name="user_email" hidden />
            <input type="text" value={onaylayanAd} name="yetkiliAd" onChange={(e) => setOnaylayanAd(e.target.value)} hidden/>
           <input type="text" value={onayTarih} onChange={(e) => setOnayTarih(e.target.value)} hidden /> 
           <input type="text" value={onaylayanResim} onChange={(e) => setOnaylayanResim(e.target.value)} hidden /> 
           {talepDurum === 1 ? 
            <input value="Onaylandı" name="durum1" hidden/>:
            talepDurum === 2 ? 
            <input value="Onaylanmadı" name="durum2" hidden/>:
            ""}
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
            <hr/>
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
            <hr/>
            
            {/* <Button className="btn btn-success mt-3 float-end" type="submit" onClick={updateDurum} >İşlemi tamamla</Button> */}

<Button className="btn btn-outline-primary btn-sm" onClick={pdfGenerate}><i class="bi bi-arrow-down-circle-fill"></i></Button>
          </Form>
    )
}

export default BekleyenOnayModal
