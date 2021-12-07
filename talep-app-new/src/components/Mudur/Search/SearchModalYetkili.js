import React,{useEffect, useState} from 'react'

import Button from '@restart/ui/esm/Button';
import { Modal,Form } from 'react-bootstrap';

import BekleyenOnayModal from '../modal/BekleyenOnayModal';
import axios from 'axios';
import { Avatar, Chip } from '@mui/material';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';



import alertify from 'alertifyjs'

const SearchModalYetkili = ({startDate,endDate, tal,PersonelID,PersonelResim, talepList,PersonelAd,currentEmployee,indexOfFirstEmployee,indexOfLastEmployee }) => {

    const [onayList,setOnayList] = useState([]);

    ///////////////// * Modal ayar * ////////////////////
    const [modalShow,setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);
    const handleModalOpen = () => setModalShow(true);


    const [talepDurum,setTalepDurum] = useState('');
    const [talepAd,setTalepAd] = useState('');
    const [talepTarih,setTalepTarih] = useState(talepList.talepTarih);
    const [onaylayanAd,setOnaylayanAd] = useState(PersonelAd);
    const [onaylayanResim,setOnaylayanResim] = useState(PersonelResim);

    const [perList,setPerList] = useState([])
    const d = new Date();
    let text = d.toLocaleString();
    
    const [onayTarih,setOnayTarih] = useState(text);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'yetkili/'+PersonelID)
            .then((response) => {
                setPerList(response.data);
                response.status===200? console.log("giriş yapıldı") : alert("None")
            })
    },[])



    //Onay Red Bilgilendirme
    



    function onayDep(talepID,personelEmail,personelID,talepAd,talepAciklamasi,talepTarih){
        let durum = {talepDurum:1,onayTarih,talepID,onaylayanAd,onaylayanResim};
        
        fetch(`${process.env.REACT_APP_API}talep/${talepID}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(durum)
        }).then(result => {
            result.status === 200 ? 
            alertify.success('Onaylama İşlemi Başarılı') &&  onayEmailSend(personelEmail,personelID,talepAd,talepAciklamasi,talepTarih):
              alertify.error('Onaylama İşlemi Başarısız')
            result.json().then(resp => {
                // console.warn(resp)
            })
        })
        setTimeout(() => {
            window.location.reload(true)
        }, 1000);
       
    }
    function redDep(talepID,personelEmail,personelID,talepAd,talepAciklamasi,talepTarih){
        let durum = {talepDurum:2,onayTarih,talepID,onaylayanAd,onaylayanResim};
        
        fetch(`${process.env.REACT_APP_API}talep/${talepID}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(durum)
        }).then(result => {
            result.status === 200 ? 
            alertify.success('Reddetme İşlemi Başarılı'):
              alertify.error('Reddetme İşlemi Başarısız')
            result.json().then(resp => {
                // console.warn(resp)
            })
        })
        setTimeout(() => {
            window.location.reload(true)
        }, 2000);
        redEmailSend(personelEmail,personelID,talepAd,talepAciklamasi,talepTarih)
       
    }
    
    
    function onayEmailSend(personelEmail,personelID,talepAd,talepAciklamasi,talepTarih){  
        fetch(process.env.REACT_APP_API+'email/send',{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
              'Accept':'application/json'
          },
          body:JSON.stringify({
              toEmail:personelEmail,
               emailPersonelAd:personelID,
               emailTalepAd:talepAd,
              emailTalepAciklama:talepAciklamasi,
              emailTalepTarih:talepTarih,
               emailTalepDurum:"Onaylandı",
               emailTalepOnayTarih:onayTarih,
              emailTalepOnaylayanAd:PersonelAd,
          })
      })
      .then((result) => {
          result.status === 200 ? alertify.success("Mail gönderildir"):
          alertify.error('Mail gönderilirken bir hata oluştu')
          //console.war(result);
          result.json().then((resp) => {
          })
      });
     
    }
    function redEmailSend(personelEmail,personelID,talepAd,talepAciklamasi,talepTarih){  
        fetch(process.env.REACT_APP_API+'email/send',{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
              'Accept':'application/json'
          },
          body:JSON.stringify({
              toEmail:personelEmail,
               emailPersonelAd:personelID,
               emailTalepAd:talepAd,
              emailTalepAciklama:talepAciklamasi,
              emailTalepTarih:talepTarih,
               emailTalepDurum:"Reddedildi",
               emailTalepOnayTarih:onayTarih,
              emailTalepOnaylayanAd:PersonelAd,
          })
      })
      .then((result) => {
          result.status === 200 ? alertify.success("Mail gönderildir"):
          alertify.error('Mail gönderilirken bir hata oluştu')
          //console.war(result);
          result.json().then((resp) => {
          })
      });
     
    }
    //Onay Red Bilgilendirme


    const [durumList,setDurumList] = useState([])
    useEffect((e) => {
        axios.get(process.env.REACT_APP_API+'personel')
            .then((response) => {
                setDurumList(response.data);
            })
    },[])
    

  return (
    <>
     {
                    talepList && talepList.length > 0 ?
                    talepList.sort((a,b) => (a.talepAd < b.talepAd ? -1 : 1)).filter(tal => {
                        return startDate === '' && endDate === '' ?
                        tal.personelID !== PersonelAd && tal.talepDurum === 0 &&
                         perList.some(per => per.sektorID === tal.sektorID && per.sirketID === tal.sirketID && per.departmanID === tal.departmanID) &&
                         tal.personelStatuID === 2 && durumList.some(drm =>drm.personelAd === tal.personelID && drm.durumID === "Aktif"): 
                         PersonelAd && tal.talepTarih >= startDate && tal.talepTarih <= endDate &&  tal.personelID !== PersonelAd && tal.talepDurum === 0 &&
                         perList.some(per => per.sektorID === tal.sektorID && per.sirketID === tal.sirketID && per.departmanID === tal.departmanID) &&
                         tal.personelStatuID === 2 && durumList.some(drm =>drm.personelAd === tal.personelID && drm.durumID === "Aktif")
                        || tal.talepTarih === startDate &&  tal.personelID !== PersonelAd && tal.talepDurum === 0 &&
                         perList.some(per => per.sektorID === tal.sektorID && per.sirketID === tal.sirketID && per.departmanID === tal.departmanID) &&
                         tal.personelStatuID === 2 && durumList.some(drm =>drm.personelAd === tal.personelID && drm.durumID === "Aktif")
                        
                        
                    }).slice(indexOfFirstEmployee,indexOfLastEmployee).map(tal => 
                
                    <tr key={tal.talepID}>
                        <td>{tal.personelID}</td>
                        <td>{tal.talepAd}</td>
                        <td>{tal.talepAciklamasi}</td>
                        {/* <td>{tal.talepMiktar}</td> */}
                        <td>{(tal.talepDurum === 2) ? <Chip variant="filled" color="error" label="Onaylanmadı" avatar={<Avatar src={tal.talepPersonelResim} />} /> 
                        : (tal.talepDurum === 1) ? <Chip variant="filled" color="success" label="Onaylandı" avatar={<Avatar src={tal.talepPersonelResim} />} />
                        : <Chip variant="filled" label="Onay bekleniyor" avatar={<Avatar src={tal.talepPersonelResim} />} />}</td>
                        {/* <td><Button   className="btn btn-info text-white btn-sm">İşlemler</Button></td> */}

                        <td><Fab  size="small" variant="extended"  sx={{backgroundColor:'#009688',color:"#fff",':hover':{backgroundColor:"#26a69a",color:"#fff"}}}   onClick={()=>onayDep(tal.talepID,tal.personelEmail,tal.personelID,tal.talepAd,tal.talepAciklamasi,tal.talepTarih)}><CheckCircleOutlinedIcon  /></Fab></td>
                         <td><Fab size="small"  variant="extended"  sx={{backgroundColor:'#ff5722',color:"#fff",':hover':{backgroundColor:"#ff7043",color:"#fff"}}} onClick={()=>redDep(tal.talepID,tal.personelEmail,tal.personelID,tal.talepAd,tal.talepAciklamasi,tal.talepTarih)}><CancelOutlinedIcon/></Fab></td>
                   
             
                   
                         <td>
                         <Fab variant="extended" size="small" sx={{backgroundColor:'#00bcd4',color:"#fff",':hover':{backgroundColor:"#26c6da",color:"#fff"}}}
                         onClick={() => (
                            setModalShow(true),
                            setOnayList(tal)
                         ) }
                          ><ErrorOutlineIcon/></Fab>
                         </td>
                    </tr>
                       
                    
                    )
                    :talepList && talepList.length == 0 ? "Yükleniyor" : ""
                    } 

                    <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header>
            <Modal.Title>
               
            <Chip variant="filled" color="primary" label={onayList.personelID} />
            <Chip variant="outlined" style={{marginLeft:"5px"}} color="secondary" size="small" label={onayList.sektorID} />
            <Chip variant="outlined" style={{marginLeft:"5px"}} color="secondary" size="small" label={onayList.sirketID} />
            <Chip variant="outlined" style={{marginLeft:"5px"}} color="secondary" size="small" label={onayList.departmanID} />
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <BekleyenOnayModal editTalepDurum={onayList} PersonelResim={PersonelResim} PersonelAd={PersonelAd}/>
        </Modal.Body>
        {/* <Modal.Footer>
            <Button className="btn btn-danger" onClick={handleModalClose} variant="danger">
                Close Button
            </Button>
        </Modal.Footer> */}
    </Modal>
    </>
  )
}

export default SearchModalYetkili;