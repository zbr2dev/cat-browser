import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { ICat } from '../../shared/interface';

import './styles.scss';

interface ICatPage {
    cat: ICat
}

const CatPage = ({cat}: ICatPage) => {
  return(
    <>
      { cat === null && <Redirect to="/" /> }
      {cat &&
        <Card className="cat-page">
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
                <Card.Text className="cat-page__description">
                  <strong>Origin:{cat.origin}</strong>
                  <strong>{cat.temperament}</strong>
                  <span>{cat.description}</span>
                  </Card.Text>
              </Card.Body>
          </Card>
      }
    </>
  )
};

export default CatPage;