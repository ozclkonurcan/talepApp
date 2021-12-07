import { Fab } from '@mui/material'
import React from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import alertify from 'alertifyjs'
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import SendToMobileOutlinedIcon from '@mui/icons-material/SendToMobileOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
const PersonelSearch = ({personelList,indexOfFirstEmployee,indexOfLastEmployee,startDate,endDate,DurumID,SektorID,SirketID,DepartmanID}) => {

    function sendMobilPasswordDep(personelTel,personelEmail,personelPassword){ 
            fetch(process.env.REACT_APP_API+'sms/send/',{
              method:'POST',
              headers:{
                  'Content-Type':'application/json',
                  'Accept':'application/json'
              },
              body:JSON.stringify({
                smsToNumber:"0"+personelTel,
                personelAd:personelEmail,
                personelPassword:personelPassword
              })
          })
          .then((result) => {
              result.status === 200 ? alertify.success("Sms gönderildir"):
              alertify.error('Sms gönderilirken bir hata oluştu')
              //console.war(result);
              result.json().then((resp) => {
              })
          });
         
        
    }
    function sendEmailPasswordDep(personelEmail,personelAd,xpersonelEmail,personelPassword){ 
      
        fetch(process.env.REACT_APP_API+'PassEmail/Send/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify({
            toPassEmail:personelEmail,
            personelAd:personelAd,
            personelEmail:xpersonelEmail,
            password:personelPassword
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

    function aktifPersonel(personelID){
        let durum = {durumID:2};
        fetch(process.env.REACT_APP_API+'personel/durum/'+personelID,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify(durum)
        })
        .then((result) => {
            result.status === 200 ? alertify.success("Pasifleştirildi.") && window.location.reload(true):
            alertify.error('Bir hata oluştu')
            //console.war(result);
            result.json().then((resp) => {
            })
        });
    }
    function pasifPersonel(personelID){
        let durum = {durumID:1};
    
        fetch(process.env.REACT_APP_API+'personel/durum/'+personelID,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify(durum)
        })
        .then((result) => {
            result.status === 200 ? alertify.success("Aktifleştirildi.") && window.location.reload(true):
            alertify.error('Bir hata oluştu')
            //console.war(result);
            result.json().then((resp) => {
            })
        });
    }


    return (
       <>
         {
                personelList && personelList.length > 0 ?
                   
                personelList.filter(yet => {
                    return SektorID==='' && SirketID === '' && DepartmanID === '' && DurumID === '' && startDate === '' && endDate === '' ?
                    yet.personelAd 
                    :
                    yet.sektorID === SektorID && yet.sirketID === SirketID && yet.departmanID === DepartmanID && yet.durumID === DurumID
                    ||yet.personelTarih >= startDate && yet.personelTarih <= endDate && yet.personelAd && yet.durumID === DurumID
                   || yet.personelTarih === startDate &&  yet.personelAd && yet.durumID === DurumID
                    
                    
                    
                }).sort((a,b) => (a.durumID < b.durumID ? -1 : 1))
                .slice(indexOfFirstEmployee,indexOfLastEmployee)
                .map(tal => 
               
                   <tr key={tal.personelID}>
                       <td>{ tal.durumID === "Aktif" ? tal.personelAd : <del style={{opacity:0.3}}> {tal.personelAd}</del>}</td>
                       <td>{tal.durumID=== "Aktif" ? tal.sektorID : <del style={{opacity:0.3}} > {tal.sektorID}</del>}</td>
                       <td>{tal.durumID=== "Aktif" ? tal.sirketID: <del style={{opacity:0.3}} > {tal.sirketID}</del>}</td>
                       <td>{tal.durumID=== "Aktif" ? tal.departmanID: <del style={{opacity:0.3}} > {tal.departmanID}</del>}</td>
                       <td>{tal.durumID=== "Aktif" ? tal.personelTel : <del style={{opacity:0.3}} > {tal.personelTel}</del>}</td>
                       <td>{tal.durumID=== "Aktif" ? tal.personelEmail : <del style={{opacity:0.3}} > {tal.personelEmail}</del>}</td>
                       <td>{tal.durumID=== "Aktif" ? tal.statuID : <del style={{opacity:0.3}} > {tal.statuID}</del>}</td>
                       <td><strong>{tal.durumID}</strong></td>
                       <td>
                           {tal.durumID === "Aktif" ? 
                        <Fab size="small" style={{marginRight:"10px"}}  variant="extended"  sx={{backgroundColor:'#e91e63',color:"#fff",':hover':{backgroundColor:"#ed4b82",color:"#fff"}}} onClick={()=>sendMobilPasswordDep(tal.personelTel,tal.personelEmail,tal.personelPassword)}><PasswordOutlinedIcon/></Fab>
                        : 
                        <Fab size="small" disabled style={{marginRight:"10px"}}  variant="extended"  sx={{backgroundColor:'#e91e63',color:"#fff",':hover':{backgroundColor:"#ed4b82",color:"#fff"}}} onClick={()=>sendMobilPasswordDep(tal.personelTel,tal.personelEmail,tal.personelPassword)}><PasswordOutlinedIcon/></Fab>
                        }
                          {tal.durumID === "Aktif" ? 
                       <Fab size="small" style={{marginRight:"10px"}}  variant="extended"  sx={{backgroundColor:'#ffc107',color:"#fff",':hover':{backgroundColor:"#ffcd38",color:"#fff"}}} onClick={()=>sendEmailPasswordDep(tal.personelEmail,tal.personelAd,tal.personelEmail,tal.personelPassword)}><ForwardToInboxOutlinedIcon/></Fab>
                       :
                       <Fab size="small" disabled style={{marginRight:"10px"}}  variant="extended"  sx={{backgroundColor:'#ffc107',color:"#fff",':hover':{backgroundColor:"#ffcd38",color:"#fff"}}} onClick={()=>sendEmailPasswordDep(tal.personelEmail,tal.personelAd,tal.personelEmail,tal.personelPassword)}><ForwardToInboxOutlinedIcon/></Fab>
                    }
                     
                       </td>
                    <td>
                    {tal.durumID === "Aktif" ?
                       <Fab size="small"  variant="extended"  sx={{backgroundColor:'#2979ff',color:"#fff",':hover':{backgroundColor:"#5393ff",color:"#fff"}}} onClick={()=>aktifPersonel(tal.personelID)}> <VisibilityOffIcon/> </Fab>
                       :  <Fab size="small"  variant="extended"  sx={{backgroundColor:'#2979ff',color:"#fff",':hover':{backgroundColor:"#5393ff",color:"#fff"}}} onClick={()=>pasifPersonel(tal.personelID)}> <VisibilityIcon/> </Fab> }
                       
                    </td>
             
                   </tr>
                      
                   
                   )
                   :"Yükleniyor"
                   }
       </>
    )
}

export default PersonelSearch
