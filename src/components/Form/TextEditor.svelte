<script>
  export let incomingValue;
  export let value;
  let editor;

  let toolbarOptions = [
    [{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "ordered" }],
    [{ align: [] }],
    ["clean"],
  ];

  setTimeout(async () => {
    let quill = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions,
        imageResize: {},
      },
      theme: "snow",
      placeholder: "Write your story...",
    });

    // quill.on("text-change", function (delta, oldDelta, source) {
    //   value = document.getElementsByClassName("ql-editor")[0].innerHTML;
    // });
    document.querySelector(".ql-editor").innerHTML = incomingValue;
  }, 400);
</script>

<div
  class="editor"
  style="min-height: 30rem;"
  bind:this={editor}
  on:text-change={(e) => (value = e.detail.html)}
/>
