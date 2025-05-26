<script lang="ts">
    // this project is based on this codelab:
    // https://codelabs.developers.google.com/codelabs/tensorflowjs-object-detection/#0
</script>

<svelte:head>
    <title>TensorFlow Playground - Smart Cam</title>

    <!-- Import TensorFlow.js library -->
    <script
        src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"
        type="text/javascript"
    ></script>

    <!-- Import the COCO-SSD model -->
    <script
        src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"
        type="text/javascript"
    ></script>
</svelte:head>

<p>Wait for the model to load before clicking the button to enable the webcam - at which point it will become visible to use.</p>
    
<section id="demos" class="invisible">
    <p>Hold some objects up close to your webcam to get a real-time classification! When ready click "enable webcam" below and accept access to the webcam when the browser asks (check the top left of your window)</p>
    
    <div id="live-view" class="cam-view">
        <button id="webcam-button">
            Enable Webcam
        </button>
        
        <video
            autoplay
            muted
            id="webcam"
            width="640"
            height="480"
        ></video>
    </div>
</section>