import * as React from 'react';
import TrackPlayer from 'react-native-track-player';
import { getData } from './AsyncStorageCRUD';

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

const RepeatModeContext = React.createContext();

const RepeatModeProvider = ({children}) => {
    const [repeatMode, setRepeatMode] = React.useState(0);

    return (
        <RepeatModeContext.Provider
            value={{repeatMode, setRepeatMode}}
        >
            {children}
        </RepeatModeContext.Provider>
    );
}

const CurrentQueueContext = React.createContext();

const CurrentQueueProvider = ({children}) => {
    const [currentQueue, setCurrentQueue] = React.useState([]);

    return (
        <CurrentQueueContext.Provider
            value={{
                currentQueue, 
                setCurrentQueue,
            }}
        >
            {children}
        </CurrentQueueContext.Provider>
    );
}

const CurrentIndexContext = React.createContext();

const CurrentIndexProvider = ({children}) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    return (
        <CurrentIndexContext.Provider
            value={{
                currentIndex, 
                setCurrentIndex,
            }}
        >
            {children}
        </CurrentIndexContext.Provider>
    );
}

export {
    LoadingContext, 
    LoadingProvider, 
    StateContext, 
    StateProvider,
    RepeatModeContext,
    RepeatModeProvider,
    CurrentQueueContext,
    CurrentQueueProvider,
    CurrentIndexContext,
    CurrentIndexProvider,
};