// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })




// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process.env.VITE_SOME_KEY': JSON.stringify(process.env.VITE_SOME_KEY || '1234'),
    
//   },
// });





// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       output: {
//         inlineDynamicImports: true,
//         globals: {
          
//           'import.meta.env.VITE_SOME_KEY': JSON.stringify(process.env.VITE_SOME_KEY||'ABC'),
//         },
//       },
//     },
//   },
// });



import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
    // Load app-level env vars to node-level env vars.
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
      plugins: [react()],
      build: {
        rollupOptions: {
          output: {
            inlineDynamicImports: true,
            globals: {
              
              'import.meta.env.VITE_SOME_KEY': JSON.stringify(process.env.VITE_SOME_KEY||'ABC'),
            },
          },
        },
      },
    });
}
