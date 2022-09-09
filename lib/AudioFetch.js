import ytdl from 'react-native-ytdl';

export const AudioFetch = async (videoID) => {
	try {
		let info = await ytdl.getInfo(videoID);
	
		const url = info.formats[19].url;
		
		//let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
	
		//console.log('Formats with only audio: ' + audioFormats);
		
		return url;
	
	} catch (err) {
		console.error(err);
	}
}
