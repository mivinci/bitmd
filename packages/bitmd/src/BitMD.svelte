<script>
  import "./index.css";
  import { Marked } from "marked";
  import { wordcount } from "./lib";
  import { builtin_plugins } from "./builtin";
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
    if (p.listener) tools.push(p);
  }
  const marked = new Marked(...exts);

  /** @type {HTMLTextAreaElement} */
  let textarea;
  function __click(i) {
    value = tools[i].listener({
      textarea,
      value,
    }).value;
  }
</script>

<div class="bitmd">
  <header>
    <nav>
      {#each tools as { title, icon }, i}
        <button {title} type="button" on:click={() => __click(i)}>
          {@html icon}
        </button>
      {/each}
    </nav>
    <aside></aside>
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
    <div>Words: <strong>{wordcount(value)}</strong></div>
  </footer>
</div>

