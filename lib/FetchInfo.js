import * as React from 'react';
import ytsr, { getFilters } from 'react-native-ytsr';
import { LoadingContext } from './ContextJB';
import { AudioFetch } from './AudioFetch';

const format = (ts) => {
	try {

		// split string based on separator(:)
		// & parse to Integer

		const arr = ts.split(":").map(e=>parseInt(e));

		if (arr.length == 2) {
			return arr[0]*60 + arr[1];
		}

		else if (arr.length == 3) {
			return arr[0]*3600 + arr[1]*60 + arr[2];
		}

		else {
			return 0;
		}

	 } catch (e) {
		console.error(e.message);
	 }
}

const FetchInfo = (val) => {
    const [data, setData] = React.useState([]);
    const {loading, setLoading} = React.useContext(LoadingContext);

    React.useEffect(()=>{
        setLoading(true);
        search(val);

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
       
        const options = {pages: 3, gl: 'US'};
        let request = await ytsr(filter1.url, options);
        let arr = request.items;
        //setData(arr);
        let list = [];

        arr.forEach((element) => {
            
            const metadata = {
                title: '',
                duration: '',
                artwork: '',
                artist: '',
                id: '',
                url: ''
            };

            metadata.title = element.title;
            metadata.duration = element.duration;
            metadata.artwork = element.bestThumbnail.url;
            metadata.artist = element.author.name;
            metadata.id = element.id;

            if (metadata.duration && format(metadata.duration) <= 3600) {
                AudioFetch(metadata.id).then((data) => {

                    metadata.url = data;
                    //console.log(data);
                })
                list.push(metadata);
            }
        });

        setData(list);

        setTimeout(()=>{
            setLoading(false)
        },3000)
        //setLoading(false);

        return list;
        
    }

    return data;    
}

export default FetchInfo;