// This is a work around for a bug that exists in an old version of js-dom.
// This is being used by @testing-library/jest-dom. The maintainers haven't fixed
// the issue yet, so this workaround was provided here:
//
// https://github.com/NickColley/jest-axe/issues/147
//
// If you remove this, you will notice the following error, wherever jest-axe's
// `axe` function is used:
//
// Error: Not implemented: window.computedStyle(elt, pseudoElt)...
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);