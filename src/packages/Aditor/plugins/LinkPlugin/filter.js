function filter(predicates, cmd) {
    return function (state, dispatch, view) {
        if (!Array.isArray(predicates)) {
            predicates = [predicates];
        }
        if (
            predicates.some(function (pred) {
                return !pred(state, view);
            })
        ) {
            return false;
        }
        return cmd(state, dispatch, view) || false;
    };
}

export default filter;
