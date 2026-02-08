<script lang="ts">
  import CopyButton from './_demo/components/CopyButton.svelte';
  import Logo from './_demo/components/Logo.svelte';
  import ShaderItem from './_demo/components/ShaderItem.svelte';
  import GithubIcon from './_demo/icons/GithubIcon.svelte';
  import { homeThumbnails } from './_demo/home-thumbnails.js';

  const install = 'npm i @paper-design/shaders-svelte';
</script>

<svelte:head>
  <title>Paper Shaders – Svelte</title>
  <meta name="description" content="Ultra-fast zero-dependency shaders for Svelte." />
</svelte:head>

<div class="container">
  <div class="top">
    <div class="top-header">
      <a class="paper" href="https://paper.design/" target="_blank" rel="noreferrer">
        <Logo />
      </a>

      <a class="github" href="https://github.com/paper-design/shaders" target="_blank" rel="noreferrer" aria-label="GitHub">
        <GithubIcon class="icon" />
      </a>
    </div>

    <div class="hero">
      <h1 style="font-feature-settings: 'ss01'; word-spacing: 0.1em">Paper Shaders</h1>
      <p>ultra fast zero-dependency shaders for your designs</p>
    </div>

    <div class="install">
      <div class="install-code no-scrollbar">
        <span>{install}</span>
      </div>
      <div class="install-divider" aria-hidden="true"></div>
      <CopyButton class="install-copy" text={install} aria-label="Copy install command" />
    </div>
  </div>

  <main class="sections">
    {#each homeThumbnails as category (category.name)}
      <section class="section">
        <h2>{category.name}</h2>
        <div class="grid">
          {#each category.shaders as shader (shader.url)}
            <ShaderItem {...shader} />
          {/each}
        </div>
      </section>
    {/each}
  </main>
</div>

<style>
  .container {
    margin: 0 auto;
    box-sizing: content-box;
    max-width: var(--max-w);
    padding: 0 var(--page-x);
  }

  .top {
    padding: 20px 0 64px;
  }

  .top-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 64px;
  }

  .paper {
    margin-left: -6px;
    padding: 0 6px;
    outline: 0;
    outline-offset: 2px;
  }

  .paper:focus-visible {
    outline: 2px solid var(--color-focus);
    border-radius: 6px;
  }

  .github {
    display: none;
    outline: 0;
    outline-offset: 4px;
  }

  .github:focus-visible {
    outline: 2px solid var(--color-focus);
    border-radius: 999px;
  }

  :global(.icon) {
    width: 28px;
    height: 28px;
  }

  @media (min-width: 28rem) {
    .github {
      display: flex;
    }
  }

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin: 0 auto 8px;
    text-align: center;
  }

  h1 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 300;
    text-transform: lowercase;
  }

  @media (min-width: 28rem) {
    h1 {
      font-size: 2.25rem;
    }
  }

  .hero p {
    margin: 0;
    max-width: 512px;
    font-size: 1.125rem;
    color: color-mix(in oklab, currentcolor 70%, transparent);
  }

  .install {
    display: flex;
    height: 48px;
    max-width: 100%;
    width: fit-content;
    margin: 20px auto 0;
    align-items: center;
    border-radius: 10px;
    border: 1px solid color-mix(in oklab, currentcolor 20%, transparent);
    background: #ffffff;
    font-family: var(--font-mono);
    font-size: 14px;
    overflow: hidden;
  }

  @media (prefers-color-scheme: dark) {
    .install {
      background: #111111;
    }
  }

  .install-code {
    height: 100%;
    display: flex;
    align-items: center;
    overflow-x: auto;
    overscroll-behavior-y: none;
    padding: 0 16px;
    white-space: nowrap;
  }

  .install-divider {
    height: 100%;
    width: 1px;
    background: color-mix(in oklab, currentcolor 20%, transparent);
    flex: 0 0 auto;
  }

  :global(.install-copy) {
    display: none;
    height: 100%;
    width: 48px;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
    outline: 0;
  }

  :global(.install-copy:focus-visible) {
    outline: 2px solid var(--color-focus);
    outline-offset: -2px;
  }

  @media (min-width: 28rem) {
    :global(.install-copy) {
      display: flex;
    }
  }

  .sections {
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding-bottom: 128px;
  }

  h2 {
    margin: 0 0 24px;
    font-size: 1.5rem;
    font-weight: 300;
    text-transform: lowercase;
  }

  @media (min-width: 40rem) {
    h2 {
      margin-bottom: 32px;
      font-size: 1.75rem;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 32px;
    font-size: 1.125rem;
  }

  @media (min-width: 28rem) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 64rem) {
    .grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (min-width: 85rem) {
    .grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
</style>
