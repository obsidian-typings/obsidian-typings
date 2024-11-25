import fs from 'node:fs';
import {
    Converter,
    ReflectionKind
} from 'typedoc';

const TYPINGS_JSON_PATH = '../package.json';

const typings_package = JSON.parse(fs.readFileSync(TYPINGS_JSON_PATH, 'utf-8'));
const typings_version = typings_package.version;

const ROOT_FOLDER = '../';
const obsidian_version_resolution = {
    '0.9.7': 'abe96e82077b1ffd2f02293aa5a7ac2e9a806107',
    '0.9.8': 'f2dc0689abef0a7cf3c7fd3cb59e2a616f220293',
    '0.9.11': '06510d0978a741294f915d756bd6650c6a46e49a',
    '0.9.12': '1d21a27686b8c2eb50f2776cbb459705733f077e',
    '0.9.15': 'd0b0562a5f8251153a72cc397f08876dbb28222b',
    '0.9.16': '3efab21fc0cfef3ae75951beb66aadd479ae610d',
    '0.9.20': '6647842a61850b716eb05af0f9ffe36067dabbef',
    '0.9.21': 'ea530cce1adaa33eb891f053a56a12fa8640b834',
    '0.10.0': '2e4ac7c8dd4d1b8ca4cf726eac75a935a3ea25d8',
    '0.10.2': 'd10f2f6efc0d0d7c9bf96cd435ef376b18fbd6d8',
    '0.10.3': '8e18bbdd795f230c545aef41d92422940a31d3f0',
    '0.10.4': '41b5b9d62b02ee08a556951511bb02eb6c8f0686',
    '0.10.5': '3b187dd5322c16e5970b17b60bc59daac838723f',
    '0.10.6': 'a0e0c245561215ced9468859091e01d015f5cda9',
    '0.10.9': 'b06b55f1b3a673a4b8bf10e8ca6b823981b9cc8b',
    '0.10.12': '9b69506127863102e1102cdeb4d14f523d08583e',
    '0.11.0': '7c7a0f4a5c9b51b202ab72bd12937f388800e78a',
    '0.11.7': '55946e5a6259a28c416d2d6e600a7964a86a01dd',
    '0.11.11': 'dbfa19ad7aa6557f0ecff962065c3f540bc77e27',
    '0.11.13': 'bbd5525cba2e0aefc27c87b378805c155ae8d5b1',
    '0.12.0': 'eb459522e7e35983e3e6c2358301a21b26de7b64',
    '0.12.2': '48bd2b91f66aa7d3768629be48c52e5351ec6696',
    '0.12.5': 'ddd50214f530d23ee21f440a9fa64f4507176871',
    '0.12.6': 'b0aa06eab03d8c39c0733949da5aa1edc2084b01',
    '0.12.11': 'bde556afa033e909ebfb9fcee8f5ef288276f78f',
    '0.12.16': '5af3ef982328a2dd0a2f5242f3c74e2f45e07896',
    '0.12.17': '5687a75ecfdb78b6a832127cf6f9229e27e196a0',
    '0.13.8': 'fac5e67f5d83829a4e0126905494c8cbca27765b',
    '0.13.9': '5a52a586c956dbed5fe879f6e3268717b72c07cc',
    '0.13.11': 'c148c24b30dc68d9835820b4169b95d3a038a0f6',
    '0.13.21': '342a49dcc4e2012e4c60e16a5a3d16d740ad86b6',
    '0.13.26': '71b3b362bb1f0e8f3c13f1a1d92f65427d2ad477',
    '0.13.30': 'c01fc3074deeb3dfc6ee02546d113b448735b294',
    '0.14.3': 'ebb71a459952c03ca34de59a85fc365c48a64346',
    '0.14.4': 'fc616fa86533d31b1d68b45887f4c9c46da389bf',
    '0.14.5': '3615a06189621a7ac7cf8ff236f6a5ae1ba11ccd',
    '0.14.6': '036708710c4a4b652d8166c5929d5ba1ffb7fb91',
    '0.14.8': '38bd84fd66b6bf59d2eab243f27e33d3031ca51c',
    '0.15.0': 'eceb33bd752f26db38f6d97088389b8e82626fdb',
    '0.15.1': '2e418be45f5162191d8cb1e506e68e6a2d548806',
    '0.15.2': '86ad046945701047de9862384d1508dd49ca2bcb',
    '0.15.3': 'd4b79f95ccf3838a305915a137a844250766d023',
    '0.15.4': 'e05bbea20aa3d082b6421879f6acd141f7408f5c',
    '0.15.9': '3770989c2364ead5429eb7e4475e095588bbe914',
    '0.16.0': '6b2138aa28fb6d6f58f78e6fabec02186fdc0f82',
    '0.16.3': '1b4f6e2e5753c8ac2d538bc5d55c38f228450cb2',
    '1.1.0': '32fe4c3f4346d0b64fd5fdd5e25fc55f3a01c75a',
    '1.1.1': '6161bf5915ae99167a3c80475ea9c0554ceb998f',
    '1.1.7': '38dd22168d2925086371bfc59e36fd9121527a39',
    '1.1.13': 'a1aede57dbab620ccebd11fcbac3ca89bc3d5a12',
    '1.2.3': 'b89eb0085d87ae725cf0b2513c609d0db1136899',
    '1.2.5': 'd6f80eccf6a6f0d1ec314605bdb7e9489311503f',
    '1.2.8': '910e2d61e0f0ec9d7f1ff7ce82c53674fba5c905',
    '1.4.0': '90517f4fa762838008a638069d8e151f071a8ef7',
    '1.4.4': '2ccfad1a10c8da9066bf2c502f801b1a237f4ce4',
    '1.4.10': '2b624a90d96ec993ab75cf7feb9627fd85323bc5',
    '1.4.11': '83ce5767ab107e888079e9a673ce4c3153db1ff2',
    '1.5.1': 'bbb696aeb8bf5126bf2ecbf84fc8284fe133bc20',
    '1.5.7': 'cdc74f2c3b245abc20e71e6ca996ea21e9fd1a13',
    '1.6.6': 'ea526e2459ad3f188c994862a9b106d94bf0f692',
    '1.7.2': '3f5614ae8e872a4edbb528468f70023792aaa905'
    // TODO: Update this list when the latest version is released (otherwise, links will point to HEAD)
    //  Make sure the actual commit is used that matches with the NPM version
};

