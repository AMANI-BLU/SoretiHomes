import fs from 'fs';
import path from 'path';

const rollupNativePath = path.resolve('node_modules', 'rollup', 'dist', 'native.js');

if (fs.existsSync(rollupNativePath)) {
  let content = fs.readFileSync(rollupNativePath, 'utf8');
  if (!content.includes('@rollup/wasm-node/dist/native.js')) {
    content = content.replace(
      'catch (error) {',
      `catch (error) {\n\t\ttry {\n\t\t\treturn require('@rollup/wasm-node/dist/native.js');\n\t\t} catch (wasmError) {}`
    );
    fs.writeFileSync(rollupNativePath, content, 'utf8');
    console.log('[patch-rollup] Applied WASM fallback patch to Rollup.');
  }
}
