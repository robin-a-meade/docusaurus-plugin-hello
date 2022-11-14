import path from 'path';
import { docuHash, normalizeUrl, posixPath } from '@docusaurus/utils';
import type { LoadContext, Plugin, PluginOptions } from '@docusaurus/types';

function pluginHello(context: LoadContext, options: PluginOptions): Plugin<undefined> {

    const pluginName = 'docusaurus-plugin-hello';

    const pluginDataDirRoot = path.join(
        context.generatedFilesDir,
        pluginName,
    );

    const aliasedSource = (source: string) =>
        `~hello/${posixPath(path.relative(pluginDataDirRoot, source))}`;

    return {
        name: pluginName,

        getThemePath() {
            return '../lib/theme';
        },
        
        getTypeScriptThemePath() {
            return '../src/theme';
        },

        async contentLoaded({ actions: { createData, addRoute }, content, allContent }) {

            const allContentPath = await createData(
                // Note that this created data path must be in sync with
                // metadataPath provided to mdx-loader.
                `${docuHash('docusaurus-debug-allContent')}.json`,
                JSON.stringify(allContent, null, 2),
            );

            addRoute({
                path: normalizeUrl([context.siteConfig.baseUrl, '__docusaurus/debug2/content']),
                component: '@theme/DebugContent',
                exact: true,
                modules: {
                    allContent: aliasedSource(allContentPath),
                },
            });


            console.log(pluginName, 'contentLoaded');
            console.dir(allContent, { depth: null });
        },

        async postBuild(props) {
            console.log(pluginName, 'postBuild');
            console.log('postBuild');
        },

        configureWebpack() {
            return {
                resolve: {
                    alias: {
                        '~hello': pluginDataDirRoot,
                    },
                },
            };
        }

    }
};

//pluginRecent.validateOptions = ... 
//pluginRecent.validateThemeConfig = ... 

module.exports.default = pluginHello;