
import { Avatar, Chip } from '@mui/material'
import axios from 'axios'
import React,{useEffect, useState} from 'react'

const SearchYoneticiOnay = ({startDate,endDate, tal,PersonelID, talepList,PersonelAd,currentEmployee,indexOfFirstEmployee,indexOfLastEmployee }) => {

  const [perList,setPerList] = useState([])
  useEffect(() => {
      axios.get(process.env.REACT_APP_API+'yetkili/'+PersonelID)
          .then((response) => {
              setPerList(response.data);
          })
  },[])
  
  return (
    <>
    
     {
                    talepList && talepList.length > 0 ?
                    talepList.sort((a,b) => (a.talepTarih > b.talepTarih ? -1 : 1)).filter(tal => {
                        return startDate === '' && endDate === '' ?
                        tal.personelID != PersonelAd && tal.personelStatuID ===2 && tal.talepDurum === 1
                        &&   perList.some(per => per.sektorID === tal.sektorID && per.sirketID === tal.sirketID && per.departmanID === tal.departmanID) : 
                         PersonelAd && tal.talepTarih >= startDate && tal.talepTarih <= endDate && tal.personelID != PersonelAd && tal.personelStatuID ===2 && tal.talepDurum === 1
                        &&   perList.some(per => per.sektorID === tal.sektorID && per.sirketID === tal.sirketID && per.departmanID === tal.departmanID)
                        || tal.talepTarih === startDate && tal.personelID != PersonelAd && tal.personelStatuID ===2 && tal.talepDurum === 1
                        &&   perList.some(per => per.sektorID === tal.sektorID && per.sirketID === tal.sirketID && per.departmanID === tal.departmanID)
                        
                         
                    }).slice(indexOfFirstEmployee,indexOfLastEmployee).map(tal => 
                    <tr key={tal.talepID}>
                        <td>{tal.personelID}</td>
                        <td>{tal.departmanID}</td>
                        <td>{tal.talepAd}</td>
                        {/* <td>{tal.talepAciklamasi}</td> */}
                        <td>{tal.talepMiktar} <span className="badge bg-primary rounded-pill float-end">{tal.agirlikBirimi}</span></td>
                        
                        <td>{(tal.talepDurum === 2) ? <Chip variant="filled" color="error" label="Onaylanmadı" avatar={<Avatar src={tal.talepPersonelResim} />} /> 
                        : (tal.talepDurum === 1) ? <Chip variant="filled" color="success" label="Onaylandı" avatar={<Avatar src={tal.talepPersonelResim} />} />
                        : <Chip variant="filled" label="Onay bekleniyor" avatar={<Avatar src={tal.talepPersonelResim} />} />}</td>
                        <td>{tal.talepTahminiDeger.toFixed(2)} <span className="badge bg-success rounded-pill float-end"> {tal.paraBirimi}</span></td>
                     
                        <td><Chip variant="filled" color="info" label={tal.onaylayanAd} avatar={<Avatar src={tal.onaylayanResim} />} /></td>
                    </tr>
                       
                    
                    )
                    :"Yükleniyor"
                    }

    </>
  )
}

export default SearchYoneticiOnay;