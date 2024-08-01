import path from "node:path"
import { createRequire } from "node:module"
const require = createRequire(import.meta.url)
const fontSourcePath = require.resolve("@fontsource-variable/archivo")

export default (params) => ({
    name: "print-integration",
    hooks: {
        "astro:config:setup": async ({injectRoute, injectScript, updateConfig}) => {
            injectScript(
                "before-hydration",
                `
                const compiiilePrintStyle = \`  
                    ${ params?.style ?? ''}
                \`
                
                const compiiilePrintStyleSheet = document.createElement("style")
                compiiilePrintStyleSheet.innerText = compiiilePrintStyle
                document.head.appendChild(compiiilePrintStyleSheet)
            `
            )

            injectRoute({
                pattern:'/print',
                entrypoint:new URL('./print.astro', import.meta.url).pathname
            })

            updateConfig({
                vite: {
                    server: {
                        fs: {
                            allow: [path.resolve(fontSourcePath, "../../")]
                        }
                    }
                }
            })
        }
    }
})
