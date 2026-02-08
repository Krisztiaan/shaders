<script lang="ts">
  import type { Component } from 'svelte';
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import ShaderDemoPage from '../_demo/pages/ShaderDemoPage.svelte';
  import { getDemoEntry } from '../_demo/registry.js';

  let slug = $derived(page.params.slug ?? '');
  let entry = $derived(getDemoEntry(slug));
  let title = $derived(entry ? `${entry.title} – Paper Shaders (Svelte)` : 'Not found – Paper Shaders (Svelte)');
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{#key slug}
  {#if entry}
    {#if entry.kind === 'shader'}
      <ShaderDemoPage {...entry} />
    {:else}
      {@const Demo = entry.Component as Component<any>}
      <Demo />
    {/if}
  {:else}
    <div class="container">
      <p>Not found.</p>
      <a class="link" href={resolve('/')}>Go home</a>
    </div>
  {/if}
{/key}

<style>
  .container {
    margin: 0 auto;
    box-sizing: content-box;
    max-width: var(--max-w);
    padding: 32px var(--page-x) 96px;
  }
</style>
