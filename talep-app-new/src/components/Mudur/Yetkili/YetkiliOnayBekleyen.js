import React,{useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { Alert, Stack } from 'react-bootstrap';
import SearchYoneticiOnay from '../Yetkili/search/SearchOnayBekleyen';
//import Pagination from '../../personel/Pagination/Pagination';
import Pagination from '@mui/material/Pagination';
import { TextField } from '@mui/material';

const YoneticiOnay = (props) => {

    // const [talepID,setTalepID] = useState('');
    // const [personelID,setPersonelID] = useState('');
    // const [talepAd,setTalepAd] = useState('');
    // const [talepAciklamasi,setTalepAciklamasi] = useState('');
    // const [talepMiktar,setTalepMiktar] = useState('');
    // const [talepTahminiDeger,setTalepTahminiDeger] = useState('');
    /////////////////////////////////////////////
    
    const [redirect,setRedirect] = useState(false);
    const [talepList, setTalepList] = useState([]);


    ///////////////// * Modal ayar * ////////////////////

    const [q,setQ] = useState('');

    const [currentPage,setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(6);

    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')

// const submit = async (e) => {
//     e.preventDefault();

//     let data ={talepID,personelID,talepAd,talepAciklamasi,talepMiktar,talepTahminiDeger}
//     await fetch('http://localhost:5000/api/talep',{
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json',
//             'Accept':'application/json'
//         },
//         body:JSON.stringify(data)
//     })
//     .then((result) => {
//         //console.war(result);
//         result.json().then((resp) => {
//                 console.log(resp);
//         })
//     });
//     setRedirect(true);
// }

const [perList,setPerList] = useState([])
useEffect(() => {
    axios.get(process.env.REACT_APP_API+'yetkili/'+props.PersonelID)
        .then((response) => {
            setPerList(response.data);
        })
},[])

const fetchUrl = process.env.REACT_APP_API+"talep/"
useEffect(() => {
  async function fetchData() {
    const data = await axios.get(fetchUrl)
    setTalepList(data.data)
    return data
  }
  fetchData()
}, [fetchUrl])

if(redirect){

    return <Redirect to="/personelTalepListesi"/>;
}




const indexOfLastEmployee = currentPage * employeesPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
const currentEmployee= talepList.slice(indexOfFirstEmployee, indexOfLastEmployee);


const totalPagesNum = Math.ceil(talepList.filter(tal => {
   return tal.personelID !== props.PersonelAd && tal.talepDurum === 0  && tal.personelStatuID === 2 
   &&   perList.some(per => per.sektorID === tal.sektorID && per.sirketID === tal.sirketID && per.departmanID === tal.departmanID)

}).length / employeesPerPage);



 //Search filter
 function search(){
     
    return(
        talepList.filter(row => (row.talepAd.toLowerCase().indexOf(q) > - 1 ||
        row.departmanID.toLowerCase().indexOf(q) > - 1 ||
        row.personelID.toLowerCase().indexOf(q) > - 1 ||
        row.talepMiktar.toString().indexOf(q) >-1 ||
        row.agirlikBirimi.toLowerCase().indexOf(q) > - 1 ||
        row.paraBirimi.toLowerCase().indexOf(q) > - 1 ||
        row.talepTahminiDeger.toString().indexOf(q) > - 1
        ))
    )
}
 




    return (
        <div>
                   
        <div className="container">
        <div class="card p-1">
            <div class="card-body"  style={{height:"80vh"}}>
            <h5 className="card-title">Yetkili Onay Bekleyen</h5>
        <Alert style={{height:"15px",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}} className="alert alert-info">Toplam Talep Tutarı : {talepList.filter(tal => {
        return tal.personelID !== props.PersonelAd && tal.talepDurum === 0 && tal.personelStatuID===2
        &&   perList.some(per => per.sektorID === tal.sektorID && per.sirketID === tal.sirketID && per.departmanID === tal.departmanID)
      }).reduce((a,v) => a = a+ v.talepTahminiDeger,0)+" TL"}</Alert>

        <div className="row g-0 justify-content-center">
            <div className="col-md-12">
            <div className="row g-0 mt-3">
            <div className="col-md-8">
                
            <Stack>
<TextField id="filled-basic" label="Arama..." variant="filled" onChange={(e) => setQ(e.target.value.toLowerCase())} />
</Stack>   
                {/* <input type="text" value={q} onChange={(e) => setQ(e.target.value)} className="search form-control" placeholder="Arama..." /> */}
                </div>
                <div className="col-md-2">
                <TextField type="date" className="float-end"   id="outlined-basic" variant="filled" onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="col-md-2">
                <TextField type="date" className="float-end" id="outlined-basic"  variant="filled" onChange={(e) => setEndDate(e.target.value)} />
                </div>
            </div>
           
            {/* <BootstrapTable keyField='talepID' columns={columns} data={talepList} /> */}
            <table className="table mt-1 table-bordered">
                <thead className="table-light">
                    <tr>
                    
                    <th>Personel Ad</th>
                    <th>Departman</th>
                        <th>Talep Ad</th>
                        {/* <th>Talep Açıklaması</th> */}
                        <th>Talep Miktarı</th>
                        <th>Talep Durum</th>
                        <th>Tahmini Fiyat</th>
                    </tr>
                </thead>
                <tbody>
               
                   

                    <SearchYoneticiOnay startDate={startDate} endDate={endDate} talepList={search(talepList)} PersonelID={props.PersonelID} indexOfLastEmployee={indexOfLastEmployee} indexOfFirstEmployee={indexOfFirstEmployee} PersonelAd={props.PersonelAd} />
                   <div className="row d-flex justify-content-center">
                       <div className="col-md-12 float-end">
                       {/* <Pagination pages={totalPagesNum} PersonelAd={props.PersonelAd} setCurrentPage={setCurrentPage} /> */}
                       </div>
                   </div>


                </tbody>
                
            </table>
   
            </div>
        </div> </div>


{/* Modal olacak güncelleme içi */}
{/* <div className="row g-0 justify-content-center">
<div className="col-md-4">
<form onSubmit={submit}>
            <input className="form-control mt-3" value={personelID} onChange={(e)=>{setPersonelID(e.target.value)}} name="personelID" disabled hidden />
            <input className="form-control mt-3" value={sektorID} onChange={(e)=>{setSektorID(e.target.value)}} name="sektorID" disabled hidden  />
            <input className="form-control mt-3" value={sirketID} onChange={(e)=>{setSirketID(e.target.value)}} name="sirketID" disabled hidden />
            <input className="form-control mt-3" value={departmanID} onChange={(e)=>{setDepartmanID(e.target.value)}} name="departmanID" disabled hidden />
            <input className="form-control mt-3" placeholder="Talep Adı" value={talepAd} onChange={(e)=>{setTalepAd(e.target.value)}}  name="talepAd" />
            <textarea className="form-control mt-3" placeholder="Talep Açıklaması"  value={talepAciklamasi} onChange={(e)=>{setTalepAciklamasi(e.target.value)}} name="talepAciklamasi" />
            <input className="form-control mt-3" placeholder="Talep Miktarı"  value={talepMiktar} onChange={(e)=>{setTalepMiktar(e.target.value)}} name="talepMiktar" />
            <input className="form-control mt-3" placeholder="Talep Tahmini Fiyatı"  value={talepTahminiDeger} onChange={(e)=>{setTalepTahminiDeger(e.target.value)}} name="talepTahminiDeger" />
            <button  className="w-100 btn btn-lg btn-primary mt-3" type="submit">Kayıt et</button>
        </form>
</div>
</div> */}
<Stack spacing={2}>
      <Pagination count={totalPagesNum}
      variant="outlined" color="primary"
    PersonelAd={props.PersonelAd}
    //defaultPage={setCurrentPage}
    defaultPage={1}
    onChange={(event,value) => setCurrentPage(value)}
    showFirstButton={true}
    showLastButton={true}
    sx={{ mx: "auto"}}
       />
</Stack>
    </div>



    </div>
    </div>
    )
}

export default YoneticiOnay
