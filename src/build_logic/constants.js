import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
export const srcDir = path.resolve(__filename, '../..');
export const projectRootDir = path.resolve(srcDir, '..');

// Templates directories
export const templateDir = path.resolve(srcDir, 'templates');
export const pageBaseDir = path.resolve(templateDir, 'pages');

// Data directories.
export const dataDir = path.resolve(srcDir, 'data');
export const showsDir = path.resolve(dataDir, 'shows');
export const imagesSourceDir = path.join(srcDir, 'images');
export const fetchedAssetsDir = path.join(srcDir, 'fetched_assets');


// Output directories
export const outputBaseDir = path.resolve(projectRootDir, 'output');
export const outputPrimaryRootDir = path.resolve(outputBaseDir, '_prebuild_output');
export const outputjhcomDistDir = path.resolve(outputBaseDir, 'justinholmes.com.public.dist');
export const outputcryptograssDistDir = path.resolve(outputBaseDir, 'cryptograss.live.public.dist');
