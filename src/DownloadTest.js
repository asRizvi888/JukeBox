import * as React from 'react';
import RNFetchBlob from 'rn-fetch-blob';

const { fs, config } = RNFetchBlob;

/*
const DIR = fs.dirs.MusicDir + '/.jukebox';
const trackDIR = DIR + '/tracks/';
const thumbDIR = DIR + '/thumbnails/';
*/

//console.log(DIR);

// download track
const download = (url, dir, filename) => {
    return config ({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: false,
        path: dir + filename
      }
    }).fetch('GET', url)
}
  
export default download;