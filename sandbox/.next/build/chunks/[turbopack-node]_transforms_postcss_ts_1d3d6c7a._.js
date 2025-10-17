module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/REPOS/Acrobi/design-system/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "build/chunks/node_modules_12b5f858._.js",
  "build/chunks/[root-of-the-server]__87df3d7f._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/REPOS/Acrobi/design-system/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];