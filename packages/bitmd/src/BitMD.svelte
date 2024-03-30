<script>
  import "./index.css";
  import { Marked } from "marked";
  import { wordcount } from "./lib";
  import { builtin_plugins } from "./builtin";
  import { onMount } from "svelte";
  /** @type {string} */
  export let value;
  /** @type {boolean} */
  export let readonly = false;
  /** @type {import("./types").Plugin[]} */
  export let plugins = [];

  plugins = [...builtin_plugins, ...plugins];

  /** @type {import("marked").MarkedExtension[]} */
  const exts = [];
  /** @type {import("./types").Plugin[]} */
  const tools = [];
  for (const p of plugins) {
    if (p.extension) exts.push(p.extension);
    if (p.onclick) tools.push(p);
  }
  const marked = new Marked(...exts);

  /** @type {HTMLTextAreaElement} */
  let textarea;
  /**
   * @param {MouseEvent} e
   * @param {number} i
   */
  async function __click(e, i) {
    const res = await tools[i].onclick({
      ...e,
      textarea,
    });
    if (res && res.value) {
      value = res.value;
    }
  }

  onMount(async () => {
    plugins.forEach(async (p) => {
      if (p.onmounted) {
        await p.onmounted({ textarea });
      }
    });
  });
</script>

<div class="bitmd">
  <header>
    {#if !readonly}
      {#each ["left", "right"] as pos}
        <nav>
          {#each tools as { title, icon, position }, i}
            {#if position === pos}
              <button {title} type="button" on:click={(e) => __click(e, i)}>
                {@html icon}
              </button>
            {/if}
          {/each}
        </nav>
      {/each}
    {/if}
  </header>
  <main>
    {#if !readonly}
      <textarea bind:this={textarea} bind:value />
    {/if}
    <article>
      {@html marked.parse(value)}
    </article>
  </main>
  <footer>
    {#if !readonly}
      <div>Words: <strong>{wordcount(value)}</strong></div>
    {/if}
  </footer>
</div>
