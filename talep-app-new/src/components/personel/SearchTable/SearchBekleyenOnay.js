import { Avatar, Chip } from '@mui/material';
import React,{useState} from 'react'


const SearchBekleyenOnay = ({ startDate,endDate, tal, talepList,PersonelAd,currentEmployee,indexOfFirstEmployee,indexOfLastEmployee }) => {

	

  return (
    <>
    
     {
                    talepList && talepList.length > 0 ?
                    talepList.sort((a,b) => (a.talepTarih > b.talepTarih ? -1 : 1)).filter(tal => {
                        return startDate === '' && endDate === '' ?
                         tal.personelID == PersonelAd && tal.talepDurum===0 : 
                         PersonelAd && tal.talepTarih >= startDate && tal.talepTarih <= endDate && tal.personelID == PersonelAd && tal.talepDurum === 0
                        || tal.talepTarih === startDate && tal.talepDurum === 0 && tal.personelID == PersonelAd
                    }).slice(indexOfFirstEmployee,indexOfLastEmployee).map(tal => 
                
                    <tr key={tal.talepID}>
                        <td>{tal.talepAd}</td>
                        <td>{tal.talepAciklamasi}</td>
                        <td>{(tal.talepDurum === 2) ? <Chip variant="filled" color="error" label="Onaylanmadı" avatar={<Avatar src={tal.talepPersonelResim} />} /> 
                        : (tal.talepDurum === 1) ? <Chip variant="filled" color="success" label="Onaylandı" avatar={<Avatar src={tal.talepPersonelResim} />} />
                        :(tal.talepDurum == 0 && tal.talepTahminiDeger >= 10000) ?  <Chip variant="filled" color="warning" label="Müdür Onayı Bekleniyor" avatar={<Avatar src={tal.talepPersonelResim} />} />
                        : <Chip variant="filled" label="Onay bekleniyor" avatar={<Avatar src={tal.talepPersonelResim} />} />}</td>
                        {/* <td>
                          {(tal.talepTahminiDeger > 10000) ? <span class="badge rounded-pill bg-danger">Bütçeyi aşan talep</span> :
                          <span class="badge rounded-pill bg-success">Bütçeye uygun talep </span> }
                        </td> */}
                    </tr>

                 
                       
                    
                    )
                    :talepList && talepList.length == 0 ? "Yükleniyor" : ""
                    } 

    </>
  )
}

export default SearchBekleyenOnay;