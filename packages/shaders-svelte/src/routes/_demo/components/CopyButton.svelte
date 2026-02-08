<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import CheckIcon from '../icons/CheckIcon.svelte';
  import CopyIcon from '../icons/CopyIcon.svelte';

  let {
    text,
    timeoutMs = 1200,
    class: className = '',
    onclick,
    children,
    ...rest
  } = $props<{
    text: string;
    timeoutMs?: number;
    class?: string;
    children?: Snippet;
  } & HTMLButtonAttributes>();

  let copied = $state(false);
  let timeout: ReturnType<typeof setTimeout> | undefined;

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => (copied = false), timeoutMs);
    } catch {
      copied = false;
    }
  }

  async function handleClick(event: MouseEvent) {
    await copy();
    onclick?.(event);
  }
</script>

<button type="button" class={className} onclick={handleClick} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    {#if copied}
      <CheckIcon aria-hidden="true" />
    {:else}
      <CopyIcon aria-hidden="true" />
    {/if}
  {/if}
</button>
