import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wrapper } from '../store/store';
import { fetchCharacters } from '../store/actions';

import MainView from '../components/MainView/MainView';


const HomePage = () => {
  const dispatchAction = useDispatch();

  //fetch first data portion and save it in Redux state on homepage component render at client side
  useEffect(() => {
    dispatchAction(fetchCharacters())
  }, []);
  return(
    <div className="container">
      <MainView />
    </div>
  );
};

//Get static props at server side to set app state for search engine bots - SEO purpose
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  await store.dispatch(fetchCharacters());
});

export default HomePage;