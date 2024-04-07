import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './app/store'
import {Provider} from 'react-redux'
import {fetchPosts} from "./app/Post/PostSlice";

store.dispatch(fetchPosts())

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);