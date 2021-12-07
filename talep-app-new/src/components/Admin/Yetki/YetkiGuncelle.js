import Button from '@restart/ui/esm/Button';
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import BekleyenOnayModal from './BekleyenOnayModal';
import { Modal } from 'react-bootstrap';

const YetkiGuncelle = () => {

    const [onayList,setOnayList] = useState([]);
    const [statuList,setStatuList] = useState([]);

    const [modalShow,setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);
    const handleModalOpen = () => setModalShow(true);

    useEffect((e) => {
        axios.get(process.env.REACT_APP_API+'statu/')
            .then((response) => {
                setStatuList(response.data);
            })
    },[])
    return (
        <div>
          <div class="card">
            <div class="card-body"  style={{height:"85vh"}}>
              <h5 class="card-title">Yetki Güncelleme Formu</h5>
   
        <div className="container">
     
        <div className="row g-0 justify-content-center">
        
        <div className="col-md-12">
        <div className="row g-0 mt-3">
        
  
        
        
        </div>
        
        {/* <BootstrapTable keyField='talepID' columns={columns} data={talepList} /> */}
        <table className="table mt-1 table-bordered">
          <thead className="table-light">
              <tr>
                  <th>Yetki ID</th>
                  <th>Yetki</th>
                  
              </tr>
          </thead>
          <tbody>
          {
            statuList && statuList.length > 0 ?
                    statuList.map(tal => 
                    <tr key={tal.statuID}>
                        <td>{tal.statuAd}</td>
                        
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

export default YetkiGuncelle
