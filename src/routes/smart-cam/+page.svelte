<script lang="ts">
    // this project is based on this codelab:
    // https://codelabs.developers.google.com/codelabs/tensorflowjs-object-detection/#0

	import Button from "$lib/components/Button.svelte";
	import { onMount } from "svelte";

    let live_view: HTMLDivElement;
    let video: HTMLVideoElement;

    let user_media_supported = $state(false);
    let webcam_enabled = $state(false);
    let model: any = $state(null);
    let children: HTMLParagraphElement[] = $state([]);

    onMount(async () => {
        user_media_supported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        
        window.cocoSsd.load()
            .then(loaded_model => {
                model = loaded_model;
            });
    });

    const enable_webcam = async () => {
        // Only continue if the COCO-SSD has finished loading.
        if (!model) {
            return;
        }

        webcam_enabled = true;
    
        const constraints = {
            video: true
        };

        // Activate the webcam stream
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        video.addEventListener('loadeddata', predict_webcam);
        
        // TODO: add error and exception handling
    }

    const predict_webcam = async () => {
        const predictions = await model.detect(video);

        // Remove any highlighting we did previous frame.
        for (let i = 0; i < children.length; i++) {
            live_view.removeChild(children[i]);
        }
        children.splice(0);
        
        // Now lets loop through predictions and draw them to the live view if
        // they have a high confidence score.
        for (let n = 0; n < predictions.length; n++) {
            // If we are over 66% sure we are sure we classified it right, draw it!
            if (predictions[n].score > 0.66) {
                const p = document.createElement('p');
                p.innerText = `${predictions[n].class} - with ${Math.round(parseFloat(predictions[n].score) * 100)}% confidence.`;
                p.style = `margin-left: ${predictions[n].bbox[0]}px; margin-top: ${predictions[n].bbox[1] - 10}px; width: ${predictions[n].bbox[2] - 10}px; top: 0; left: 0;`;

                const highlighter = document.createElement('div');
                highlighter.setAttribute('class', 'highlighter');
                highlighter.style = `left: ${predictions[n].bbox[0]}px; top: ${predictions[n].bbox[1]}px; width: ${predictions[n].bbox[2]}px; height: ${predictions[n].bbox[3]}px;`;

                live_view.appendChild(highlighter);
                live_view.appendChild(p);
                children.push(highlighter);
                children.push(p);
            }
        }
        
        // Call this function again to keep predicting when the browser is ready.
        window.requestAnimationFrame(predict_webcam);
    }
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

    <style>
        .cam-view p {
            position: absolute;
            padding: 5px;
            background-color: rgba(255, 111, 0, 0.85);
            color: #FFF;
            border: 1px dashed rgba(255, 255, 255, 0.7);
            z-index: 2;
            font-size: 12px;
        }

        .highlighter {
            background: rgba(0, 255, 0, 0.25);
            border: 1px dashed #fff;
            z-index: 1;
            position: absolute;
        }
    </style>
</svelte:head>

<p>Wait for the model to load before clicking the button to enable the webcam - at which point it will become visible to use.</p>
    
<section id="demos" class="invisible">
    <p>Hold some objects up close to your webcam to get a real-time classification! When ready click "enable webcam" below and accept access to the webcam when the browser asks (check the top left of your window)</p>
    
    <div
        id="live-view"
        class="cam-view"
        bind:this={live_view}
    >
        {#if !webcam_enabled}
            <Button
                id="webcam-button"
                onclick={enable_webcam}
                disabled={!user_media_supported}
            >
                Enable Webcam
            </Button>
        {/if}
        
        <video
            autoplay
            muted
            bind:this={video}
            id="webcam"
            width="640"
            height="480"
        ></video>
    </div>
</section>

<style>
    .cam-view {
        position: relative;
    }
</style>