import Button from '@restart/ui/esm/Button';
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import BekleyenOnayModal from './BekleyenOnayModal';
import { Modal } from 'react-bootstrap';

const DepartmanGuncelle = () => {

    const [onayList,setOnayList] = useState([]);
    const [departmanList,setDepartmanList] = useState([]);
    const [sirketList, setSirketList] = useState([]);
    const [sektorList, setSektorList] = useState([]);
    const [sektorID,setSektorID] = useState('');
    const [sirketID,setSirketID] = useState('');
    
    const [departmanID,setDepartmanID] = useState('');

    const [modalShow,setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);
    const handleModalOpen = () => setModalShow(true);

    useEffect((e) => {
        axios.get(process.env.REACT_APP_API+'departman/')
            .then((response) => {
                setDepartmanList(response.data);
            })
    },[])

    
    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'sektor')
            .then((response) => {
                setSektorList(response.data);
            })
    },[])
    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'sirket')
            .then((response) => {
                setSirketList(response.data);
            })
    },[])


    return (
        <div>
     <div class="card">
            <div class="card-body"  style={{height:"85vh"}}>
              <h5 class="card-title">Departman Güncelleme Formu</h5>
        <div className="container">
        <div className="row">
        <div class="col-md-6">
                  <select id="inputState" class="form-select" onChange={(e) => (setSektorID(e.target.value))}>
                    <option selected>Sektör Seç</option>
                    {sektorList.map(sek => 
                    <option key={sek.sektorID} value={sek.sektorAd}>{sek.sektorAd}</option>
                    )}
                  </select>
                </div>
                <div class="col-md-6">
                  <select id="inputState" class="form-select" onChange={(e) => (setSirketID(e.target.value))}>
                    <option selected>Şirket Seç</option>
                    {sirketList.filter(sir => {
                      return sektorID===sir.sektorID
                    }).map(sir => 
                    <option key={sir.sirketID} value={sir.sirketAd} >{sir.sirketAd}</option>
                    )}
                  </select>
                </div>
        </div>
        <div className="row g-0 justify-content-center">
        
        <div className="col-md-12">
        <div className="row g-0 mt-3">
        
  
        
        
        </div>
        
        {/* <BootstrapTable keyField='talepID' columns={columns} data={talepList} /> */}
        <table className="table mt-1 table-bordered">
          <thead className="table-light">
              <tr>
                  <th>Sektor</th>
                  <th>Sirket</th>
                  <th>Departman</th>
                  <th>İşlemler</th>
                  
              </tr>
          </thead>
          <tbody>
          {
            departmanList && departmanList.length > 0 ?
            departmanList.filter(deps => {
                             return sirketID === deps.sirketID
                         }).map(tal => 
                    <tr key={tal.departmanID}>

                        <td>{tal.sektorID}</td>
                        <td>{tal.sirketID}</td>
                        <td>{tal.departmanAd}</td>
                        
                        <td><Button onClick={() => (
                            setModalShow(true),
                            setOnayList(tal)
                         ) }  className="btn btn-info text-white">İşlemler</Button></td>
                    </tr>
                       
                    
                    )
                    :"Yükleniyor"
                    }
{/*         
              <SearchOnaylıPersonel talepList={search(talepList)} indexOfLastEmployee={indexOfLastEmployee} indexOfFirstEmployee={indexOfFirstEmployee} PersonelAd={props.PersonelAd} />
                           <div className="row d-flex justify-content-center">
                               <div className="col-md-12 float-end">
                               <Pagination pages={totalPagesNum} PersonelAd={props.PersonelAd} setCurrentPage={setCurrentPage} />
                               </div>
                           </div> */}
             
          </tbody>
          
        </table>
        
        <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header>
            <Modal.Title>
                {onayList.personelAd}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <BekleyenOnayModal editTalepDurum={onayList}/>
        </Modal.Body>
        <Modal.Footer>
            <Button className="btn btn-danger" onClick={handleModalClose} variant="danger">
                Close Button
            </Button>
        </Modal.Footer>
    </Modal>

        </div>
        </div> 
        
        
        
        </div>
        
        
        
        
        </div>
        </div>
        </div>
     

                
                

    )
}

export default DepartmanGuncelle
