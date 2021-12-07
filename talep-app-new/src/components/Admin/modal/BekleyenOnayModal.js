import { Input } from '@mui/material';
import Button from '@restart/ui/esm/Button'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Card, Form, FormGroup } from 'react-bootstrap'
import alertify from 'alertifyjs';

const BekleyenOnayModal = ({editTalepDurum}) => {

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
    const [personelResim,setPersonelResim] = useState(process.env.REACT_APP_PHOTOPATH+personelList.personelResim);
    const [personelTel,setPersonelTel] = useState(personelList.personelTel);
    const [personelEmail,setPersonelEmail] = useState(personelList.personelEmail);
    const [statuID,setStatuID] = useState(personelList.statuID);
    const [durumID,setDurumID] = useState(personelList.durumID);
    const [personelPassword,setPersonelPassword] = useState(personelList.personelPassword);

    
    const [yetkiliButce,setYetkiliButce] = useState(personelList.yetkiliButce);

// departmanID,statuID, durumID,
           

    function updateDurum(){
        let durum = {personelAd,personelResim,personelTel,personelEmail,id,personelPassword,departmanID,sektorID,sirketID,statuID,yetkiliButce};
        fetch(`${process.env.REACT_APP_API}personel/admin/${id}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(durum)
        }).then(result => {
            result.status===200 ? alertify.success("Güncelleme başarılı") : alertify.error("Başarısız güncelleme")
            result.json().then(resp => {
                console.warn(resp)
            })
        })
    }

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
        <Form>
        <input value={personelPassword} onChange={(e) => setPersonelPassword(e.target.value)} hidden/>
                    
            <Form.Group>
            <input type="file"  onChange={handleFileSelected}  accept="image/*" name="file" className=" btn btn-primary btn-sm"/>
                   
            </Form.Group>
            <Form.Group>
            <Form.Control 
                type="text"
                placeholder="Durum *"
                value={personelAd}
                onChange={(e)=>setPersonelAd(e.target.value)}
                required
                 />
            </Form.Group>
            {/* <Form.Group>
            <Form.Control hidden
                type="text"
                placeholder="Durum *"
                value={cinsiyetID}
                onChange={(e)=>setCinsiyetID(e.target.value)}
                required
                 />
            </Form.Group>
            <Form.Group>
            <Form.Control hidden
                type="text"
                placeholder="Durum *"
                value={sektorID}
                onChange={(e)=>setSektorID(e.target.value)}
                required
                 />
            </Form.Group>
            <Form.Group>
            <Form.Control hidden
                type="text"
                placeholder="Durum *"
                value={sirketID}
                onChange={(e)=>setSirketID(e.target.value)}
                required
                 />
            </Form.Group> */}
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

            {/* <Form.Group>
            <Form.Control hidden
                type="text"
                placeholder="Durum *"
                value={personelResim}
                onChange={(e)=>setpersonelResim(e.target.value)}
                required
                 />
            </Form.Group> */}
            <Form.Group>
            <Form.Control 
                type="text"
                placeholder="Durum *"
                value={personelTel}
                onChange={(e)=>setPersonelTel(e.target.value)}
                required
                 />
            </Form.Group>
            <Form.Group>
            <Form.Control 
                type="text"
                placeholder="Durum *"
                value={personelEmail}
                onChange={(e)=>setPersonelEmail(e.target.value)}
                required
                 />
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
            <Form.Group>
            <Form.Control 
                type="text"
                placeholder="Butçe *"
                value={yetkiliButce}
                onChange={(e)=>setYetkiliButce(e.target.value)}
                required
                 />
            </Form.Group>
        
           
       
         
            
            <Button className="btn btn-success mt-3" type="submit" onClick={updateDurum}>İşlemi tamamla</Button>

          </Form>
    )
}

export default BekleyenOnayModal
