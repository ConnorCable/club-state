function stereoToMono(base64StereoData: string) {
    // Decode the base64 stereo audio data
    const stereoData = atob(base64StereoData);
    
    // Convert the stereo data to an array of 16-bit integers
    const stereoArray = new Int16Array(stereoData.length / 2);
    for (let i = 0; i < stereoData.length; i += 2) {
      const sample = (stereoData.charCodeAt(i) << 8) | stereoData.charCodeAt(i + 1);
      stereoArray[i / 2] = sample;
    }
    
    // Separate the stereo data into left and right channels
    const leftChannel = [];
    const rightChannel: number[] = [];
    for (let i = 0; i < stereoArray.length; i += 2) {
      leftChannel.push(stereoArray[i]);
      rightChannel.push(stereoArray[i + 1]);
    }
    
    // Average the left and right channels to create mono audio data
    const monoChannel = leftChannel.map((sample, index) => Math.round((sample + rightChannel[index]) / 2));
    
    // Convert the mono audio data back to a base64 string
    let monoData = '';
    for (let i = 0; i < monoChannel.length; i++) {
      const sample = monoChannel[i];
      monoData += String.fromCharCode((sample >> 8) & 0xFF);
      monoData += String.fromCharCode(sample & 0xFF);
    }
    
    // Encode the mono data as base64
    const base64MonoData = btoa(monoData);
    
    return base64MonoData;
  }
