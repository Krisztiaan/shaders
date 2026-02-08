<script lang="ts">
  import { resolve } from '$app/paths';
  import Logo from './Logo.svelte';
  import GithubIcon from '../icons/GithubIcon.svelte';

  let { showGithub = true } = $props<{
    showGithub?: boolean;
  }>();
</script>

<header class="header">
  <a class="home" href={resolve('/')} aria-label="Home">
    <Logo class="logo" />
    <span class="wordmark" style="font-feature-settings: 'ss02'">shaders</span>
  </a>

  {#if showGithub}
    <a class="github" href="https://github.com/paper-design/shaders" target="_blank" rel="noreferrer" aria-label="GitHub">
      <GithubIcon class="icon" />
    </a>
  {/if}
</header>

<style>
  .header {
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
  }

  .home {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: -6px;
    padding: 0 6px;
    text-decoration: none;
    font-size: 20px;
    text-transform: lowercase;
    outline: 0;
    outline-offset: 2px;
    user-select: none;
  }

  .home:focus-visible {
    outline: 2px solid var(--color-focus);
    border-radius: 6px;
  }

  :global(.logo) {
    height: 40px;
    width: auto;
  }

  .wordmark {
    letter-spacing: -0.01em;
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
</style>
