const mark =  {
    em: {
        parseDOM: [{tag: "i"}, {tag: "em"}, {style: "font-style=italic"}],
        toDOM: function toDOM() { return ["em", 0] }
    }
};

export default mark;