const packages = {
    'obsidian': {
        version: obsidian_version_resolution[
            JSON.parse(fs.readFileSync(ROOT_FOLDER + 'node_modules/obsidian/package.json', 'utf-8')).version
        ],
        github: 'obsidianmd/obsidian-api'
    },
    'typescript': {
        version: JSON.parse(fs.readFileSync(ROOT_FOLDER + 'node_modules/typescript/package.json', 'utf-8')).version,
        github: 'microsoft/TypeScript',
        version_prefix: 'v'
    }
};

const ENTRYPOINT_NAME = 'full-types.d.ts';

function traverseChildren(ref, cb) {
    if (ref.children) {
        for (const child of ref.children) {
            cb(child);
            traverseChildren(child, cb);
        }
    }
}

function setSources(ref, file_name = '', file_path = '', offset = 0) {
    if (ref.sources?.length > 0) {
        for (const source of ref.sources) {
            // Do not point to the bundled node_modules, but to the appropriate package instead
            if (source.fullFileName.includes('node_modules') || (file_path.includes('node_modules') && !source.url)) {
                const path = (file_path || source.fullFileName).split('node_modules/')[1];
                const package_name = path.split('/')[0];
                if (packages[package_name]) {
                    source.fileName = path.split('/').pop();
                    source.fullFileName = path.slice(package_name.length + 1);
                    const version = packages[package_name].version
                        ? ((packages[package_name].version_prefix || '') + packages[package_name].version)
                        : 'HEAD';
                    source.url =
                        `https://github.com/${packages[package_name].github}/blob/${version}/${source.fullFileName}#L`
                        + (source.line - offset);
                    source.line -= offset;
                }
            } // If typing came from the full types entrypoint, custom resolution via file_name/file_path
            else if (source.fullFileName.includes(ENTRYPOINT_NAME) && file_path) {
                source.fileName = file_name;
                source.fullFileName = file_path;
                source.line -= offset;
                source.url = 'https://github.com/' + file_path + '#L' + source.line;
            } // Force URL to point to corresponding version, rather than a git commit
            else if (source.url?.match(/blob\/[0-9a-f]{5,40}\/src/)) {
                source.url = source.url.replace(/blob\/[0-9a-f]{5,40}\/src/, `blob/${typings_version}/src`);
            }
        }
    }
}

function setAllSources(ref, file_name = '', file_path = '', offset = 0) {
    setSources(ref, file_name, file_path, offset);
    if (ref.signatures) {
        for (const sig of ref.signatures) {
            setSources(sig, file_name, file_path, offset);
        }
    }
}

export function load(app) {
    app.converter.on(Converter.EVENT_RESOLVE_BEGIN, (context) => {
        const namespace = context.project.getReflectionsByKind(ReflectionKind.Namespace);
        for (const ns of namespace) {
            if (ns.comment?.blockTags.some(tag => tag.tag === '@source')) {
                const source_tag = ns.comment.blockTags.find(tag => tag.tag === '@source');
                let source = source_tag.content[0].text;
                let offset = 0;
                if (source.includes('#')) {
                    [source, offset] = source.split('#');
                    offset = parseInt(offset);
                }
                const last_part = source.split('/').pop();
                setAllSources(ns, last_part, source, offset);
                traverseChildren(ns, (child) => {
                    setAllSources(child, last_part, source, offset);
                });
            } else {
                setAllSources(ns);
                traverseChildren(ns, (child) => {
                    setAllSources(child);
                });
            }
        }
    });
}
