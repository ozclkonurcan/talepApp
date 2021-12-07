import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import BootstrapTable from 'react-bootstrap-table-next';
import SearchPersonelTalepList from './SearchTable/SearchPersonelTalepList';
//import Pagination from './Pagination/Pagination';
import { TextField } from '@mui/material';

//MUI
import Pagination from '@mui/material/Pagination';

import Stack from '@mui/material/Stack';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Box } from '@mui/system';


const PersonelTalepListesi = (props) => {

    
   

    const [posts,setPosts] = useState([]);
    const [talepList, setTalepList] = useState([]);
    const [q,setQ] = useState('');

    const [currentPage,setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(7);

    

    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')
   const arrayChange = (e) => {
       console.log(e.target.value);
     
   }



  

    // useEffect(() => {
    //     axios.get('http://localhost:5000/api/talep/')
    //         .then((response) => {
    //             setTalepList(response.data);
    //         })
    // },[])

    const fetchUrl = process.env.REACT_APP_API+"talep/"
    useEffect(() => {
      async function fetchData() {
        const data = await axios.get(fetchUrl)
        setTalepList(data.data)
        return data
      }
      fetchData()
    }, [fetchUrl])



const indexOfLastEmployee = currentPage * employeesPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
const currentEmployee= talepList.slice(indexOfFirstEmployee, indexOfLastEmployee);


const totalPagesNum = Math.ceil(talepList.filter(tal => {
   return tal.personelID == props.PersonelAd
}).length / employeesPerPage);


 //Search filter
 function search(){
     
    return(
        talepList.filter(row => (row.talepAd.toLowerCase().indexOf(q) > - 1 ||
        row.talepAciklamasi.toLowerCase().indexOf(q) > - 1 ||
        row.talepMiktar.toString().indexOf(q) >-1 ||
        row.agirlikBirimi.toLowerCase().indexOf(q) > - 1 ||
        row.talepTarih.toString().indexOf(q) > - 1 

        
        ))
    )

}


    return (
        <div>
         <div class="card p-1">
        <div class="card-body"  style={{height:"80vh"}}>
        <h5 class="card-title">Personel Talep Formları</h5>
             
        <div className="container">
       
        <div className="row g-0 justify-content-center">
            <div className="col-md-12">
            <div className="row g-0 mt-3">
         
                <div className="col-md-8">
               
                
             <TextField id="standard-basic" className="search form-control" placeholder="Arama..." label="Arama..." variant="outlined" value={q} onChange={(e) => setQ(e.target.value)} />
     
                </div>
                <div className="col-md-2">
                <TextField type="date" className="float-end"   id="outlined-basic" variant="outlined" onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="col-md-2">
                <TextField type="date" className="float-end" id="outlined-basic"  variant="outlined" onChange={(e) => setEndDate(e.target.value)} />
                </div>
            </div>
           
            {/* <BootstrapTable keyField='talepID' columns={columns} data={talepList} /> */}
            <table className="table mt-1 table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Talep Ad</th>
                        <th>Talep Açıklaması</th>
                        <th>Talep Miktarı</th>
                        <th>Talep Durum</th>
                    </tr>
                </thead>
                <tbody>
               
                {/* {
                    talepList && talepList.length > 0 ?
                    
                    talepList.filter(talp => {
                    return talp.personelID == props.PersonelAd 
                }).map(tal => 
                
                    <tr key={tal.talepID} talepList={search(talepList)}>
                        <td>{tal.talepAd}</td>
                        <td>{tal.talepAciklamasi}</td>
                        <td>{tal.talepMiktar}</td>
                        <td>{(tal.talepDurum == 2) ? <span class="badge rounded-pill bg-danger">Onaylanmadı</span> 
                        : (tal.talepDurum == 1) ? <span class="badge rounded-pill bg-success">Onaylandı</span> 
                        : <span class="badge rounded-pill bg-secondary">Onay bekleniyor</span>}</td>
                    </tr>
                       
                    
                    )
                    :"Yükleniyor"
                    } */}
                    
                    <SearchPersonelTalepList startDate={startDate} endDate={endDate} talepList={search(talepList)} indexOfLastEmployee={indexOfLastEmployee} indexOfFirstEmployee={indexOfFirstEmployee} PersonelAd={props.PersonelAd} />
                   <div className="row d-flex justify-content-center">
                       <div className="col-md-12 float-end">
                       {/* <Pagination pages={totalPagesNum} PersonelAd={props.PersonelAd} setCurrentPage={setCurrentPage} /> */}
                       </div>
                   </div>
                </tbody>
                
            </table>
    
            </div>
        </div>
        </div>
        </div>

        <Stack spacing={2}>
      <Pagination count={totalPagesNum}
      variant="outlined" color="primary"
    PersonelAd={props.PersonelAd}
    //defaultPage={setCurrentPage}
    defaultPage={1}
    onChange={(event,value) => setCurrentPage(value)}
    YetkiliButce={props.YetkiliButce}
    showFirstButton={true}
    showLastButton={true}
    sx={{ mx: "auto" }}
       />
</Stack>
        </div>
        </div>
    )
}

export default PersonelTalepListesi
