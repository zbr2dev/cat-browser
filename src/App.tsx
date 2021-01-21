import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadAllCats, getSingleCat, setError, setLoader } from './store/actions';
import HomePage from './pages/HomePage/HomePage';
import CatPage from './pages/SingleCatPage/CatPage';
import { IStateHomePage, ICat } from './shared/interface';
import './App.scss';

interface IApp {
  loadAllCats: (props: ICat[]) => void
  singleCatBreed: null | ICat[]
  singleCat: ICat
  getSingleCat: (props: ICat) => void
  error: boolean
  setError: (props: boolean) => void
  setLoader: (props: boolean) => void
}

const App = ({loadAllCats, singleCatBreed, singleCat, getSingleCat, error, setError, setLoader}: IApp) => {

  const getAllCats = async () => {
    try {
      setLoader(true);
      const response = await axios({
        method: 'get',
        url: 'https://api.thecatapi.com/v1/breeds',
        headers: {
          'x-api-key': '1490f8d2-ecf5-4850-8fcd-5ddd5495be5f'
        }
      })
      let cat: ICat[] = []
        response.data.map( (i: any) => {
          let data: ICat = {
            id: i.id,
            name: i.name,
            description: i.description,
            origin: i.origin,
            temperament: i.temperament,
            image: i.image
          }
        cat.push(data)
       })
      setLoader(false);
       loadAllCats(cat);
    }
    catch {
      setError(true)
    }
  }

  const ErrorAlert = () => {
    return (
      <Alert variant="info">
        Apologies but we could not load new cats for you at this time! Miau!
      </Alert>
    )
  }

  return (
    <Router>
      <div className="app">
          {error && <ErrorAlert /> }
        <Switch>
          <Route exact path="/">
            <HomePage
              getSingleCat={getSingleCat}
              singleCatBreed={singleCatBreed}
              getAllCats={getAllCats}
            />
          </Route>
          <Route path="/single-cat-page">
            <CatPage cat={singleCat} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state: IStateHomePage) => ({
  singleCatBreed: state.cat.singleBreed,
  singleCat: state.cat.singleCat,
  error: state.cat.error
})

const mapDispatchToProps = {
  loadAllCats,
  getSingleCat,
  setError,
  setLoader
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
