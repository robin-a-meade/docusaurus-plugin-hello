# docusaurus-plugin-hello

Simple example to get down the mechanics of writing a Docusaurus plugin using Typescript.

Based on docusaurus-plugin-debug 

Install a fresh Docusaurus (Typescript variant):

```
npx create-docusaurus@latest my-website classic --typescript
cd my-website
```

Clone this project under `packages` directory:

```
mkdir packages
git clone git@github.com:robin-a-meade/docusaurus-plugin-hello
```

Declare it in `docusaurus.config.js`:

```
plugins: [
  ['./packages/docusaurus-plugin-hello/lib/index.js', { fooOption: "fooOptionVal", barOption: "barOptionVal" }],
],
```

Notice the npm script **build**:

```
"build": "tsc --build && node ../../admin/scripts/copyUntypedFiles.js && prettier --config ../../.prettierrc --write \"lib/theme/**/*.js\""
```

It needs the `admin/scripts/copyUntypedFiles.js` script to copy the .css files. (The tsc compile takes care of copying the .js files.)

```
mkdir -p admin/scripts && cd "$_"
wget https://raw.githubusercontent.com/facebook/docusaurus/main/admin/scripts/copyUntypedFiles.js
```

**Note:** I had to rename the extension from .js to .mjs. Not sure why.

Get the debug theme files:

```
cd packages/docusaurus-plugin-debug && cd "$_"
svn export https://github.com/facebook/docusaurus/trunk/packages/docusaurus-plugin-debug/src/theme
```


I copied tsconfig.js and prettier config from https://github.com/facebook/docusaurus/
