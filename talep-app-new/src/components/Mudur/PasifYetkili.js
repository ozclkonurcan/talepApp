import Button from '@restart/ui/esm/Button';
import React,{useEffect,useState} from 'react'
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import { Fab } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
const PasifYetkili = (props) => {
    const [talepID,setTalepID] = useState('');
    const [personelID,setPersonelID] = useState('');
    const [talepAd,setTalepAd] = useState('');
    const [talepAciklamasi,setTalepAciklamasi] = useState('');
    const [talepMiktar,setTalepMiktar] = useState('');
    const [talepTahminiDeger,setTalepTahminiDeger] = useState('');
    const [talepDurum,setTalepDurum] = useState('');
    /////////////////////////////////////////////
    
    const [redirect,setRedirect] = useState(false);
    const [talepList, setTalepList] = useState([]);

    const [onayList,setOnayList] = useState([]);

    const [durumList,setDurumList] = useState([])
    ///////////////// * Modal ayar * ////////////////////
    const [modalShow,setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);
    const handleModalOpen = () => setModalShow(true);

    
    const [posts,setPosts] = useState([]);
    const [yetkiliList, setYetkiliList] = useState([]);
    const [q,setQ] = useState('');

    const [currentPage,setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(15);

    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')

    const [perList,setPerList] = useState([])

    const [selectRemove,setSelectRemove]=useState([])
useEffect(() => {
    axios.get(process.env.REACT_APP_API+'yetkili/'+props.PersonelID)
        .then((response) => {
            setPerList(response.data);
            //response.status===200? console.log("giriş yapıldı") : alert("None")
        })
},[])
useEffect(() => {
    axios.get(process.env.REACT_APP_API+'personel')
        .then((response) => {
            setDurumList(response.data);
            //response.status===200? console.log("giriş yapıldı") : alert("None")
        })
},[])

useEffect((e) => {
    axios.get(process.env.REACT_APP_API+'talep')
        .then((response) => {
            setTalepList(response.data);
        })
},[])

if(redirect){

    return <Redirect to="/personelTalepListesi"/>;
}














// useEffect(() => {
//     axios.get('http://localhost:5000/api/talep/')
//         .then((response) => {
//             setTalepList(response.data);
//         })
// },[])




const indexOfLastEmployee = currentPage * employeesPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
const currentEmployee= yetkiliList.slice(indexOfFirstEmployee, indexOfLastEmployee);


const totalPagesNum = Math.ceil(yetkiliList.length / employeesPerPage);


//Search filter
function search(){
 
return(
    yetkiliList.filter(row => (row.personelAd.toLowerCase().indexOf(q) > - 1 ||
    row.sektorID.toLowerCase().indexOf(q) > - 1 ||
    row.sirketID.toLowerCase().indexOf(q) > - 1 ||
    row.departmanID.toLowerCase().indexOf(q) > - 1 ||
    row.statuID.toLowerCase().indexOf(q) > - 1 

    
    ))
)

}

function deleteTal(talepID){
    if(window.confirm('Are you sure?')){
        fetch(process.env.REACT_APP_API+'talep/'+talepID,{
            method:'DELETE',
            header:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        window.location.reload(true)
    }
}
// const deleteCustomerByIds = () => {
//     let arrayids = [];

//     selectRemove.map(sel => {
//         arrayids.push(...sel)
//     })
    
  
// console.log(arrayids)

//     // axios
//     //   .delete(`http://localhost:8080/customers/${arrayids}`)
//     //   .then(data => {
//     //     console.log(data);
//     //     getCustomer();
//     //   })
//     //   .catch(err => alert(err));
//   };
    
    return (
<div>
     <div class="card">
         
               <div class="card-body"  style={{height:"100%"}}>
                 <h5 class="card-title">Aktif olmayan kullanıcı talepleri
                 {/* <Fab size="small" style={{float:"right"}}  onClick={()=>deleteCustomerByIds()}  sx={{backgroundColor:'green',color:"#fff",':hover':{backgroundColor:"#ff784e",color:"#fff"}}} aria-label="add">
  <DeleteForeverIcon />
</Fab> */}
                 </h5>
                 <table className="table mt-1 table-bordered">
                <thead className="table-light">
                    <tr>
                        {/* <th>Seç </th> */}
                        <th>Personel</th>
                        <th>Talep Ad</th>
                        <th>Açıklama</th>
                        <th>Sil</th>
                    </tr>
                </thead>
                <tbody>
                {
                    
                    talepList && talepList.length > 0 ?
                    talepList.sort((a,b) => (a.talepTarih > b.talepTarih ? -1 : 1)).filter(tal => {
                        return  tal.personelID !== props.PersonelAd && tal.talepDurum === 0 && tal.personelStatuID !==3 &&
                         perList.some(per => per.sektorID === tal.sektorID && per.sirketID === tal.sirketID && per.departmanID === tal.departmanID)
                         && durumList.some(drm => drm.personelAd === tal.personelID && drm.durumID === "Pasif")
 
                    }).slice(indexOfFirstEmployee,indexOfLastEmployee).map(tal => 
               
                    <tr key={tal.talepID}>
                  
                        {/* <td>
                        <Checkbox
                          onChange={(e) => setSelectRemove(e.target.checked=tal.talepID)}
                          sx={{color:"#ff784e",'&.Mui-checked': {color:"#ff5722",}}}  icon={<DeleteOutlineIcon  />} checkedIcon={<DeleteIcon />} 
                        />
            
                        </td> */}
                        <td>{tal.personelID}</td>
                        <td>{tal.talepAd}</td>
                        <td>{tal.talepAciklamasi}</td>
                        <td>
                        <Fab size="small"  onClick={()=>deleteTal(tal.talepID)}  sx={{backgroundColor:'#ff5722',color:"#fff",':hover':{backgroundColor:"#ff784e",color:"#fff"}}} aria-label="add">
  <DeleteForeverIcon />
</Fab>
                        </td>
                    </tr>
                       
                    
                    )
                    :"Yükleniyor"
                    }
                    {/* <SearchModalOnay startDate={startDate} endDate={endDate} talepList={search(talepList)}  indexOfLastEmployee={indexOfLastEmployee} indexOfFirstEmployee={indexOfFirstEmployee} PersonelResim={props.PersonelResim} PersonelAd={props.PersonelAd} PersonelID={props.PersonelID} PersonelDepartmanID={props.PersonelDepartmanID} YetkiliButce={props.YetkiliButce} /> */}
                   <div className="row d-flex justify-content-center">
                       <div className="col-md-12 float-end">
                       {/* <Pagination  pages={totalPagesNum} PersonelAd={props.PersonelAd} setCurrentPage={setCurrentPage} YetkiliButce={props.YetkiliButce} /> */}
                      
              

                       </div>
                   </div>
                </tbody>
                
            </table>
   
               </div>
             </div>
           </div>
    )
}

export default PasifYetkili
