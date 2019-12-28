# [2.2.0](https://github.com/prantlf/grunt-jsonlint/compare/v2.1.0...v2.2.0) (2019-12-28)

### Features

* Add support for quiote unification and trailing comma trimming (JSON5) ([582b74f](https://github.com/prantlf/grunt-jsonlint/commit/582b74fc817f64b9801cf1ad99b6170194f21850))

# [2.1.0](https://github.com/prantlf/grunt-jsonlint/compare/v2.0.7...v2.1.0) (2019-12-27)

### Bug Fixes

* Adapt to the renamed error properties in @prantlf/jsonlint ([3720c9b](https://github.com/prantlf/grunt-jsonlint/commit/3720c9b05323e6aa6e1534f3361c9b50afb7f29f))
* Upgrade @prantlf/jsonlint to support number of spaces as the indent option ([3c0c67a](https://github.com/prantlf/grunt-jsonlint/commit/3c0c67aa39bd4965e3bb9691da40787131935dea))

### Features

* Add support for pretty-printing of CJSON and JSON5 formats ([a4f9fb6](https://github.com/prantlf/grunt-jsonlint/commit/a4f9fb6ebc95b55caa7060ad867e2e7f66781b21))

## [2.0.7](https://github.com/prantlf/grunt-jsonlint/compare/v2.0.6...v2.0.7) (2019-09-24)

### Bug Fixes

* Upgrade the @prantlf/jsonlint dependency ([d3e1c27](https://github.com/prantlf/grunt-jsonlint/commit/d3e1c27245a82a1cdb1db408de7537344e3f5e84))

## [2.0.6](https://github.com/prantlf/grunt-jsonlint/compare/v2.0.5...v2.0.6) (2019-07-04)

### Bug Fixes

* Upgrade JSONLint to fix error output ([835caad](https://github.com/prantlf/grunt-jsonlint/commit/835caadbaec643fed78ea6afa63c5c72585e5a11))

## [2.0.5](https://github.com/prantlf/grunt-jsonlint/compare/v2.0.4...v2.0.5) (2019-06-17)

### Bug Fixes

* Upgrade jsonlint to get better error reporting from schema validation ([75a0e80](https://github.com/prantlf/grunt-jsonlint/commit/75a0e80c6266b752ffe4cd2cf1ccedd25f1180e2))

## [2.0.4](https://github.com/prantlf/grunt-jsonlint/compare/v2.0.3...v2.0.4) (2019-06-13)

### Bug Fixes

* Handle schema validation exceptions, which do not contain the location ([c0796ba](https://github.com/prantlf/grunt-jsonlint/commit/c0796bacf1f3e36382b6b6009d852ce399528c23))
* Upgrade jsonlint dependency ([f5043e4](https://github.com/prantlf/grunt-jsonlint/commit/f5043e49e58353afd837c3a7a2db1aa074798d3d))

## [2.0.3](https://github.com/prantlf/grunt-jsonlint/compare/v2.0.2...v2.0.3) (2019-06-04)

### Bug Fixes

* Do not report the first line of the default error message with duplicate information about the line and column of the error occurrence ([044d16e](https://github.com/prantlf/grunt-jsonlint/commit/044d16ed2157171ad0d10fc1997b34d8e727a678))
* Print the column of the error occurrence in addition to the line ([8afe306](https://github.com/prantlf/grunt-jsonlint/commit/8afe3068711ee02241d58c2ba58880eebd85814c))

## [2.0.2](https://github.com/prantlf/grunt-jsonlint/compare/v2.0.1...v2.0.2) (2019-06-02)

### Bug Fixes

* Upgrade jsonlint ([ec9e906](https://github.com/prantlf/grunt-jsonlint/commit/ec9e9060d20d14d427367c283f869fbf7a251a0e))

## [2.0.1](https://github.com/prantlf/grunt-jsonlint/compare/v2.0.0...v2.0.1) (2019-06-02)

### Bug Fixes

* Ensure the same parsing options for data and schema ([f7f4e94](https://github.com/prantlf/grunt-jsonlint/commit/f7f4e949893f70e4e862a02204a72b120836faf6))

# [2.0.0](https://github.com/prantlf/grunt-jsonlint/compare/v1.4.1...v2.0.0) (2019-06-02)

### Features

* Add options for ignoring trailing commas, reporting duplicate object keays as errors and a mode to comply with the JSON5 specification ([9c1efb7](https://github.com/prantlf/grunt-jsonlint/commit/9c1efb7bfaa2b15684890c9cd8d273b8ae255de0))
* Upgrade @prantlf/jsonlint to the version using a hand-built parser ([bc06f37](https://github.com/prantlf/grunt-jsonlint/commit/bc06f372f26302edda87a0343ef8accf9664895f))

### BREAKING CHANGES

* Error messages may change a little, but they should stay es expressive as earlier, maybe better.

## [1.4.1](https://github.com/prantlf/grunt-jsonlint/compare/v1.4.0...v1.4.1) (2019-05-31)

### Bug Fixes

* Guard against incomplete errors thrown from the parser ([1204fb0](https://github.com/prantlf/grunt-jsonlint/commit/1204fb0265c53d6c2a7f98ffbce71f9b82c2949e))

# [1.4.0](https://github.com/prantlf/grunt-jsonlint/compare/v1.3.0...v1.4.0) (2019-05-30)

### Features

* Support parser options for customisation and performance in JSON schema parsing too ([2f2eb6e](https://github.com/prantlf/grunt-jsonlint/commit/2f2eb6eff947fc82f5e7d217eaacd304c2fa3046))

# [1.3.0](https://github.com/prantlf/grunt-jsonlint/compare/v1.2.1...v1.3.0) (2019-05-30)

### Bug Fixes

* Upgrade @prantlf/jsonlint ([815c4e5](https://github.com/prantlf/grunt-jsonlint/commit/815c4e52b1b46f70a2f4559942014606f4740645))
* Use native JSON parser, fix error line number and source exzerpt ([c1aed13](https://github.com/prantlf/grunt-jsonlint/commit/c1aed13773b5e3487095313ed1bbc1a59d34e9e0))

### Features

* Add an option for sorting object keys when the JSON file is formatted ([f2de1e6](https://github.com/prantlf/grunt-jsonlint/commit/f2de1e6d5c736df552b1079839463cb12106161e))

## [1.2.1](https://github.com/prantlf/grunt-jsonlint/compare/v1.2.0...v1.2.1) (2019-05-26)

### Bug Fixes

* Update usage documentation ([1e235c3](https://github.com/prantlf/grunt-jsonlint/commit/1e235c36d9078e68909df5db00098aeecda246df))

# [1.2.0](https://github.com/prantlf/grunt-jsonlint/compare/v1.1.0...v1.2.0) (2019-05-26)

### Features

* Document support for comments, single-quoted strings and JSON Schema validation ([68c1658](https://github.com/prantlf/grunt-jsonlint/commit/68c16588f99c50ad5303976c88c684993e4b4a77))

This is the first version released after forking the [original project](https://github.com/brandonramirez/grunt-jsonlint).
