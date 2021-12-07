import React,{useState} from 'react'

const SearchYetkiliList = ({ tal, talepList,PersonelAd,currentEmployee,indexOfFirstEmployee,indexOfLastEmployee }) => {


  return (
    <>
    
     {
                    talepList && talepList.length > 0 ?
                    talepList.sort((a,b) => (a.talepAd < b.talepAd ? -1 : 1)).filter(tal => {
                        return tal.personelID == PersonelAd 
                    }).slice(indexOfFirstEmployee,indexOfLastEmployee).map(tal => 
                
                    <tr key={tal.talepID}>
                        <td>{tal.talepAd}</td>
                        <td>{tal.talepAciklamasi}</td>
                        <td>{tal.talepMiktar}</td>
                        <td>{(tal.talepDurum == 2) ? <span class="badge rounded-pill bg-danger">Onaylanmadı</span> 
                        : (tal.talepDurum == 1) ? <span class="badge rounded-pill bg-success">Onaylandı</span> 
                        : <span class="badge rounded-pill bg-secondary">Onay bekleniyor</span>}</td>
                    </tr>
                       
                    
                    )
                    :talepList && talepList.length == 0 ? "Yükleniyor" : ""
                    } 

    </>
  )
}

export default SearchYetkiliList;