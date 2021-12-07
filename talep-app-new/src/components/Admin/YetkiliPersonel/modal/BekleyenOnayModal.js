import { Input } from '@mui/material';
import Button from '@restart/ui/esm/Button'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Card, Form, FormGroup } from 'react-bootstrap'
import alertify from 'alertifyjs';
import moment from 'moment'

const BekleyenOnayModal = ({editTalepDurum}) => {

    let text = moment().format("YYYY-MM-DD");
    const [talepTarih,setTalepTarih] = useState(text);

    const personelList = editTalepDurum;
    const id = personelList.personelID;


    const [personelAd,setPersonelAd] = useState(personelList.personelAd);
   // const [cinsiyetID,setCinsiyetID] = useState(personelList.cinsiyetID);
    const [sektorID,setSektorID] = useState(personelList.sektorID);
    const [sirketID,setSirketID] = useState(personelList.sirketID);
    const [departmanID,setDepartmanID] = useState(personelList.departmanID);
    const [sektorList,setSektorList] = useState([]);
    const [sirketList,setSirketList] = useState([]);
    const [departmanList,setDepartmanList] = useState([]);
    const [statuList,setStatuList] = useState([]);
    const [statuID,setStatuID] = useState(personelList.statuID);
    const [yetkiTarih,setYetkiTarih] = useState(text)
    

// departmanID,statuID, durumID,
           
const [personelID,setPersonelID]=useState(id)
  
    const [redirect,setRedirect] = useState(false);
    const submit = async (e) => {
        e.preventDefault(); 
    
        let data ={personelID,personelAd,sektorID,sirketID,departmanID,statuID,yetkiTarih}
    
    
          await fetch(process.env.REACT_APP_API+'yetkili',{
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
        
    
        setRedirect(true);
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'departman')
            .then((response) => {
                setDepartmanList(response.data);
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
        axios.get(process.env.REACT_APP_API+'statu')
            .then((response) => {
                setStatuList(response.data);
            })
    },[])


  
//Güncelleme işlemi sırasında 3 radio btn olacak ve 1 2 0 numaralarnı seçme şansı verecek 
// 0 olan bekleme 1 onay 2 red olacak submit yaptığımız zaman
//seçilen radio btn ye göre işlem görecek 0 olan var sayılan olarak gelecek
    return (
        <Form onSubmit={submit}>
        
           <input value={yetkiTarih} onChange={(e) => setYetkiTarih(e.target.value)} hidden />
            <Form.Group>
            <Form.Control 
                type="text"
                placeholder="Personel ID *"
                value={personelID}
                onChange={(e)=>setPersonelID(e.target.value)}
                required
                hidden
                 />
            </Form.Group>
            <Form.Group>
            <Form.Control 
                type="text"
                placeholder="Durum *"
                value={personelAd}
                onChange={(e)=>setPersonelAd(e.target.value)}
                required
                hidden
                 />
            </Form.Group>
          
             <Form.Group>
            <div className="row">
            <div class="col-md-12">
                
                  <select id="inputState" class="form-select" onChange={(e)=>setSektorID(e.target.value)}>
                    <option selected>Sektör Seç</option>
                    {sektorList.map(sek => 
                    <option key={sek.sektorID} value={sek.sektorAd} >{sek.sektorAd}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-3" hidden>
                <Form.Group>
            <Form.Control 
                type="text"
                placeholder="Durum *"
                value={sektorID}
                onChange={(e)=>setSektorID(e.target.value)}
                required
                disabled
                 />
            </Form.Group>
                </div>
                </div>
  </Form.Group>
             <Form.Group>
            <div className="row">
            <div class="col-md-12">
                
                  <select id="inputState" class="form-select" onChange={(e)=>setSirketID(e.target.value)}>
                    <option selected >Şirket Seç</option>
                    {sirketList.filter(sir => {
                        return sektorID === sir.sektorID
                    }).map(dep => 
                    <option key={dep.sirketID} value={dep.sirketAd} >{dep.sirketAd}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-3" hidden>
                <Form.Group>
            <Form.Control 
                type="text"
                placeholder="Durum *"
                value={sirketID}
                onChange={(e)=>setSirketID(e.target.value)}
                required
                disabled
                 />
            </Form.Group>
                </div>
                </div>
  </Form.Group>
             <Form.Group>
            <div className="row">
            <div class="col-md-12">
                
                  <select id="inputState" class="form-select" onChange={(e)=>setDepartmanID(e.target.value)}>
                    <option selected>Departman Seç</option>
                    {departmanList.filter(deps => {
                        return sirketID === deps.sirketID
                    }).map(dep => 
                    <option key={dep.departmanID} value={dep.departmanAd} >{dep.departmanAd}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-3" >
                <Form.Group>
            <Form.Control 
                type="text"
                placeholder="Durum *"
                value={departmanID}
                onChange={(e)=>setDepartmanID(e.target.value)}
                required
                hidden
                disabled
                 />
            </Form.Group>
                </div>
                </div>
  </Form.Group>

          
           
         
             <Form.Group>
            <div className="row">
            <div class="col-md-12">
                
                  <select id="inputState" class="form-select" onChange={(e)=>setStatuID(e.target.value)}>
                    <option selected>Statu Seç</option>
                    {statuList.map(dep => 
                    <option key={dep.statuID} value={dep.statuAd} >{dep.statuAd}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-3" >
                <Form.Group>
            <Form.Control 
                type="text"
                placeholder="Durum *"
                value={statuID}
                onChange={(e)=>setStatuID(e.target.value)}
                required
                hidden
                disabled
                 />
            </Form.Group>
                </div>
                </div>
  </Form.Group>
           
        
           
       
         
            
            <Button className="btn btn-success mt-3" type="submit" >İşlemi tamamla</Button>

          </Form>
    )
}

export default BekleyenOnayModal
