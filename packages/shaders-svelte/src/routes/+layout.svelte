<script lang="ts">
  import '../app.css';
</script>

<div class="app">
  <div class="header-gradient" aria-hidden="true"></div>
  <slot />
</div>

<style>
  .app {
    position: relative;
    isolation: isolate;
    min-height: 100dvh;
    background: var(--color-background);
  }

  .header-gradient {
    position: absolute;
    inset: 0 0 auto 0;
    height: 800px;
    z-index: -1;
    background: linear-gradient(to bottom, var(--color-header), transparent);
  }
</style>

