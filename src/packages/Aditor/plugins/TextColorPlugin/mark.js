const mark = {
    textColor: {
        attrs: { color: {} },
        inclusive: true,
        parseDOM: [
            {
                style: 'color',
                getAttrs: (color) => {
                    return { color };
                }
            }
        ],
        toDOM: (mark) => {
            return [
                'span',
                {
                    style: 'color: ' + mark.attrs.color
                }
            ];
        }
    }
};

export default mark;
