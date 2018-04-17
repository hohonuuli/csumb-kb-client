# csumb-kb-client

## Start up

1. Install dependencies
```
npm install
```
2. Run application
```
npm start
```

## File Structure
```
project
│   README.md
│   package.json   
└───prototype - First iteration template
│
│───public - Index and assets
│
└───src - React source code
    │───actions - Actions for Redux
    │───components - Multi-level components
    │───containers - React source code
    │───modules - Combined Redux reducers
    │───index.js - Main React file
    │───store.js - Redux data store
```
## Redux? What is that and why?
In React data lives in within each component called properties and state. It's becomes very difficult to manage and share props and state between components. So Redux allows us to store this information globally in the application, this will be useful when authentication is implemented.

### Diagram - Source from Bucky Roberts - [Github](https://github.com/buckyroberts/React-Redux-Boilerplate)
![](http://i.imgur.com/DUiL9yn.png)
