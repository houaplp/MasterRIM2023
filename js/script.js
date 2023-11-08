// pour commencer à travailler etc...
window.onload = init;
let ctx; // global audio context

function init() {
    // called when the page is displayed
    // i.e. 
    console.log("DOM is ready");
    //get the audio context
    ctx = new AudioContext ();

    createAudioNodes();
    buildAudioGraph();

    defineListeners();
}

function defineListeners(){
    const startButton = document.querySelector("#startButton");
    const stopButton = document.querySelector("#stopButton");

    startButton.onclick = ()  =>{
        start();
    }    
    stopButton.onclick = ()  =>{
        stop();
    }
    const frequencySlider = document.querySelector("#freqSlider");
    frequencySlider.oninput = (event) =>{
        osc.frequency.value = frequencySlider.value;
        let span = document.querySelector("#spanFreq")
        span.innerHTML = frequencySlider.value;    
    }

    const volSlider = document.querySelector("#volSlider");
    volSlider.oninput = (event) =>{
        gainNode.gain.value = volSlider.value;
    }
    const panSlider = document.querySelector("#panSlider");
    panSlider.oninput = (event) =>{
        PannerNode.pan.value = panSlider.value;
    }
}

function  createAudioNodes(){
    // create oscillator
    osc = ctx.createOscillator();
    // make it a sin wave
    osc.type = "sine"; // sawtooth
    osc.frequency.value = 440;
    // create a gain note
    gainNode = ctx.createGain();
    gainNode.gain.value = 0.5;
    // panner
    pannerNode = ctx.createStereoPanner();
    // goes from -1 left to 1 right
    pannerNode.pan.value = 0 ;

}

function buildAudioGraph() {
    // create the audiograph    
    // I.E. connect the noddes together
    // first connnect the oscillator to the gain node
    osc.connect(gainNode);
    gainNode.connect(pannerNode);
    pannerNode.connect(ctx.destination);
    // we could have written this in one line
    //osc.connect(gainNode).connect(pannerNode).connect (ctx…)

}

function createOscillator(){
// create oscillator
osc = ctx.createOscillator();
// make it a sin wave
osc.type = "sine"; // sawtooth
osc.frequency.value = 440;

}


function start(){
    // rebuilt the oscillatior
    createOscillator();
    osc.connect(gainNode);
    // rebuilt the graph
    osc.start();
}

function stop() {
    // stop the oscillator
    osc.stop();
}
