<script>
  import { Marked } from "marked";
  /** @type {string} */
  export let value;
  /** @type {boolean} */
  export let readonly = false;
  /** @type {import("./index").Plugin[]} */
  export let plugins = [];
  /** @type {import("marked").MarkedExtension[]} */
  const exts = plugins.reduce((a, v) => {
    a.push(v.extension);
    return a;
  }, []);
  const marked = new Marked(...exts);
</script>

<div class="bitmd">
  {#if !readonly}
    <textarea bind:value />
  {/if}
  <article>
    {@html marked.parse(value)}
  </article>
</div>

<style>
  .bitmd,
  textarea,
  article {
    width: 100%;
    height: 100%;
  }
  .bitmd {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  textarea {
    box-sizing: border-box;
    padding: 0.5rem;
    font-size: 1rem;
  }
</style>
