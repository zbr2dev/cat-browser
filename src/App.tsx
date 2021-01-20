import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadAllCats, getCatBreed, getSingleCat } from './store/actions';
import HomePage from './pages/HomePage/HomePage';
import CatPage from './pages/SingleCatPage/CatPage';
import InputBox from './components/InputBox/InputBox';
import './App.scss';

interface IApp {
  allCats: any[]
  loadAllCats: (props: any) => void
  singleCatBreed: any
  getCatBreed: (props: any) => void
  singleCat: any
  getSingleCat: (props: any) => void
}

const App = ({allCats, loadAllCats, singleCatBreed, getCatBreed, singleCat, getSingleCat}: IApp) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)

  const getSingleBreed = (name: string) => {
    setLoading(true)
    axios({
      method: 'get',
      url: `https://api.thecatapi.com/v1/breeds`,
      headers: {
        'x-api-key': '1490f8d2-ecf5-4850-8fcd-5ddd5495be5f'
      },
      params: {
        q: name
      }
      })
      .then(res => {
        let singleBreed: any[] = [];
        setLoading(false);
        // eslint-disable-next-line array-callback-return
        res.data.map( (breed: any) => {
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
        })
      .catch(error => setError(true))
  }

  useEffect(() => {
    setLoading(true);
      axios({
        method: 'get',
        url: 'https://api.thecatapi.com/v1/breeds',
        headers: {
          'x-api-key': '1490f8d2-ecf5-4850-8fcd-5ddd5495be5f'
        }
        })
        .then(res => {
          setLoading(false);
          loadAllCats(res.data);
        })
       .catch(error => setError(true))
  }, [])

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
            <h1>Cat Browser</h1>
            <InputBox list={allCats} getCatBreed={getSingleBreed} />
            <HomePage
              loading={loading}
              getSingleCat={getSingleCat}
              singleCatBreed={singleCatBreed}
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

const mapStateToProps = (state: any) => ({
  allCats: state.cat.cats,
  singleCatBreed: state.cat.singleBreed,
  singleCat: state.cat.singleCat
})

const mapDispatchToProps = {
  loadAllCats,
  getCatBreed,
  getSingleCat
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
