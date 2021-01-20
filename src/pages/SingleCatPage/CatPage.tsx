import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ICatPage {
    cat: any
}

const CatPage = ({cat}: ICatPage) => {
  return(
    <>
      {cat &&
        <Card>
          <Card.Header>
            <Link to="/">
              <Button variant="primary">Back</Button>
            </Link>
            </Card.Header>
              <Card.Body>
                <Card.Img variant="top" src={cat.image.url} />
                <Card.Title>
                  {cat.name}
                </Card.Title>
                <Card.Text>
                  <h5>Origin:{cat.origin}</h5>
                  <strong>{cat.temperament}</strong>
                  <p>{cat.description}</p>
                  </Card.Text>
              </Card.Body>
          </Card>
      }
    </>
  )
};

export default CatPage;