# compiiile-print

> An Astro integration to add a print-ready page containing all Compiiile files.

## Features

- :page_facing_up: Add a `/print` route displaying all your pages ready to be printed
- :wrench: Header can be fully customized
- :nail_care: Apply your own style
- :white_check_mark: All pages come after a page-break, and with a pagination

## Installation

```bash
yarn add @compiiile/compiiile-print # install as a project dependency with yarn
# or
npm install @compiiile/compiiile-print # install as a project dependency with npm
```

## Add to Compiiile

Import the dependency and add it to your Compiiile config file (`compiiile.config.js`):

```js
import printIntegration from "compiiile-print"

export default {
    integrations:[printIntegration()]
}
```

You should now get a print-ready page when navigating to the `/print` route :sparkles:

## Customize

### Style

To customize the print page with your own style, pass an object to the print integration with a `style` property which is a String containing your custom CSS.
Here is an example to set the header style:

```js
import printIntegration from "compiiile-print"

export default {
    integrations:[printIntegration({
        style: `
            .page-header-top-left {
                
            }
            
            .page-header-top-center {
                
            }

            .page-header-top-right {
                
            }
            
            h2 {
            
            }
        `
    })]
}
```

> :warning: By default, the print page switches to the light theme. If you want to print while using the dark theme, set the theme as a route param like so: `/print?theme=dark`.

### Page header

You can customize the header displayed on each pages by passing specific object keys to the `data` property of your config:
- `data.printHeader.topLeft`: content to be displayed at the top left of the header,
- `data.printHeader.topCenter`: content to be displayed at the top center of the header,
- `data.printHeader.topRight`: content to be displayed at the top right of the header.

The value must be a `String` and can contain HTML tags.

### Full example

Here is a full working example with custom CSS and a header containing a logo:

```js
import printIntegration from "compiiile-print"
import fs from "node:fs/promises"

const headerLogoPath = new URL("./logo.png", import.meta.url) // logo in the same directory as the config file
const headerLogo = await fs.readFile(headerLogoPath, {encoding:'base64'})

export default {
    integrations:[printIntegration({
        style: `
            .page-header-top-center {
                color: #d82727;
                font-weight: bold;
            }

            .page-header-top-right {
                color: #273ed8;
                line-height: 1.2rem;
                text-align: right;
            }

            html.theme--dark .page-header-top-right {
                color: #8db0e8;
            }
        `
    })],
    data: {
        printHeader: {
            topLeft: `<img src="data:image/png;base64,${headerLogo}" width="150"/>`,
            topCenter: "My custom title",
            topRight: "Compiiile<br/>2024",
        }
    }
}
```

## Contributions

Attention is more directed on the [Compiiile project](https://github.com/compiiile/compiiile). 
So please, open an issue first to discuss any fix or improvement on this integration.

## License

This project is licensed under the terms of the GNU General Public License v3.0.

See [LICENSE.md](./LICENSE.md).

