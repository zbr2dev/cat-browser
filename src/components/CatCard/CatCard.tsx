import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.scss';

interface ICard {
  singleCatBreed: any
  getSingleCat: (props: any) => void
}

const CatCard = ({singleCatBreed, getSingleCat}: ICard) => {

  return (
    <div className="card-component">
      {
        singleCatBreed.map( (i: any, index: number) => (
          <Card key={index} className="card-component__item text-center">
            {i.image !== undefined && <Card.Img variant="top" src={i.image.url} />}
            <Card.Body>
              <Link to="/single-cat-page">
                <Button
                  onClick={() => getSingleCat(i)}
                  className="card-component__button"
                  variant="primary">
                  View details
                </Button>
              </Link>
            </Card.Body>
          </Card>
        ))
      }
    </div>
  )
}

export default CatCard;