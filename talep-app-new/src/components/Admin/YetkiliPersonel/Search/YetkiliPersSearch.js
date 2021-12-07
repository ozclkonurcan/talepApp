import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import React,{useState,useEffect} from 'react'
import axios from 'axios'
const PersonelSearch = ({startDate,endDate,personelID,yetkiliList,indexOfFirstEmployee,indexOfLastEmployee,personelAd}) => {

   


const [perList,setPersonelList] = useState([])

    function deleteDep(yetkiID){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'yetkili/'+yetkiID,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            window.location.reload(true)
        }
    }


    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'personel')
            .then((response) => {
                setPersonelList(response.data);
            })
    },[])


    return (
       <>
      
      {
        yetkiliList &&  yetkiliList.length > 0 ?
        yetkiliList.filter(yet => {
            return personelID === '' && startDate === '' && endDate === '' ?
            yet.personelAd
            :
            startDate === '' && endDate === '' ?
            yet.personelAd === personelID : 
            yet.yetkiTarih >= startDate && yet.yetkiTarih <= endDate && yet.personelAd === personelID
           || yet.yetkiTarih === startDate && yet.personelAd === personelID
            
            
            
        }).sort((a,b) => (a.personelID > b.personelID ? -1 : 1))
        .slice(indexOfFirstEmployee,indexOfLastEmployee).map(tal => 
                
                        <tr key={tal.yetkiID}>
                       <td>{perList.some(per => per.personelID === tal.personelID && per.durumID === "Aktif") ? tal.personelAd : <del style={{opacity:0.3}} >{tal.personelAd}</del>}</td>
                       <td>{perList.some(per => per.personelID === tal.personelID && per.durumID === "Aktif") ? tal.sektorID : <del style={{opacity:0.3}} >{tal.sektorID}</del> }</td>
                       <td>{perList.some(per => per.personelID === tal.personelID && per.durumID === "Aktif") ? tal.sirketID : <del style={{opacity:0.3}} >{tal.sirketID}</del>}</td>
                       <td>{perList.some(per => per.personelID === tal.personelID && per.durumID === "Aktif") ? tal.departmanID :<del style={{opacity:0.3}} >{tal.departmanID}</del>}</td>
                       <td>{perList.some(per => per.personelID === tal.personelID && per.durumID === "Aktif") ? tal.statuID :<del style={{opacity:0.3}} >{tal.statuID}</del>}</td>
                       <td><Button size="small" variant="outlined"  onClick={()=>deleteDep(tal.yetkiID)} startIcon={<DeleteIcon />}>
 Delete
</Button></td>
                    
                   </tr>
                       
                    
                    )
                    : yetkiliList &&  yetkiliList.length == 0 ? "Yükleniyor" : ""
                    } 
       </>
    )
}

export default PersonelSearch
