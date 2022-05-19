import React, { useEffect } from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap'
import styles from './Responses.module.css'

function Responses(props) {

  useEffect(() => {
  }, [props])

  return (
    <div className='app-container-item'>
      <h1><b>Responses</b></h1>
      {props.loading && <Spinner animation="border" variant="primary" style={{ marginLeft: '49%' }} />}
      <div className={styles.cardContainer}>
        {props.responseList && props.responseList.slice().reverse().map((response, idx) =>
          <Card key={idx} style={{
            width: '100%',
            marginTop: '1em',
            padding: '0.5em 0.5em 0.5em 1em',
            background: '#eeeeee',
            border: '0',
          }}>
            <Row >
              <Col md={4}>
                <b>Engine:</b>
              </Col>
              <Col md={8}>
                {response.engine}
              </Col>
            </Row>
            <Row >
              <Col md={4}>
                <b>Prompt:</b>
              </Col>
              <Col md={8}>
                {response.prompt}
              </Col>
            </Row>
            <Row className='mt-3' >
              <Col md={4}>
                <b>Response:</b>
              </Col>
              <Col md={8}>
                {response.response}
              </Col>
            </Row>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Responses