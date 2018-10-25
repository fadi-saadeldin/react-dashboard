import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Landing from '../src/components/layout/Landing';
import Navbar from '../src/components/layout/Navbar';
import Footer from '../src/components/layout/Footer';
function App() {
    return (
        <Provider store={store}>
            <div className="app">
                <Navbar />
                <Landing />
                <Footer />
            </div>
        </Provider>
    );
}

export default App;
