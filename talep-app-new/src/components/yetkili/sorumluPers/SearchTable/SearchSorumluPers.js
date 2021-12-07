import { Avatar, Chip } from '@mui/material'
import axios from 'axios'
import React,{useEffect, useState} from 'react'

const SearchSorumluPers = ({startDate,endDate, tal,PersonelID, talepList,PersonelAd,currentEmployee,indexOfFirstEmployee,indexOfLastEmployee }) => {

  const [perList,setPerList] = useState([])
  const [yetList,setYetList] = useState([]);
  useEffect(() => {
      axios.get(process.env.REACT_APP_API+'personel/'+PersonelID)
          .then((response) => {
              setPerList(response.data);
              //response.status===200? console.log("giriş yapıldı") : alert("None")
          })
  },[])
  useEffect(() => {
    axios.get(process.env.REACT_APP_API+'yetkili/'+PersonelID)
        .then((response) => {
            setYetList(response.data);
            //response.status===200? console.log("giriş yapıldı") : alert("None")
        })
},[])
  
  return (
    <>
     {
                    talepList && talepList.length > 0 ?
                    talepList.sort((a,b) => (a.talepTarih > b.talepTarih ? -1 : 1)).filter(tal => {
                        return startDate === '' && endDate === '' ?
                        tal.personelID !== PersonelAd && tal.talepDurum === 0 
                        && yetList.some(per => per.sektorID === tal.sektorID && per.sirketID === tal.sirketID && per.departmanID === tal.departmanID)
                    : 
                         PersonelAd && tal.talepTarih >= startDate && tal.talepTarih <= endDate && tal.personelID !== PersonelAd && tal.talepDurum === 0 
                        && yetList.some(per => per.sektorID === tal.sektorID && per.sirketID === tal.sirketID && per.departmanID === tal.departmanID)
                   
                        || tal.talepTarih === startDate && tal.personelID !== PersonelAd && tal.talepDurum === 0 
                        && yetList.some(per => per.sektorID === tal.sektorID && per.sirketID === tal.sirketID && per.departmanID === tal.departmanID)
                   
                        
                        
                        
                   
                    }).slice(indexOfFirstEmployee,indexOfLastEmployee).map(tal => 
                
                    <tr key={tal.talepID}>
                        <td>{tal.personelID}</td>
                        <td>{tal.talepAd}</td>
                        {/* <td>{tal.talepAciklamasi}</td> */}
                        <td>{tal.talepMiktar}  <span className="badge bg-primary rounded-pill float-end">{tal.agirlikBirimi}</span></td>
                        <td>{(tal.talepDurum === 2) ? <Chip variant="filled" color="error" label="Onaylanmadı" avatar={<Avatar src={tal.talepPersonelResim} />} /> 
                        : (tal.talepDurum === 1) ? <Chip variant="filled" color="success" label="Onaylandı" avatar={<Avatar src={tal.talepPersonelResim} />} />
                        :(tal.talepDurum == 0 && tal.talepTahminiDeger >= 10000) ? <Chip variant="filled" color="warning" label="Müdür Onayı Bekleniyor" avatar={<Avatar src={tal.talepPersonelResim} />} />
                        : <Chip variant="filled" label="Onay bekleniyor" avatar={<Avatar src={tal.talepPersonelResim} />} />}</td>
                       
                       
                   
                   <td>{tal.talepTahminiDeger.toFixed(2)} <span className="badge bg-success rounded-pill float-end"> {tal.paraBirimi}</span></td>
                    </tr>
                       
                    
                    )
                    :talepList && talepList.length == 0 ? "Yükleniyor" : ""
                    } 

    </>
  )
}

export default SearchSorumluPers;