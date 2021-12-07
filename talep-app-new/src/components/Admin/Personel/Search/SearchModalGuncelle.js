import React,{useState} from 'react'

import Button from '@restart/ui/esm/Button';
import { Modal,Form } from 'react-bootstrap';

import BekleyenOnayModal from '../../modal/BekleyenOnayModal';


const SearchModalYetkili = ({ personelList,PersonelAd,currentEmployee,indexOfFirstEmployee,indexOfLastEmployee }) => {

    const [onayList,setOnayList] = useState([]);

    ///////////////// * Modal ayar * ////////////////////
    const [modalShow,setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);
    const handleModalOpen = () => setModalShow(true);

  return (
    <>
    
     {
        personelList && personelList.length > 0 ?
                   
                   personelList.sort((a,b) => (a.talepAd < b.talepAd ? -1 : 1))
                   .slice(indexOfFirstEmployee,indexOfLastEmployee)
                   .map(tal => 
                  
                      <tr key={tal.personelID}>
                          <td>{tal.personelID}</td>
                          <td>{tal.personelAd}</td>
                          <td>{tal.cinsiyetID}</td>
                          <td>{tal.sektorID}</td>
                          <td>{tal.sirketID}</td>
                          <td>{tal.departmanID}</td>
                          <td>{tal.personelTel}</td>
                          <td>{tal.personelEmail}</td>
                          <td>{tal.statuID}</td>
                          <td><Button onClick={() => (
                            setModalShow(true),
                            setOnayList(tal)
                         ) }  className="btn btn-warning btn-sm text-white">
                             <i className="ri-settings-5-line"></i>
                         </Button></td>
                       
                      </tr>
                       
                    
                    )
                    :personelList && personelList.length == 0 ? "Yükleniyor" : ""
                    } 

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
    </>
  )
}

export default SearchModalYetkili;