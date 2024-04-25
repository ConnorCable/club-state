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





const songDetect2 = async (song: any) => {
    const url = 'https://shazam-api7.p.rapidapi.com/songs/recognize-song';
    const data = new FormData();
    data.append('audio', song);

    const options = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': 'REDACTED',
            'X-RapidAPI-Host': 'shazam-api7.p.rapidapi.com'
        },
        body: data
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export default songDetect2