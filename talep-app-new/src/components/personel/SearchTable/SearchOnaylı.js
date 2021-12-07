import { Avatar, Chip } from '@mui/material';
import React,{useState} from 'react'

const SearchOnaylı = ({startDate,endDate, tal, talepList,PersonelAd,currentEmployee,indexOfFirstEmployee,indexOfLastEmployee }) => {




  return (
    <>
    
     {
                    talepList && talepList.length > 0 ?
                    talepList.sort((a,b) => (a.onayTarih > b.onayTarih ? -1 : 1)).filter(tal => {
                      return startDate === '' && endDate === '' ?
                         tal.personelID == PersonelAd && tal.talepDurum===1 : 
                         PersonelAd && tal.talepTarih >= startDate && tal.talepTarih <= endDate && tal.personelID == PersonelAd && tal.talepDurum === 1
                        || tal.talepTarih === startDate && tal.talepDurum === 1 && tal.personelID == PersonelAd
                    }).slice(indexOfFirstEmployee,indexOfLastEmployee).map(tal => 
                
                    <tr key={tal.talepID}>
                        <td>{tal.talepAd}</td>
                        <td>{tal.talepAciklamasi}</td>
                        <td>{(tal.talepDurum === 2) ? <Chip variant="filled" color="error" label="Onaylanmadı" avatar={<Avatar src={tal.talepPersonelResim} />} /> 
                        : (tal.talepDurum === 1) ? <Chip variant="filled" color="success" label="Onaylandı" avatar={<Avatar src={tal.talepPersonelResim} />} />
                        : <Chip variant="filled" label="Onay bekleniyor" avatar={<Avatar src={tal.talepPersonelResim} />} />}</td>
                        <td><Chip variant="filled" color="info" label={tal.onaylayanAd} avatar={<Avatar src={tal.onaylayanResim} />} /></td>
                        <td>{tal.onayTarih}</td>
                    </tr>
                       
                    
                    )
                    :talepList && talepList.length === 0 ? "Yükleniyor" : ""
                    } 

    </>
  )
}

export default SearchOnaylı;