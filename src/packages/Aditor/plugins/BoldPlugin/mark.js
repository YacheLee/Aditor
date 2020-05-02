const mark = {
    strong: {
        parseDOM: [
            {tag: "strong"},
            {tag: "b", getAttrs: function (node) { return node.style.fontWeight !== "normal" && null; }},
            {style: "font-weight", getAttrs: function (value) { return /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null; }}
        ],
        toDOM: function toDOM() { return ["b", 0] }
    },
};

export default mark;
