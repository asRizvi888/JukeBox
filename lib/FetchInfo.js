import * as React from 'react';
import ytsr from 'react-native-ytsr';
import { LoadingContext } from './ContextJB';
import { AudioFetch } from './AudioFetch';

const FetchInfo = (val) => {
    const [data, setData] = React.useState([]);
    const {setLoading} = React.useContext(LoadingContext);

    React.useEffect(()=>{
        setLoading(true);
        
        search(val);

        setData([]);
    },[]);

    const search = async (query) => {
        let result = await fetchData(query);
        return result;
    }

    const fetchData = async (val) => {

        let query = "latest" + val + "single track";
        //filter 
        let filters = await ytsr.getFilters(query);
        let filter1 = filters.get('Type').get('Video');
       
        //const options = {pages: 3};
        let request = await ytsr(filter1.url);
        let arr = request.items;
        //setData(arr);
        const list = [];

        arr.forEach((element) => {
            
            const metadata = {
                title: '',
                duration: '',
                imageURL: '',
                id: '',
                musicURL: ''
            };

            metadata.title = element.title;
            metadata.duration = element.duration;
            metadata.imageURL = element.bestThumbnail.url;
            metadata.chanelTitle = element.author.name;
            metadata.id = element.id;
            metadata.musicURL = AudioFetch(metadata.id);

            list.push(metadata);
        });
        setData(list);
        setLoading(false);
    }

    return data;    
}

export default FetchInfo;