import React from 'react';
import { Button } from 'react-bootstrap';
import CatCard from "../../components/CatCard/CatCard";

import './styles.scss';

interface IHomePage {
    singleCatBreed: any
    getSingleCat: (props: any) => void
    loading: boolean
}

const HomePage = ({singleCatBreed, getSingleCat, loading}: IHomePage) => {

  return(
    <div className="home-page">
      {!singleCatBreed
        ? <>
          <h3>No cats available</h3>
          <Button className="home-page__button" variant="success" size="sm" disabled>Load more</Button>
          </>
        : <>
          <CatCard getSingleCat={getSingleCat} singleCatBreed={singleCatBreed} />
          {!loading
            ?  <Button variant="success" size="sm">Load more</Button>
            :  <Button variant="success" size="sm" disabled>Loading cats...</Button>
          }
          </>
      }
    </div>
  )
}

export default HomePage;