import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from "axios";
import { connect } from 'react-redux';
import CatCard from "../../components/CatCard/CatCard";
import InputBox from '../../components/InputBox/InputBox';
import { getCatBreed, setError, setLoader } from '../../store/actions';
import { ICat, IStateHomePage } from '../../shared/interface';

import './styles.scss';

interface IHomePage {
    singleCatBreed: any
    getSingleCat: (props: ICat) => void
    allCats: any[]
    loader: boolean
    getCatBreed: (props: any) => void
    getAllCats: () => void
    setLoader: (props: boolean) => void
}

const HomePage = ({singleCatBreed, getSingleCat, loader, getAllCats, setLoader, allCats, getCatBreed}: IHomePage) => {

    useEffect(() => {
        if(!allCats.length) getAllCats()
    }, [])

  const getSingleBreed = async (name: string) => {
      try {
          setLoader(true);
          const response = await axios({
              method: 'get',
              url: `https://api.thecatapi.com/v1/breeds`,
              headers: {
                  'x-api-key': '1490f8d2-ecf5-4850-8fcd-5ddd5495be5f'
              },
              params: {
                  q: name
              }
          });
          let singleBreed: any[] = [];
          // eslint-disable-next-line array-callback-return
          response.data.map( (breed: any) => {
              if (breed.name === name) {
                  const {
                      name, description, temperament, image, origin
                  } = breed;
                  const data = {
                      name,
                      description,
                      temperament,
                      origin,
                      image
                  }
                  singleBreed.push(data)
              }
          })
          getCatBreed(singleBreed)
          setLoader(false);
      }
      catch {
          setError(true)
      }
    }

  return(
    <div className="home-page">
        <h1>Cat Browser</h1>
        <InputBox list={allCats} getCatBreed={getSingleBreed} />
      {!singleCatBreed
        ? <>
          <h3>No cats available</h3>
          <Button className="home-page__button" variant="success" size="sm" disabled>Load more</Button>
          </>
        : <>
          <CatCard getSingleCat={getSingleCat} singleCatBreed={singleCatBreed} />
          {!loader
            ?  <Button variant="success" size="sm">Load more</Button>
            :  <Button variant="success" size="sm" disabled>Loading cats...</Button>
          }
          </>
      }
    </div>
  )
}

const mapStateToProps = (state: IStateHomePage) => ({
    allCats: state.cat.cats,
    loader: state.cat.loader,
    error: state.cat.error
})

const mapDispatchToProps = {
    getCatBreed,
    setLoader
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);