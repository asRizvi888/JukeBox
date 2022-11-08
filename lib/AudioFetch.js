import ytdl from 'react-native-ytdl';

const _filterHighestQualityAudio = (formats) => {
    let audioFormats = ytdl.filterFormats(formats, 'audioonly');

    let highestFormat = audioFormats[0];
    audioFormats.map(item => {
        if (highestFormat.audioBitrate < item.audioBitrate) highestFormat = item;
    });
    const highestQualityAudio = highestFormat.url;

    return highestQualityAudio;
};

export const AudioFetch = async (videoID) => {
	try {
		let info = await ytdl.getInfo(videoID);
	
		//let url = await info.formats[19].url;
		let url = _filterHighestQualityAudio(info.formats);
		
		return url;
	
	} catch (err) {
		console.error(err.message);

		return undefined;
	}
}
