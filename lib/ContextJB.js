import * as React from 'react';

const LoadingContext = React.createContext();

const LoadingProvider = ({children}) => {
    const [loading, setLoading] = React.useState(false);

    return (
        <LoadingContext.Provider
            value={{loading, setLoading}}
        >
            {children}
        </LoadingContext.Provider>
    );
}

const StateContext = React.createContext();

const StateProvider = ({children}) => {
    const [playing, setPlaying] = React.useState(null);

    return (
        <StateContext.Provider
            value={{playing, setPlaying}}
        >
            {children}
        </StateContext.Provider>
    );
}

export {
    LoadingContext, 
    LoadingProvider, 
    StateContext, 
    StateProvider
};