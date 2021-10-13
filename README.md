SkeinCurrency Core Node
============

A SkeinCurrency full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services. At the minimum a node has an interface to [SkeinCurrency Core (dashd) v0.13.0](https://github.com/dashpay/dash/tree/v0.13.0.x) for more advanced address queries. Additional services can be enabled to make a node more useful such as exposing new APIs, running a block explorer and wallet service.

## Usages

### As a standalone server

```bash
git clone https://github.com/skeincurrency/core-node
cd core-node
npm install
./bin/core-nodet
```

When running the start command, it will seek for a .skeincore folder with a core-node.json file.
If it doesn't exist, it will create it, with basic task to connect to dashd.

Some plugins are available :

- Insight-API : `./bin/core-node addservice @skeincurrency/insight-api`
- Insight-UI : `./bin/core-node addservice @skeincurrency/insight-ui`

You also might want to add these index to your dash.conf file :
```
-addressindex
-timestampindex
-spentindex
```

### As a library

```bash
npm install @skeincurrency/core-node
```

```javascript
const skeincore = require('@skeincurrency/core-node');
const config = require('./core-node.json');

let node = skeincore.scaffold.start({ path: "", config: config });
node.on('ready', function() {
    //SkeinCurrency core started
    dashd.on('tx', function(txData) {
        let tx = new skeincore.lib.Transaction(txData);
    });
});
```

## Prerequisites

- SkeinCurrency Core (SkeinCurrency) (v0.13.0) with support for additional indexing *(see above)*
- Node.js v8+
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~20GB of disk storage
- ~1GB of RAM

## Configuration

SkeinCurrency includes a Command Line Interface (CLI) for managing, configuring and interfacing with your SkeinCurrency Node.

```bash
core-node create -d <dash-data-dir> mynode
cd mynode
core-node install <service>
core-node install https://github.com/yourname/helloworld
core-node start
```

This will create a directory with configuration files for your node and install the necessary dependencies.

Please note that [SkeinCurrency Core](https://github.com/dashpay/dash/tree/master) needs to be installed first.

For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of Bitcore:

- [Insight API](https://github.com/dashevo/insight-api/tree/master)
- [Insight UI](https://github.com/dashevo/insight-ui/tree/master)
- [Bitcore Wallet Service](https://github.com/dashevo/skeincore-wallet-service/tree/master)

## Documentation

- [Upgrade Notes](docs/upgrade.md)
- [Services](docs/services.md)
  - [Dashd](docs/services/dashd.md) - Interface to SkeinCurrency Core
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.


## Setting up dev environment (with Insight)

Prerequisite : Having a dashd node already runing `dashd --daemon`.

Core-node : `git clone https://github.com/skeincurrency/core-node -b develop`
Insight-api (optional) : `git clone https://github.com/skeincurrency/insight-api -b develop`
Insight-UI (optional) : `git clone https://github.com/skeincurrency/insight-ui -b develop`

Install them :
```
cd core-node && npm install \
 && cd ../insight-ui && npm install \
 && cd ../insight-api && npm install && cd ..
```

Symbolic linking in parent folder :
```
npm link ../insight-api
npm link ../insight-ui
```

Start with `./bin/core-node start` to first generate a ~/.skeincore/core-node.json file.
Append this file with `"@skeincurrency/insight-ui"` and `"@skeincurrency/insight-api"` in the services array.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/dashevo/skeincore/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/skeincurrency/core-node/blob/master/LICENSE).

Copyright 2016-2018 SkeinCurrency Core Group, Inc.

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)
