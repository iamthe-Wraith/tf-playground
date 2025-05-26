<script lang="ts">
    import '../styles.css';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Link from '$lib/components/Link.svelte';
	import { page } from '$app/state';

    let {
        data,
        children
    }: {
        data: LayoutData;
        children: Snippet;
    } = $props();
</script>

<svelte:head>
    <title>BuzyBee</title>
    
    <meta name="description" content="TensorFlow Playground - a place to play with TensorFlow.js" />
</svelte:head>

<header>
    <div class="logo-container">
        <div class="logo">
            TensorFlow Playground
        </div>
    </div>
</header>

<div class="page-container">
    <nav>
        <Link
            href="/smart-cam"
            theme="primary-text"
        >
            Smart Cam
        </Link>
    </nav>
    
    <main>
        {@render children()}
    </main>
</div>

<footer>
    <p>
        &copy; {new Date().getFullYear()} TensorFlow Playground. All rights reserved.
    </p>
</footer>

<style>
    :global(html) {
        --header-height: 4rem;
        --footer-height: 4rem;
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100vw;
        height: var(--header-height);
        padding: 0.5rem 1rem;
    }
    
    .logo-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .logo {
        font-size: 1.5rem;
    }

    .page-container {
        display: grid;
        grid-template-columns: 12rem 1fr;
        width: 100vw;
        min-height: calc(100vh - var(--header-height) - var(--footer-height));

        nav {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 1rem;
            padding: 1rem;
            border-right: 1px solid var(--neutral-200);
        }

        main {
            padding: 1rem;
        }
    }
    
    footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100vw;
        height: var(--footer-height);
        padding: 0.5rem 1rem;
    }
</style>