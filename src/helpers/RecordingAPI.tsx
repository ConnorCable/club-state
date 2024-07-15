import saveAs from "file-saver";
import { ShazamResponse } from "../models/ShazamResponse";


const detectSong = async(song : any) => {
    const url = 'https://shazam.p.rapidapi.com/songs/detect';
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'content-type': 'text/plain',
            'X-RapidAPI-Key': 'REDACTED',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        },
        body: song
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result)
        return result
    } catch (error) {
        console.error(error);
    }
}





const songDetect2 = async (base64AudioString: any) => {
    console.log(`SONG DETECT 2ING`)
    const url = 'https://shazam-api7.p.rapidapi.com/songs/recognize-song';
    const byteCharacters = atob(base64AudioString);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'audio/mp3' });

    // Create a File object
    const audioFile = new File([blob], 'audio.mp3', { type: 'audio/mp3' });
    const data = new FormData();
    data.append('audio', audioFile);
    const options = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': '9b43f9dee7mshed42103ce449cc6p14c994jsnbf0e20ccd8c5',
            'X-RapidAPI-Host': 'shazam-api7.p.rapidapi.com'
        },
        body: data
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const resultJSON = JSON.parse(result);
        const track = resultJSON.track;

        const title = track.title;
        const subTitle = track.subtitle;
        const genre = track.genres['primary'];
        const imageUrl = track.images['coverart'];

        
        const shazamResponse: ShazamResponse =
        {
            genre: genre,
            title: title,
            subTitle: subTitle,
            imageUrl: imageUrl,
        }
        
        return shazamResponse;
        
    } catch (error) {
        console.error(error);
    }
}

export default songDetect2

