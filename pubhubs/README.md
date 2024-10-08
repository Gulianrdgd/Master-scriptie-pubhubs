# Running the webserver for (development purpose only)

Default settings are in the `default.yaml`; for development these initial settings should work.  If you make a copy of `default.yaml` and call it `config.yaml`, this configuration is used instead.  To use an entirely different configuration file instead, you can pass its path (relative to the current working directory) via the environmental variable `PUBHUBS_CONFIG`, e.g. `PUBHUBS_CONFIG=my_config.yaml cargo run`.

# Project Dependencies

- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)
- [Cargo Watch](https://github.com/watchexec/cargo-watch)
- [Node Package Manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Docker](https://www.docker.com/)
- [Sass](https://sass-lang.com/install)

Several libraries for the client, most important:

- [matrix-js-sdk](https://github.com/matrix-org/matrix-js-sdk)
- [TypeScript](https://www.typescriptlang.org)
- [Vue](https://vuejs.org)
- [Pinia](https://pinia.vuejs.org)
- [Vitest](https://vitest.dev)
- [Histoire](https://histoire.dev)

## Building static assets

Static assets for the PubHubs central server, so far just css, are build through build.rs, before launching the server. The build script expects npm (with sass) to be installed.

Assets needed for the client are build with the several build options for the client.

# Setting up external services

The external services for development are: an Yivi server, a Hub (matrix home server) and a client.

There is a python script that should automate some set-up:

```shell
python3 start_test_setup.py run --cargo-disabled --scale <positive value e.g., 1,2,3>
```

This will only build containers for Yivi, Hub and Client. Central Platform should be build and run separately with cargo.

```shell
python3 start_test_setup.py run --cargo-enabled <cargo_arguments> --scale <positive value e.g., 1,2,3>
```

This will only build containers for Yivi, Hub and Client, This will also build and run Central Platform with cargo. Cargo arguments `<cargo_arguments>` needs to be provided by the user e.g., cargo run or cargo watch.

We've not tested it on Windows, but it should work on linux and mac.

This script will launch three containers:

1. The hub.
2. The client.
3. An Yivi server for revealing personal attributes.

If the hub is not yet registered on the PubHubs server, the script will register the hub.

After running the script, check whether the Yivi server has started by checking the log of Yivi container.

```shell
   docker logs -f yivi
```

The following output would be achieved when Yivi server is started e.g.,:

```shell
level=info msg="Server listening at :8088/"
level=info msg="checking for updates" scheme=irma-demo type=issuer
```

The PubHubs javascript client can be found here: http://localhost:8080/client

## Reachable IP address

For your local PubHubs instance to be reachable by the Yivi app, your host's IP address must be reachable by your phone (perhaps by having them both on the same Wi-Fi network.) PubHubs will try to guess your IP address using `ifconfig.me` (provided `urls.for_yivi_app` is set to `!autodetect` in the configuration file,) but you can also set `url.for_yivi_app` manually.  For details, see comments in `default.yaml`.

When the Yivi app suggests you should check your phone's internet access, this might actually indicate that:

- **Your host is behind a NAT.** This is the case when the IP address reported by your operating system differs from the one from, say, https://ifconfig.me. (If you have control over the NAT, you might be able to setup port forwarding, pinholing, or put your host in the DMZ.)
- **Your host is behind a firewall.** To check this, run, say, `nmap 1.2.3.4` if `1.2.3.4` is your IP address. When no firewall is present, you should get:

  ```
  PORT      STATE SERVICE
  8008/tcp  open  http
  8080/tcp  open  http-proxy
  8088/tcp  open  radan-http
  ```

  For comparison, Apple's firewall blocking port 8080 looks like this:

  ```
  PORT     STATE    SERVICE
  8008/tcp open     http
  8080/tcp filtered http-proxy
  8088/tcp open     radan-http
  ```

  If you have control over the firewall, you might choose to disable it. (Making an exception for PubHubs might prove tedious, since the binary changes with every recompilation.)

- **If you're using an iPhone on the same network as your host**, that your iPhone's traffic is routed through one of Apple's server via **[private relay](https://support.apple.com/en-us/HT212614)**. You can disable Private Relay globally, or just "Limit IP Address Tracking" per Wi-Fi network.

If nothing else helps, and you have access to a server with a public IP address, say 1.3.3.7, you can solve the problem by forwarding your local port to this server, via

```shell
ssh -R 8080:localhost:8080 username@yourserver.com
```

and have the Yivi app contact 1.3.3.7 instead by setting
```
urls:
    # [...]
    for_yivi_app: !manual http://1.3.3.7:8080/
```
in your configuration file (e.g. `config.yaml`.)

