import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


export const BackButton = () => {
  const history = useHistory();
  return (
    <Row className="justify-content-md-center">
        <Col md="auto">
         <Button
              
              variant="warning"
              onClick={() => {
                history.goBack();
              }}
            >
              Go Back
            </Button>
          </Col>
        </Row>
  );
}



// function FunctionButton({function}) {
//   return (
//     <Row className="justify-content-md-center">
//       <Col md="auto">
//       <Button
          
//           variant="warning"
//           onClick={function}
//         >
//           Go Back
//         </Button>
//       </Col>
//     </Row>
//   )
// }

// export default FunctionButton