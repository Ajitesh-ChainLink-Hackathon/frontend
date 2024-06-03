# React + TypeScript + Vite

To run website- 
npm install
npm run dev

User must connect to Polygon Amoy testnet in metaMask.

webiste will take some time to fetch skins thtough smart contracts


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

About project-

Website to trade skins through Blockchain. Frontend made with typescript Fully data stored in Polygon Amoy smart contracts with all the functions to trade skins. skinOwnership.sol- 0x7161636060D3f7692a3CF2ED395A29d05763b2e4 skinMarket.sol - 0x69Bce34c7Ac7A22A383b32f33e725921b60Dd6dB only owner can add/remove/edit game skins.

Presentations- 
-youtube - https://www.youtube.com/watch?v=zyG_e91eixU
-slide Presentation - https://www.canva.com/design/DAGG5ApYWjY/07YGfG_AUduC2sG6A_Oqqw/edit?utm_content=DAGG5ApYWjY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

Made by - Sebastian Ajitesh Shritesh Devansh Abhranil

for BlockMagic ChainLink Hackathon.
