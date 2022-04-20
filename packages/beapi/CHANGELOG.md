# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.3.0-beta.4](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@2.3.0-beta.3...beapi-core@2.3.0-beta.4) (2022-04-20)


### Bug Fixes

* add warning to enableEvents client option ([d983640](https://github.com/MCBE-Utilities/BeAPI/commit/d983640c3d87638745f57e892adfc075537b9bb3))
* **block:** updated to use new inventory ([a33a505](https://github.com/MCBE-Utilities/BeAPI/commit/a33a5052622c7079d922710b931ec050a9d349d6))
* **cli:** build command broke due to non existant uuids ([214b9e2](https://github.com/MCBE-Utilities/BeAPI/commit/214b9e21732c1be197ee61c5d3cc279d04ad3558))
* **core:** version bump ([35fc33b](https://github.com/MCBE-Utilities/BeAPI/commit/35fc33b07e783fb9ce814025586fc8491523f3cc))
* **enchantments:** attempt fix enchantments...? ([a8aa33f](https://github.com/MCBE-Utilities/BeAPI/commit/a8aa33fbc1dba3cf35a39f4cc58228594207b219))
* **entities:** updated getByNameTag ([23afbe7](https://github.com/MCBE-Utilities/BeAPI/commit/23afbe76bba26d695053c5e1f40aec71b5049def))
* **events:** added some events to use the new Item ([8241982](https://github.com/MCBE-Utilities/BeAPI/commit/8241982a768526010d84e2d38dea6ceeafc3a379))
* **events:** updated types for EntityHurt ([af39c80](https://github.com/MCBE-Utilities/BeAPI/commit/af39c80bf4580685a3cf217ca2fdb1e0dbc5f09f))
* **events:** updated types for PlayerHurt ([13e1439](https://github.com/MCBE-Utilities/BeAPI/commit/13e1439a1419a19071b6a81eb0906aec3499909b))
* **inventory:** getEmtptySlots -> getEmptySlots ([4cabc7e](https://github.com/MCBE-Utilities/BeAPI/commit/4cabc7e14f3ad8ad98c600a2a7d420d4451292f3))
* **item:** fixed addEnchantment & removeEnchantment ([e58be33](https://github.com/MCBE-Utilities/BeAPI/commit/e58be3394fd1590b71cea9c5ea40ccba8fa0a745))
* renamed getAll helper to getCoordinatesBetween ([f31bfad](https://github.com/MCBE-Utilities/BeAPI/commit/f31bfad334916bfd11a4e3b288d3f03ecc887875))
* **timer:** timers now work again ([c5c320a](https://github.com/MCBE-Utilities/BeAPI/commit/c5c320a3cf969eef616f3993f998e2d95f763f69))
* **world:** updated getBlock ([bb75c02](https://github.com/MCBE-Utilities/BeAPI/commit/bb75c021605252de2aedf5cbff3aeba76d5de3c7))


### Features

* added commandsDisabled & commandsPrefic ([ac3e330](https://github.com/MCBE-Utilities/BeAPI/commit/ac3e3300678bf731eba9cfe65427dfb880208fe7))
* **agent:** added destroy method ([8173936](https://github.com/MCBE-Utilities/BeAPI/commit/817393681c60b9517487195772222f82cf12d93f))
* **block:** added BlockType ([31a9513](https://github.com/MCBE-Utilities/BeAPI/commit/31a9513a3bf27230119cc797548f9cda03b58a78))
* **block:** added default methods ([8aec001](https://github.com/MCBE-Utilities/BeAPI/commit/8aec001f590b92f683b89a37a939ef6ccc204783))
* **block:** added getInventory ([62226a0](https://github.com/MCBE-Utilities/BeAPI/commit/62226a092b080e40580a2d87f2c7750d427c3780))
* **block:** added hasComponent ([6677a38](https://github.com/MCBE-Utilities/BeAPI/commit/6677a38514dda41a1547b64294103b9d2c6e1c00))
* **block:** added Permutation ([42ed8ba](https://github.com/MCBE-Utilities/BeAPI/commit/42ed8ba569657cbf5604ecf803a1daa052499b8e))
* **commandhandler:** added aliases, usage, and permissions ([a54b19e](https://github.com/MCBE-Utilities/BeAPI/commit/a54b19ea90f15a10b6ca4dcfcf4b70ceb62a8c28))
* **commandhandler:** new command handler ([a490bea](https://github.com/MCBE-Utilities/BeAPI/commit/a490bea44e3ae4e83dc555df85532a7a68ca042c))
* **commands:** start help command pipeline ([f7fed31](https://github.com/MCBE-Utilities/BeAPI/commit/f7fed3134e13e4d44057972db7053cc33dc1c287))
* **core:** added Block ([6c1998c](https://github.com/MCBE-Utilities/BeAPI/commit/6c1998ca9bb8ddff1e9c51d6acb5c3b7f0434555))
* **core:** added data module to manifest ([efa143f](https://github.com/MCBE-Utilities/BeAPI/commit/efa143ffd90490504014a7aa03b0ea9ca44ba782))
* **core:** added EntityInventory & BlockInventory ([a44c45e](https://github.com/MCBE-Utilities/BeAPI/commit/a44c45e727baa5aea1ebb7ada8289916ca41934e))
* **core:** added Item ([7998ec5](https://github.com/MCBE-Utilities/BeAPI/commit/7998ec5e4c814f8c67dbc9f12183fee6e8e325c2))
* **entities:** added getByIdentity ([aceffb2](https://github.com/MCBE-Utilities/BeAPI/commit/aceffb23c4b87173c0e9a8084c779d221297988d))
* **events:** added cancel to Lever event ([9aa4535](https://github.com/MCBE-Utilities/BeAPI/commit/9aa453539684b08842371ffbb2e618305be0acd1))
* **events:** added ChestOpened ([a8a319a](https://github.com/MCBE-Utilities/BeAPI/commit/a8a319a34de6c5bb0ccfae31954c078aca548ea2))
* **events:** added Lever event ([d4a26de](https://github.com/MCBE-Utilities/BeAPI/commit/d4a26de80499bf1261891e4f50d6eff3466020b2))
* **events:** added PlayerHurt & EntityHurt ([27fa454](https://github.com/MCBE-Utilities/BeAPI/commit/27fa4544e40a534db2dc9b54d73a51c7d7f674b9))
* **item:** added addEnchantment & removeEnchantment ([73a476f](https://github.com/MCBE-Utilities/BeAPI/commit/73a476f274f55c138c0df399c88ad10e8fd378d4))
* **item:** added getEnchantment ([deff0f2](https://github.com/MCBE-Utilities/BeAPI/commit/deff0f2785fd54ab31fa0d1dbe4c0d834de25eb1))
* **item:** added hasEnchantment ([119d36a](https://github.com/MCBE-Utilities/BeAPI/commit/119d36ae137327245ba484eaf710fe215c8d15d2))
* **player:** isGrounded ([868755e](https://github.com/MCBE-Utilities/BeAPI/commit/868755eb193fe3481d0fb2643ece48c008a22a00))
* removed deprecation warning helper ([602678d](https://github.com/MCBE-Utilities/BeAPI/commit/602678d0c6ec226c96df180353b10a2d96e383a8))
* **viewvector:** removes view vector events ([f059219](https://github.com/MCBE-Utilities/BeAPI/commit/f059219cc4734a03988440c3006dcc8e428e28e0))





# [2.3.0-beta.3](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@2.3.0-beta.2...beapi-core@2.3.0-beta.3) (2022-03-21)


### Bug Fixes

* **core:** updated types ([0cb5cf2](https://github.com/MCBE-Utilities/BeAPI/commit/0cb5cf252f59e9dcb36d91094c69030a5f09ebdd))
* **entity:** fixed teleport methods ([db1bb48](https://github.com/MCBE-Utilities/BeAPI/commit/db1bb4877eb4e1b950fc7ebf32755de5be1aae2f))
* **entity:** updated entity to use Objective ([a8d5ab5](https://github.com/MCBE-Utilities/BeAPI/commit/a8d5ab59402adf25a6704787adc1c7654f0fbdc5))
* **events:** fixed OnChat ([3a51905](https://github.com/MCBE-Utilities/BeAPI/commit/3a51905af67fab812eb261300b5802289d9c6502))
* **player:** fixed teleport methods ([9e6cf6a](https://github.com/MCBE-Utilities/BeAPI/commit/9e6cf6acf8bebb4dcb50561aca4e1c05d002fc73))
* **player:** updated player to use Objective ([87c1ddc](https://github.com/MCBE-Utilities/BeAPI/commit/87c1ddc7608358752cad71ef1b6c6c28b0c20ac0))


### Features

* **events:** added ActionFormCreated ([72cddf2](https://github.com/MCBE-Utilities/BeAPI/commit/72cddf2ea932771f6f6c72d223df9901a5e2ab43))
* **events:** added EntityScoreUpdated ([1b9bd4c](https://github.com/MCBE-Utilities/BeAPI/commit/1b9bd4c562ec6892259f3911da22d9ebec449b4d))
* **events:** added EntityTagsUpdated ([cb6c3cf](https://github.com/MCBE-Utilities/BeAPI/commit/cb6c3cfced898b7c7307fae4ca7a5ec9e557bae6))
* **events:** added MessageFormCreated ([63797a4](https://github.com/MCBE-Utilities/BeAPI/commit/63797a48cc53a8c3dfd091642ef68e19a7a9f152))
* **events:** added ModalFormCreated ([6f458e6](https://github.com/MCBE-Utilities/BeAPI/commit/6f458e62c779b4edf49aa50fa46afac63dac947c))
* **events:** added PlayerTagsUpdated ([433bb91](https://github.com/MCBE-Utilities/BeAPI/commit/433bb913e54dcbfc3fc4e78f19c9f9eb190e19a1))
* **events:** added ScoreUpdated ([33738fb](https://github.com/MCBE-Utilities/BeAPI/commit/33738fb03a2ba7d7bd7ec11c37f10605101f71d9))
* **player:** added getId ([1cef22d](https://github.com/MCBE-Utilities/BeAPI/commit/1cef22d8e55c3dfbcb6c2aadbbef2c60577be592))
* **scoreboards:** added ScoreboardManager ([2ef3cd2](https://github.com/MCBE-Utilities/BeAPI/commit/2ef3cd2b85533c746ca19b4866411210075a1f38))
* **world:** added createExplosion ([b2879c7](https://github.com/MCBE-Utilities/BeAPI/commit/b2879c7e78814dc33b087acb77a10d54e849e16b))





# [2.3.0-beta.2](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@2.3.0-beta.1...beapi-core@2.3.0-beta.2) (2022-03-07)


### Bug Fixes

* **core:** fixed module linker to support nested main import ([ed5b8cd](https://github.com/MCBE-Utilities/BeAPI/commit/ed5b8cd269538a5dc013839f382fc6bb62a7b912))





# [2.3.0-beta.1](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@2.3.0-beta.0...beapi-core@2.3.0-beta.1) (2022-03-05)


### Features

* **core:** added the abilty to include files for modules ([f7c75c0](https://github.com/MCBE-Utilities/BeAPI/commit/f7c75c09be15a210047217a11a6f95e9f80f0127))





# [2.3.0-beta.0](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@2.1.0...beapi-core@2.3.0-beta.0) (2022-03-05)


### Bug Fixes

* commandManager now tells you if a command doesnt exists ([cef2330](https://github.com/MCBE-Utilities/BeAPI/commit/cef2330abf0471b53a67c8137ad479b0d5b42169))
* **commands:** added args to the emitter ([ddeb7a8](https://github.com/MCBE-Utilities/BeAPI/commit/ddeb7a84a542ae5d9a5af7a697d0e87ece394a0a))
* **commands:** aliases no show "None" if undefined ([33eca56](https://github.com/MCBE-Utilities/BeAPI/commit/33eca5624f6496e7a9ac0d9828a360333d65b3f8))
* **commands:** registering a command now returns the command entry ([7afb38c](https://github.com/MCBE-Utilities/BeAPI/commit/7afb38c819405c5a17414e2938bd70f2b51f6173))
* **commands:** removed player from CommandTypes ([62d20a4](https://github.com/MCBE-Utilities/BeAPI/commit/62d20a486482c86c35926339f14f815a1ad4b13e))
* **core:** updated interfaces to match event ids ([789e081](https://github.com/MCBE-Utilities/BeAPI/commit/789e0817cfdd4e5b32a40f96264f76c22f12dea5))
* **core:** updated to latest typings ([a75970c](https://github.com/MCBE-Utilities/BeAPI/commit/a75970c69556cb2115dbd479f1cda0fb679a9d14))
* **database:** issue [#15](https://github.com/MCBE-Utilities/BeAPI/issues/15) ([60fa49f](https://github.com/MCBE-Utilities/BeAPI/commit/60fa49fc51d6181b5b8dc580e390b58a092dc267))
* **database:** serializer type checks ([7a1bbaa](https://github.com/MCBE-Utilities/BeAPI/commit/7a1bbaa3bf8320f2cb38937fa241fe6a2b37177e))
* **db:** fixed sync ([8fcfda0](https://github.com/MCBE-Utilities/BeAPI/commit/8fcfda04df3516119bbb8f38b498812fbc930f34))
* **entity:** added more components ([234bf73](https://github.com/MCBE-Utilities/BeAPI/commit/234bf7397e55ee4265751a8a28d477f5a61081de))
* **entity:** fixed getLocation ([2359b2a](https://github.com/MCBE-Utilities/BeAPI/commit/2359b2a7ec042f33c13a3b4189f93fd5cc32641e))
* **entity:** updated getDimensionName to use dimension id ([9718107](https://github.com/MCBE-Utilities/BeAPI/commit/97181071994c3d2128c44db108b531f02ab992aa))
* **entity:** updated removal process ([fb859ac](https://github.com/MCBE-Utilities/BeAPI/commit/fb859ac7d05ebd1de0e0d0a67a1cc7cefd3960a9))
* **entity:** updated teleportFacing ([474b95b](https://github.com/MCBE-Utilities/BeAPI/commit/474b95bf3a866941e9448230ba39e5fa046914c8))
* **entity:** updated update score methods to return new score ([b736b55](https://github.com/MCBE-Utilities/BeAPI/commit/b736b55a6a8bac31adb77d53fe4b205ea8156819))
* **errors:** whoops ([67165d4](https://github.com/MCBE-Utilities/BeAPI/commit/67165d4c7179d56de4501f389833c08c046167a4))
* **events:** added tool field to BlockHit ([d5dd093](https://github.com/MCBE-Utilities/BeAPI/commit/d5dd093e285268d75ae66857876ebfb7c7166a30))
* **events:** added weapon field EntityHit ([3e48ad2](https://github.com/MCBE-Utilities/BeAPI/commit/3e48ad268a080a88979af897d92585c19c63ff1b))
* **events:** added weapon field to PlayerHit ([d71a59f](https://github.com/MCBE-Utilities/BeAPI/commit/d71a59ff9eeaffb0fdb9e7d02a1147a00e36fd58))
* **events:** fixed ItemDropped ([9feef5b](https://github.com/MCBE-Utilities/BeAPI/commit/9feef5b8dc2853c05412fda1a097252e0054db2d))
* **events:** fixed ItemDropped ([9ee6777](https://github.com/MCBE-Utilities/BeAPI/commit/9ee67779dd66c9b299b9464b2e4a2ebc6b01c2c9))
* **events:** fixed ItemInteract typings ([95fc47c](https://github.com/MCBE-Utilities/BeAPI/commit/95fc47cbc2e31db25722b1a5d4ca818d16975cb8))
* **events:** fixed OnLeave ([a4b7d4c](https://github.com/MCBE-Utilities/BeAPI/commit/a4b7d4c4ee1b3673b72c5de221b95b988bb13056))
* **events:** renamed EntityAttacked & PlayerAttacked ([70f121b](https://github.com/MCBE-Utilities/BeAPI/commit/70f121ba77da01afc86bcdc7554fb39be330b8a3))
* **events:** updated BlockDestroyed ([238f071](https://github.com/MCBE-Utilities/BeAPI/commit/238f0715e32b6d5d3274ef24bd2c3fd8ccce09cc))
* **events:** updated BlockDestroyed ([9c05ec5](https://github.com/MCBE-Utilities/BeAPI/commit/9c05ec5fddb9b75a2aea354892b7ee77322f07a0))
* **events:** updated BlockDestroyed ([8129023](https://github.com/MCBE-Utilities/BeAPI/commit/812902376a8c6cb0a21e5428f33eebffa2925fa6))
* **events:** updated EntityAttacked & PlayerAttacked ([f04bb0a](https://github.com/MCBE-Utilities/BeAPI/commit/f04bb0a30497ef7e1b0aa012c70a28fafaaa865f))
* **events:** updated typings ([03ffb44](https://github.com/MCBE-Utilities/BeAPI/commit/03ffb44d3a9339e165c83456502a1d12bdcf8660))
* forms not ready for .10 ([3e7f3b2](https://github.com/MCBE-Utilities/BeAPI/commit/3e7f3b232c66040154b1b6e55d59a0155b576f85))
* **forms:** fixed typo ([b45642a](https://github.com/MCBE-Utilities/BeAPI/commit/b45642ae6863197e099fd01b6afec4a69335c275))
* **player:** fixed getLocation ([6a63a00](https://github.com/MCBE-Utilities/BeAPI/commit/6a63a00e7e61182fe98bf210e16b8f11d96abebf))
* **player:** fixed getName ([e351657](https://github.com/MCBE-Utilities/BeAPI/commit/e351657f63f783ea8de7adfd279953dc78c73bd0))
* **player:** fixed isAlive ([79d0803](https://github.com/MCBE-Utilities/BeAPI/commit/79d08034ce6e68dadf667efc8d26185abde30b1e))
* **player:** fixed isAlive & isSleeping ([9cb445a](https://github.com/MCBE-Utilities/BeAPI/commit/9cb445abd203f87652d4cb5799ab127ae1f8d1a7))
* **player:** fixed sendActionbar ([fc943b1](https://github.com/MCBE-Utilities/BeAPI/commit/fc943b1dfc326bf689c0cc3894e945ffdfcdb3dc))
* **player:** fixed sendMessage ([80abec7](https://github.com/MCBE-Utilities/BeAPI/commit/80abec72c73ff22768d4e48993d52d06e6ea7c88))
* **player:** fixed sendSubtitle ([6142fef](https://github.com/MCBE-Utilities/BeAPI/commit/6142fef0664ce7d97929e4809f4a3cbc7561386a))
* **player:** fixed sendTitle ([556f034](https://github.com/MCBE-Utilities/BeAPI/commit/556f034c00bf20815285170b9f12ff2108bb3a96))
* **player:** removed typo ([1424743](https://github.com/MCBE-Utilities/BeAPI/commit/14247431e2517060616150e36c327aff0cb9785d))
* **player:** teleport now uses the proper location interface ([31ab7bc](https://github.com/MCBE-Utilities/BeAPI/commit/31ab7bc6a8ffafde90348d530457f52e3d92b01f))
* **player:** updated getDimensionName to use dimension id ([da8f6a6](https://github.com/MCBE-Utilities/BeAPI/commit/da8f6a6a933d4aea5f1b2da627338b174a5f364c))
* **player:** updated removal process ([4910359](https://github.com/MCBE-Utilities/BeAPI/commit/4910359b7adf3bbb6449b2d073c44a824d665b24))
* **player:** updated score methods to return score ([bf4e66b](https://github.com/MCBE-Utilities/BeAPI/commit/bf4e66bde5878f99d7adbb43872a256f9700c037))
* **player:** updated teleportFacing ([8fbcf78](https://github.com/MCBE-Utilities/BeAPI/commit/8fbcf788dfbbdde6f9add495943d7a09d0fd2448))
* updated protocol ([747c9f0](https://github.com/MCBE-Utilities/BeAPI/commit/747c9f0cc47ab010b5aa1036f6fb0c98ac75eece))
* updated typings ([4cddaea](https://github.com/MCBE-Utilities/BeAPI/commit/4cddaeada89279a6b097b5579ece3f90415509dd))
* updated version and protocol ([f86e5e7](https://github.com/MCBE-Utilities/BeAPI/commit/f86e5e7f3fac42503a837fe8d47911ed29c9623c))
* **versions:** bump to production ([58f1b83](https://github.com/MCBE-Utilities/BeAPI/commit/58f1b83f3150cdc63c02ace31f1aa621acf38951))
* **world:** fixed sendMessage ([a3de2c7](https://github.com/MCBE-Utilities/BeAPI/commit/a3de2c70a60f39579e25fc49dcdd5d3dec45c177))
* **world:** fixed spawnItem ([d85d4bb](https://github.com/MCBE-Utilities/BeAPI/commit/d85d4bb42512866bf5d8fead4d5aba77255c9103))
* **world:** updated spawnEntity to use vanilla method ([ae33348](https://github.com/MCBE-Utilities/BeAPI/commit/ae3334810a5ab9e887859e3b36f2066ec7dff7b7))


### Features

* added Agent ([b280066](https://github.com/MCBE-Utilities/BeAPI/commit/b2800668c82dc3b9299abd776095c9c89bcb3d9b))
* beforecli version check ([f7d78dc](https://github.com/MCBE-Utilities/BeAPI/commit/f7d78dcf4566c46cf2820133d788130133876816))
* beforecli version check ([30ea67c](https://github.com/MCBE-Utilities/BeAPI/commit/30ea67c03ce0c7dc53797421dca436136c0a89a5))
* **commands:** added CommandTypes ([7653c1c](https://github.com/MCBE-Utilities/BeAPI/commit/7653c1c91c8156c66d12326ecf03d7ed0fcc1873))
* **commands:** added enabled property ([f0f642b](https://github.com/MCBE-Utilities/BeAPI/commit/f0f642b6e9e24a7504275679aa383b5b79346765))
* **commands:** added permissionTags to command options ([406bbf1](https://github.com/MCBE-Utilities/BeAPI/commit/406bbf1fe11f0c7a8c7a8880eb90a808231494fe))
* **commands:** new commandManager ([e9016fb](https://github.com/MCBE-Utilities/BeAPI/commit/e9016fb2953c640420ad95e784ab936437a3503a))
* **core:** added gametest module to the main core ([916fb7f](https://github.com/MCBE-Utilities/BeAPI/commit/916fb7f190b10efe41f4c9f2100d738550da59e2))
* **database:** update method ([8d224ad](https://github.com/MCBE-Utilities/BeAPI/commit/8d224ad7ff4258f76f7a83b6f52a026342a05005))
* **entities:** added getAllAsArray ([d274fdd](https://github.com/MCBE-Utilities/BeAPI/commit/d274fdda477fc382f4c34ad98b8c5b5f7e825112))
* **entities:** added getByUniqueId ([0ba958d](https://github.com/MCBE-Utilities/BeAPI/commit/0ba958da178fbc203605155b20cf061fffc0b607))
* **entity:** added addEffect ([6898fb8](https://github.com/MCBE-Utilities/BeAPI/commit/6898fb899b5506e9bdc6781c7c7ea46294c85253))
* **entity:** added addScore ([4ade74e](https://github.com/MCBE-Utilities/BeAPI/commit/4ade74e5e12e01a7ae3bbd28da731835d14f782b))
* **entity:** added getComponent ([f0ab24f](https://github.com/MCBE-Utilities/BeAPI/commit/f0ab24f01625fa9c59187c8ad2ad5a419e2390f2))
* **entity:** added getEffect ([5666383](https://github.com/MCBE-Utilities/BeAPI/commit/56663832857c1c7d22393ad7904f3fd08b5b0dfd))
* **entity:** added getRotation and getHeadLocation ([aec3c69](https://github.com/MCBE-Utilities/BeAPI/commit/aec3c6985d32b03f214fd2e8d6602fc12282e7af))
* **entity:** added getScore ([d874bfd](https://github.com/MCBE-Utilities/BeAPI/commit/d874bfd108a7706e544c571ccaedb1d0c9381974))
* **entity:** added getUniqueId ([f0d84e2](https://github.com/MCBE-Utilities/BeAPI/commit/f0d84e24f1d0db68be9ce3d8ec498fe5ed2448a5))
* **entity:** added getVelocity & setVelocity ([4221572](https://github.com/MCBE-Utilities/BeAPI/commit/4221572b2c01707a24c5ea14508072783027f557))
* **entity:** added hasComponent ([b609936](https://github.com/MCBE-Utilities/BeAPI/commit/b609936c1c8d74e6776db7a2603a433780e7f84c))
* **entity:** added isSneaking ([8fc7099](https://github.com/MCBE-Utilities/BeAPI/commit/8fc7099f75716844d24fafc14fe87f9e39225e91))
* **entity:** added removeScore ([6484fd5](https://github.com/MCBE-Utilities/BeAPI/commit/6484fd5fbecc5c3745c0dde9f65ec71e1cbc3f07))
* **entity:** added setNameTag ([97aecb6](https://github.com/MCBE-Utilities/BeAPI/commit/97aecb63cdd1a27e213495ab7827eb0b195332c0))
* **entity:** added setScore ([13014fd](https://github.com/MCBE-Utilities/BeAPI/commit/13014fd5f422f3d68330f9bd5524ac39a8fd7f75))
* **entity:** added teleport ([9ab2a3f](https://github.com/MCBE-Utilities/BeAPI/commit/9ab2a3fb2b296f1b2fd0246ba6b662411b32988f))
* **entity:** added triggerEvent ([925f4e2](https://github.com/MCBE-Utilities/BeAPI/commit/925f4e2ced367e32d501e68ed82ef91766101d69))
* **events:** added BlockHit ([3f75272](https://github.com/MCBE-Utilities/BeAPI/commit/3f7527220a03ae59259952cef80762c841cd1139))
* **events:** added CommandRegistered ([5b2781f](https://github.com/MCBE-Utilities/BeAPI/commit/5b2781f52e6bea2b86041c78055da5b13e2c39b6))
* **events:** added CommandUsed ([da847e8](https://github.com/MCBE-Utilities/BeAPI/commit/da847e83e412755a0bc16b07cd809854f5ece786))
* **events:** added Death and Respawn ([56e8390](https://github.com/MCBE-Utilities/BeAPI/commit/56e8390416ac4683e54b8320c731e5695dc3a89d))
* **events:** added Death and Respawn ([4414bce](https://github.com/MCBE-Utilities/BeAPI/commit/4414bce8abf0c0217d2f346e2242e21bcb56545d))
* **events:** added EffectAdded ([fbbe904](https://github.com/MCBE-Utilities/BeAPI/commit/fbbe904263d70ad814b3450c6ad0a36410a057a3))
* **events:** added EntityEventTrigger ([3d765f9](https://github.com/MCBE-Utilities/BeAPI/commit/3d765f92ba1f8d85eaae51f7d0bb5d15da8437e9))
* **events:** added ItemDropped ([2a0bba0](https://github.com/MCBE-Utilities/BeAPI/commit/2a0bba07d873530b7a7a0d5987efd164b82c1fa8))
* **events:** added ItemEvent ([b8a1bc9](https://github.com/MCBE-Utilities/BeAPI/commit/b8a1bc95203f66346c8dadaa80cf7bc1b1a9b450))
* **events:** added ItemEventTrigger ([ba0263a](https://github.com/MCBE-Utilities/BeAPI/commit/ba0263ae6d9f89b37473d69af6db17f4492026e3))
* **events:** added Piston ([a909ab8](https://github.com/MCBE-Utilities/BeAPI/commit/a909ab8a82b8f5c36e7365437c62fee48cd81606))
* **events:** added PlayerEventTrigger ([58059da](https://github.com/MCBE-Utilities/BeAPI/commit/58059daf18b60ae8f78d6681a48b65f3fb77f3a8))
* **events:** added WeatherUpdated ([de0dd47](https://github.com/MCBE-Utilities/BeAPI/commit/de0dd474d8bfe8c2b9521496b10c506d85687a2b))
* **player:** add getTotalEmptySlots ([6ab3799](https://github.com/MCBE-Utilities/BeAPI/commit/6ab3799072c588643ab00e338ac44f1eb4c55c14))
* **player:** added addEffect ([67a2732](https://github.com/MCBE-Utilities/BeAPI/commit/67a2732d5615595fdd87be5f713d51ebd6665f9b))
* **player:** added addScore ([1ef43f0](https://github.com/MCBE-Utilities/BeAPI/commit/1ef43f04f46b977fe569d95c20e67e5b6f004299))
* **player:** added addXpFloat ([e6b14cf](https://github.com/MCBE-Utilities/BeAPI/commit/e6b14cff278e23b9885723ccba0115dc722f8000))
* **player:** added addXpLevel ([fd1a813](https://github.com/MCBE-Utilities/BeAPI/commit/fd1a813216b1bc0fbfd90ded7333154dba743599))
* **player:** added createForms ([2b4c970](https://github.com/MCBE-Utilities/BeAPI/commit/2b4c97071e0fb8ba9b536064af713787ccfbf752))
* **player:** added executeFunction ([b2cf071](https://github.com/MCBE-Utilities/BeAPI/commit/b2cf071f9be96cda4c57788568af8ffa7633fa49))
* **player:** added getComponent ([3c7f269](https://github.com/MCBE-Utilities/BeAPI/commit/3c7f269b3ed0468bf171d6c68de185ecc3403e43))
* **player:** added getEffect ([4a71ef8](https://github.com/MCBE-Utilities/BeAPI/commit/4a71ef8423dd4cfe2bc0f304748a90d3b93510ee))
* **player:** added getInventorySize ([0f08a0b](https://github.com/MCBE-Utilities/BeAPI/commit/0f08a0bee664294165ebf7c63042a84df53fa5ef))
* **player:** added getItem ([1e976f5](https://github.com/MCBE-Utilities/BeAPI/commit/1e976f5ad936ea86fad061855786101a519e4db1))
* **player:** added getItemCooldown ([5e385e8](https://github.com/MCBE-Utilities/BeAPI/commit/5e385e88c31c3b730dd99870b7273af26ebbabb4))
* **player:** added getRotation & getHeadLocation ([b70449a](https://github.com/MCBE-Utilities/BeAPI/commit/b70449af423ad37908cb8399cfbe46fab02ba36e))
* **player:** added getVelocity & setVelocity ([cde4743](https://github.com/MCBE-Utilities/BeAPI/commit/cde4743bd5fedf616c95abb476c645f28cb81945))
* **player:** added getXp ([99b7926](https://github.com/MCBE-Utilities/BeAPI/commit/99b79267e6f154b82ab9767a9f92e972f2f623b2))
* **player:** added hasComponent ([4ffafb4](https://github.com/MCBE-Utilities/BeAPI/commit/4ffafb4705d0db763bb19439a309ef415c3eee51))
* **player:** added isAlive ([62ad6b8](https://github.com/MCBE-Utilities/BeAPI/commit/62ad6b8f60cbc3b8b0a7320f06d4531f71c19874))
* **player:** added isBurning ([e43d151](https://github.com/MCBE-Utilities/BeAPI/commit/e43d1518f34d7ce28ed684674320ceb56992a2d2))
* **player:** added isInWater ([ef9a3e2](https://github.com/MCBE-Utilities/BeAPI/commit/ef9a3e261a3f77e65ecd9dab43c49276afc8680e))
* **player:** added isLanded ([b55d822](https://github.com/MCBE-Utilities/BeAPI/commit/b55d822ff16bceeb78746c101af21bc1f3888ab2))
* **player:** added isMoving ([61b67f1](https://github.com/MCBE-Utilities/BeAPI/commit/61b67f15df1cee91b02b723b7dec5ec4e486b5af))
* **player:** added isMuted ([178b181](https://github.com/MCBE-Utilities/BeAPI/commit/178b181eabb15d9a57966bba68c46d0732a44168))
* **player:** added isRiding ([3359cf9](https://github.com/MCBE-Utilities/BeAPI/commit/3359cf975c5039db1c1d145544201ad95bbe406c))
* **player:** added isSleeping ([98a1f90](https://github.com/MCBE-Utilities/BeAPI/commit/98a1f90bdbc6893b57975c71f9abae523e31fa98))
* **player:** added isSneaking ([87bb8a3](https://github.com/MCBE-Utilities/BeAPI/commit/87bb8a3df52d54ee262d347abbfb6935ead54b10))
* **player:** added isSprinting ([d14013f](https://github.com/MCBE-Utilities/BeAPI/commit/d14013fed0928fdd143e3a883ae68a54e71d4163))
* **player:** added isSwimming ([6765d5c](https://github.com/MCBE-Utilities/BeAPI/commit/6765d5c89b68fb6851f43c71bec08872a4617023))
* **player:** added removeScore ([69bf962](https://github.com/MCBE-Utilities/BeAPI/commit/69bf962380583e6e2b658b3c709188801a2810aa))
* **player:** added removeXpLevel ([425481b](https://github.com/MCBE-Utilities/BeAPI/commit/425481b4c9c1aa2a8e1d5cc15a3e25e2e99da059))
* **player:** added sendActionbar ([1ef4e34](https://github.com/MCBE-Utilities/BeAPI/commit/1ef4e344dbfa0d6f5ec14d024611114c31badd7b))
* **player:** added sendAnimation ([4ea6454](https://github.com/MCBE-Utilities/BeAPI/commit/4ea64546ae01e767ec6ab476c1c3dc592849d482))
* **player:** added sendFog ([33a39f3](https://github.com/MCBE-Utilities/BeAPI/commit/33a39f3ed9232f40304946368c55b619ed5007d7))
* **player:** added sendSound ([7d06347](https://github.com/MCBE-Utilities/BeAPI/commit/7d06347c83bdcc3c8f80704eed6d7f071e125399))
* **player:** added sendSubtitle ([907437e](https://github.com/MCBE-Utilities/BeAPI/commit/907437ec16e96dbd6564cad018b6666007254e50))
* **player:** added sendTitle ([4111a35](https://github.com/MCBE-Utilities/BeAPI/commit/4111a35976d04e79064f0444deea7fc786b0d194))
* **player:** added setGamemode ([1349a78](https://github.com/MCBE-Utilities/BeAPI/commit/1349a78eb37fea31bd569d19544ae89f278ddbbf))
* **player:** added setItem ([c36864a](https://github.com/MCBE-Utilities/BeAPI/commit/c36864ad2615f3b1abaeb3e3e052c08e20674947))
* **player:** added setItemCooldown ([48c63a0](https://github.com/MCBE-Utilities/BeAPI/commit/48c63a02a75d4e754a00839b106c1269b4b479c0))
* **player:** added setNameTag ([0fc3ae6](https://github.com/MCBE-Utilities/BeAPI/commit/0fc3ae6e77d5cb5528129603bc1bcd2ccdff1772))
* **player:** added setSpawnPoint ([3bbfac8](https://github.com/MCBE-Utilities/BeAPI/commit/3bbfac8bcb56e71a02a7a39df0b10a9566715578))
* **player:** added shakeCamera ([8d2f9e5](https://github.com/MCBE-Utilities/BeAPI/commit/8d2f9e5f5c246a432e1f62f06ca988c294718bd9))
* **player:** added teleport ([4b1b8ec](https://github.com/MCBE-Utilities/BeAPI/commit/4b1b8ec947c807963c9c904048beb41da0a1d270))
* **player:** added triggerEvent ([6540295](https://github.com/MCBE-Utilities/BeAPI/commit/65402953c611d904fc423d4625eae045ae896573))
* **players:** added getAllAsArray ([bc22919](https://github.com/MCBE-Utilities/BeAPI/commit/bc22919b4a3d48239af34e863839a8ab574c51ef))
* **players:** added setScore ([4553742](https://github.com/MCBE-Utilities/BeAPI/commit/45537429f99ef7bc09cabc8bc763adc32c0986e7))
* **utils:** added getEnchantments ([5e165f5](https://github.com/MCBE-Utilities/BeAPI/commit/5e165f5ab72bc846c8c4907f0c7cf72d1969d578))
* **world:** added getBlock ([4747859](https://github.com/MCBE-Utilities/BeAPI/commit/4747859f96de77c71f4676f68a7645dcf86911c5))
* **world:** added getEntitiesFromLocation ([b08e404](https://github.com/MCBE-Utilities/BeAPI/commit/b08e40428de965d78192de001dc9300d12110492))
* **world:** added getPlayersFromLocation ([e9dbe3b](https://github.com/MCBE-Utilities/BeAPI/commit/e9dbe3b2051752deb7bb0bb73163f98bff6d82d6))
* **world:** added getTime ([35dac80](https://github.com/MCBE-Utilities/BeAPI/commit/35dac80d12523951363360f51651c83cf6d83887))
* **world:** added getWeather ([6c9eae5](https://github.com/MCBE-Utilities/BeAPI/commit/6c9eae50c8242112dc92a2bdd8a29de761b13f8c))
* **world:** added setBlock ([e3b6553](https://github.com/MCBE-Utilities/BeAPI/commit/e3b655333b7f6e4d247b57e66449eb4c65fbf5d9))
* **world:** added setDifficulty ([ab162e5](https://github.com/MCBE-Utilities/BeAPI/commit/ab162e574a1cb992bd486b413776828e19abc92b))
* **world:** added setTime ([1da95e0](https://github.com/MCBE-Utilities/BeAPI/commit/1da95e0f8a874e96cb6965fa48ef8e3bfbb9ac68))
* **world:** added setWeather ([e18356c](https://github.com/MCBE-Utilities/BeAPI/commit/e18356c340750581c838932bf2671276042069ab))
* **world:** added spawnItem ([4e1745e](https://github.com/MCBE-Utilities/BeAPI/commit/4e1745e87d703db5a3ed1d4895ad178b8a1a648a))
* **world:** added spawnParticle ([1084803](https://github.com/MCBE-Utilities/BeAPI/commit/10848034861539c58d03f69deccde6f63b3078c9))
* **world:** getDimension ([7e3d15b](https://github.com/MCBE-Utilities/BeAPI/commit/7e3d15b417927b0c37d795e450a67d8982a4b097))


### Reverts

* even two branches out ([c7e815e](https://github.com/MCBE-Utilities/BeAPI/commit/c7e815ec3f4da5fa82ce26d29b668ae0e98032fb))





# [2.1.0](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@2.0.1...beapi-core@2.1.0) (2022-01-17)


### Bug Fixes

* **actor:** fix getDimensionName logic ([f71974b](https://github.com/MCBE-Utilities/BeAPI/commit/f71974b116eca32cbfc87e8fcae2b89976a225fc))
* **actor:** updated getDimensionName logic ([bee5488](https://github.com/MCBE-Utilities/BeAPI/commit/bee5488bca8175ee6725b7a124eae6de83c07f46))
* **core:** linker for orgs ([ee509af](https://github.com/MCBE-Utilities/BeAPI/commit/ee509affdf12fe812059df7ff16c1feb00a9e9b3))
* **utils:** added dimension field for runCommand ([d309804](https://github.com/MCBE-Utilities/BeAPI/commit/d309804d44723ba936be886f4789548d4cbf0b76))


### Features

* **events:** added Explosion ([be77378](https://github.com/MCBE-Utilities/BeAPI/commit/be7737808c45b4bd3cd381779db178c423bd97e4))





## [2.0.1](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@2.0.0...beapi-core@2.0.1) (2022-01-17)


### Bug Fixes

* **core:** global var ([9e72b9e](https://github.com/MCBE-Utilities/BeAPI/commit/9e72b9ee78d86ebb7d63b13674ef22b2dc9257a1))
* spelling errors ([6e8475b](https://github.com/MCBE-Utilities/BeAPI/commit/6e8475b1f65e07e6ae29f0e10874779b5d2fc081))





# [2.0.0](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@1.5.0...beapi-core@2.0.0) (2022-01-16)


### Bug Fixes

* **cli:** alternative moduless imports ([78c2480](https://github.com/MCBE-Utilities/BeAPI/commit/78c248041466015bc8e5a4080f56b8b5d15abeb4))
* **cli:** when in doubt, add a \n ([2e0d596](https://github.com/MCBE-Utilities/BeAPI/commit/2e0d5966c6b2571a68852b68601927d5fd806416))
* **events:** blockDestroyed now returns the broken block ([38b0a7a](https://github.com/MCBE-Utilities/BeAPI/commit/38b0a7aa9466fdf370c46f6b4e2e7f0a30ce96f2))
* remove old source & update exports ([97c88af](https://github.com/MCBE-Utilities/BeAPI/commit/97c88afb8a1935a4844ecb48338a7a60c074daa5))


### Features

* **actor:** added getInventory and getHealth ([7ce10d1](https://github.com/MCBE-Utilities/BeAPI/commit/7ce10d1e8ac3ff6b84be51199b6c12f930009876))
* **database:** update database structures ([dda2ed2](https://github.com/MCBE-Utilities/BeAPI/commit/dda2ed2f14d0d1f8d002778e252658ea558745e6))
* **events:** added EnteredWater ([bf9ab2e](https://github.com/MCBE-Utilities/BeAPI/commit/bf9ab2ebbbc41db2dc4d133d305e9a3ea0dc2d1f))
* **events:** added EntityAttacked ([2c47f61](https://github.com/MCBE-Utilities/BeAPI/commit/2c47f61fc4be28b8fec3b96b48e28c1ed9689e8a))
* **events:** added EntityInViewVector ([ce41bf5](https://github.com/MCBE-Utilities/BeAPI/commit/ce41bf579c82cb9612f7a00b08dd23c7fe1b4958))
* **events:** added EntityTag ([19fb9ba](https://github.com/MCBE-Utilities/BeAPI/commit/19fb9ba6dc466a92b71e3754e98efd6d216eec76))
* **events:** added ExitedWater ([32e208c](https://github.com/MCBE-Utilities/BeAPI/commit/32e208cf9c3dfb7987af40b623a5e0019227e6e0))
* **events:** added Jump ([4f8a9c9](https://github.com/MCBE-Utilities/BeAPI/commit/4f8a9c9942a7bcf32ffac896f90424a81a9933f4))
* **events:** added Landed ([6ed081b](https://github.com/MCBE-Utilities/BeAPI/commit/6ed081b74be51eead2f18835eb4f63c91b3d3f1f))
* **events:** added PlayerAttacked ([882d5ca](https://github.com/MCBE-Utilities/BeAPI/commit/882d5ca63ab606caa3fddd4e3ec65c381b433df9))
* **events:** added PlayerInViewVector ([133ef09](https://github.com/MCBE-Utilities/BeAPI/commit/133ef09777f7e913897a9ab98a92ca9c182646d3))
* **events:** added PlayerTag ([682bc39](https://github.com/MCBE-Utilities/BeAPI/commit/682bc39446c86bdc8f909d30ae016f2fcf77d853))
* **events:** added StartedBurning ([7fc4ad4](https://github.com/MCBE-Utilities/BeAPI/commit/7fc4ad47a2be4ba2dc402d5fde25f489bcf3906e))
* **events:** added StartedMoving ([f0418cb](https://github.com/MCBE-Utilities/BeAPI/commit/f0418cb318e4846661b583f3b6c85ec8fda0a27b))
* **events:** added StartedRiding ([1731ef1](https://github.com/MCBE-Utilities/BeAPI/commit/1731ef156c38572a6af69b73c4df8663e4f033da))
* **events:** added StartedSleeping ([bad9132](https://github.com/MCBE-Utilities/BeAPI/commit/bad91324b9e156b9a5b714d816ac585cc24843db))
* **events:** added StartedSneaking ([a4f4c78](https://github.com/MCBE-Utilities/BeAPI/commit/a4f4c7863ef0b91b58bce4b90296394afcd79069))
* **events:** added StartedSprinting ([de8eff4](https://github.com/MCBE-Utilities/BeAPI/commit/de8eff4e65fc106171f2288895958c329f3413f7))
* **events:** added StartedSwimming ([f091d32](https://github.com/MCBE-Utilities/BeAPI/commit/f091d324ed914d8eb134bc462425784ac5f6bd0e))
* **events:** added StoppedBurning ([b166872](https://github.com/MCBE-Utilities/BeAPI/commit/b166872e309793be73f1104c2f4fce4ec7d8092f))
* **events:** added StoppedMoving ([a3da081](https://github.com/MCBE-Utilities/BeAPI/commit/a3da0818e19648e962f9acfe50708b8cffd29ce1))
* **events:** added StoppedRiding ([53cb5ce](https://github.com/MCBE-Utilities/BeAPI/commit/53cb5cef7bcdb58f8315154dce951b66246b1dce))
* **events:** added StoppedSleeping ([0f0ee8e](https://github.com/MCBE-Utilities/BeAPI/commit/0f0ee8ecb543bce3ebfb97538e3f502224fe83b8))
* **events:** added StoppedSneaking ([42ee92f](https://github.com/MCBE-Utilities/BeAPI/commit/42ee92f1372e74f1c9c423d6a262e4d07e9c041f))
* **events:** added StoppedSprinting ([515da87](https://github.com/MCBE-Utilities/BeAPI/commit/515da872d41a7298c1ac6d712e8c91732cd71b6f))
* **events:** added StoppedSwimming ([93dccbc](https://github.com/MCBE-Utilities/BeAPI/commit/93dccbc2bf3375b625fd47e0187772c298b1d6a2))
* **events:** added Swing ([60599fb](https://github.com/MCBE-Utilities/BeAPI/commit/60599fb69046a48381333a8d9280d42ea3f0c887))
* **player:** added getSelectedSlot ([f2b2fc6](https://github.com/MCBE-Utilities/BeAPI/commit/f2b2fc6051ef5248d3aff2b0199fecc37029a34e))
* **player:** added kick ([2fc0cf1](https://github.com/MCBE-Utilities/BeAPI/commit/2fc0cf16ae5906428adcd1ac19bedc79af2d2bc0))





# [1.5.0](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@1.4.0...beapi-core@1.5.0) (2022-01-09)


### Bug Fixes

* **commands:** typo ([e4a02d9](https://github.com/MCBE-Utilities/BeAPI/commit/e4a02d9bd12898de17408ba0e4cca122c8c50fce))
* **core:** added comments ([f690e16](https://github.com/MCBE-Utilities/BeAPI/commit/f690e1645d433d856e8d1fce07448d52d0cc364e))
* **core:** module linker ([01718ad](https://github.com/MCBE-Utilities/BeAPI/commit/01718ad3535234136b5a71c5eab762c1a5a41582))
* **database:** mount methods ([72f1772](https://github.com/MCBE-Utilities/BeAPI/commit/72f177256d97a8c30d63d592b94cfe08276d7b2c))
* **database:** mount now creates database if not exists ([e051dd8](https://github.com/MCBE-Utilities/BeAPI/commit/e051dd88fe3522889589ee49347d4b893fd9a253))
* **database:** options interface ([9d83508](https://github.com/MCBE-Utilities/BeAPI/commit/9d835089624c39f9b3b196f6c5a42a8477814680))
* **emitter:** event emitter completely redone (was ugly) ([e511196](https://github.com/MCBE-Utilities/BeAPI/commit/e511196f2c514bb55cd8a7ac8f1c6baa66ad5494))
* **emitter:** listener spelt wrong ([7806968](https://github.com/MCBE-Utilities/BeAPI/commit/7806968f494dbe7928fbb5f338ceba0d79de3256))
* **eventemitter:** reduce memory leak to a log warn rather than error ([7cc6317](https://github.com/MCBE-Utilities/BeAPI/commit/7cc6317d4fcdb3730a6da1961e2ea8bb49721279))
* **eventemitter:** typo ([539ad94](https://github.com/MCBE-Utilities/BeAPI/commit/539ad94f54242c8fd4f5b5195e3cd0cdadb49bc1))
* **eventmanager:** emit ([c744a04](https://github.com/MCBE-Utilities/BeAPI/commit/c744a043e67cdd5723d13456d8b5d34b4ae59546))
* module linker ([359c673](https://github.com/MCBE-Utilities/BeAPI/commit/359c673360cd50347ec83414c65bd3a44670fd5d))
* **typings:** exported wrongly ([d32664b](https://github.com/MCBE-Utilities/BeAPI/commit/d32664b63308498cdf538de58647e45b0563851a))
* **version:** updated protocol ([bd65d52](https://github.com/MCBE-Utilities/BeAPI/commit/bd65d5232b25829128df8e8c27af242f52e4b752))


### Features

* **core:** added ability to use external moduled ([e56e20b](https://github.com/MCBE-Utilities/BeAPI/commit/e56e20b0a8e577ea9fd7d17afc1ef35aeb2df3b0))





# [1.4.0](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@1.3.0...beapi-core@1.4.0) (2022-01-02)


### Bug Fixes

* **database:** fixed getEntries ([1c2fb4c](https://github.com/MCBE-Utilities/BeAPI/commit/1c2fb4c79d9fb88bdbcb5c17849404af48e44949))
* **database:** fixed mounting issues ([e9a685e](https://github.com/MCBE-Utilities/BeAPI/commit/e9a685ec6453f5a2e070a1004cc81df674215fe3))
* **events:** canceling BlockPlaced works now ([5336399](https://github.com/MCBE-Utilities/BeAPI/commit/53363997b7e9244969c0939a9cbec6b3f4449ed2))


### Features

* **commands:** added the ability to create multiple command managers ([319978d](https://github.com/MCBE-Utilities/BeAPI/commit/319978d30830a86bb844eda832be1a0d99bf12e2))





# [1.3.0](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@1.2.1...beapi-core@1.3.0) (2021-12-31)


### Bug Fixes

* **events:** entityattacked ([bd559f2](https://github.com/MCBE-Utilities/BeAPI/commit/bd559f23b72324dd5f10cfe175dd4352a4ae1025))
* moved uuidv4 to utils ([39a2e50](https://github.com/MCBE-Utilities/BeAPI/commit/39a2e50b4b9c761e40cdd7a5811e57f321a1e6eb))
* **player:** added getPreviousEntityViewVector ([84de6b8](https://github.com/MCBE-Utilities/BeAPI/commit/84de6b8f3bee84a5a76b9d3f73d92f2f07439213))
* **types:** added PlayerSneak & PlayerUnsneak ([ebe5be6](https://github.com/MCBE-Utilities/BeAPI/commit/ebe5be6a168eee07bca7b50e3ac02da63d41a5f2))


### Features

* **events:** added EntityAttacked ([d533e62](https://github.com/MCBE-Utilities/BeAPI/commit/d533e624ee44bad02545a8cf6dd77fe2681d812b))
* **events:** added EntityInViewVector ([561b1ee](https://github.com/MCBE-Utilities/BeAPI/commit/561b1ee80bca3b3d48b7d80788337600247ee33c))
* **events:** added PlayerAttacked ([87edb52](https://github.com/MCBE-Utilities/BeAPI/commit/87edb528876b0c2c8058fc82cf611d896244f818))
* **events:** added PlayerExitWater ([fa4c66a](https://github.com/MCBE-Utilities/BeAPI/commit/fa4c66a358b7f0d680ba3dbcc08adcc9236eed9c))
* **events:** added PlayerInViewVector ([30b6589](https://github.com/MCBE-Utilities/BeAPI/commit/30b658979bfbfb34b632f033505231ee9eae212c))
* **events:** added PlayerInWater ([fcc525b](https://github.com/MCBE-Utilities/BeAPI/commit/fcc525b60fbcd91b5d515ba7e14cc8b3657ad9ac))
* **events:** added PlayerIsMoving ([d3d08ad](https://github.com/MCBE-Utilities/BeAPI/commit/d3d08ad080383602b3dda4309a525bfcbbf5067c))
* **events:** added PlayerIsRiding ([4698cc9](https://github.com/MCBE-Utilities/BeAPI/commit/4698cc916a19ca9a2545d0ea3107db6c967829d9))
* **events:** added PlayerIsSprinting ([1672a60](https://github.com/MCBE-Utilities/BeAPI/commit/1672a602a999f5954e2370197a63a9d97028f52f))
* **events:** added PlayerIsSwimming ([d8e76f9](https://github.com/MCBE-Utilities/BeAPI/commit/d8e76f9e253897f7e3df277678c19a7fad4fd83a))
* **events:** added PlayerJump ([67b5045](https://github.com/MCBE-Utilities/BeAPI/commit/67b5045c8cc803c57a69f853e905d54bbc146a6f))
* **events:** added PlayerLanded ([6d90f19](https://github.com/MCBE-Utilities/BeAPI/commit/6d90f193d6a5e28db1ed39603be663e802904a57))
* **events:** added PlayerOffFire ([fd4c609](https://github.com/MCBE-Utilities/BeAPI/commit/fd4c609281ca90d91dbeebc4fed174686d6318b7))
* **events:** added PlayerOnFire ([ede0cb8](https://github.com/MCBE-Utilities/BeAPI/commit/ede0cb885186b24922221614ad5e13f4774c016f))
* **events:** added PlayerSleep ([4ca1860](https://github.com/MCBE-Utilities/BeAPI/commit/4ca18602c0f9ed90572762afb849bdeaf1e1a6ff))
* **events:** added PlayerSneak ([6d97f9a](https://github.com/MCBE-Utilities/BeAPI/commit/6d97f9a1738a965fc9f0d93e95b269d471bd7d5f))
* **events:** added PlayerStoppedMoving ([9df00fc](https://github.com/MCBE-Utilities/BeAPI/commit/9df00fca438d8c161476fff576a2d21dc66cef0b))
* **events:** added PlayerStoppedRiding ([a4bf238](https://github.com/MCBE-Utilities/BeAPI/commit/a4bf238267fbb7ef566e4e29d8e92363046e5262))
* **events:** added PlayerStoppedSprinting ([9d3a01a](https://github.com/MCBE-Utilities/BeAPI/commit/9d3a01a8651b50fc543404c301ae68679d1d6a25))
* **events:** added PlayerStoppedSwimming ([bb3e64b](https://github.com/MCBE-Utilities/BeAPI/commit/bb3e64badf474ec991a145d6539ed434064a2c38))
* **events:** added PlayerSwing ([cab929a](https://github.com/MCBE-Utilities/BeAPI/commit/cab929a80770ba401e9fb920e6b5f9c74774e6c4))
* **events:** added PlayerUnsneak ([73d43ae](https://github.com/MCBE-Utilities/BeAPI/commit/73d43ae2fd9d1debe2a305b42b861be517ea7fe5))
* **events:** added PlayerWake ([bb07913](https://github.com/MCBE-Utilities/BeAPI/commit/bb07913b9285a380c115516a88a44ad67119cc30))





## [1.2.1](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@1.2.0...beapi-core@1.2.1) (2021-12-30)


### Bug Fixes

* module linker ([d78af8c](https://github.com/MCBE-Utilities/BeAPI/commit/d78af8c5344d4b3cd7dc6151f18f0a64aadcc1e7))





# [1.2.0](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@1.1.1...beapi-core@1.2.0) (2021-12-30)


### Bug Fixes

* beapi build command & update templates ([ac0e7de](https://github.com/MCBE-Utilities/BeAPI/commit/ac0e7de4840aa71a294d0e663978046ac6aae4e6))
* **version:** beapi version now reads from the package.json ([ce0ac03](https://github.com/MCBE-Utilities/BeAPI/commit/ce0ac03e0e5d5e92c25f05bf8ef063768bae23be))


### Features

* bundle script ([39e9eaa](https://github.com/MCBE-Utilities/BeAPI/commit/39e9eaa4b6fcbed393df50ecd2fbe325fa3b6cc0))





## [1.1.1](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@1.1.0...beapi-core@1.1.1) (2021-12-30)


### Bug Fixes

* **messages:** cancel message now works again ([0c4c7c4](https://github.com/MCBE-Utilities/BeAPI/commit/0c4c7c43438accda5adc10b0c44ed5ac68e5bbe8))
* **players:** playerLeft event now removes player from the players map ([c7f0a05](https://github.com/MCBE-Utilities/BeAPI/commit/c7f0a053de5e9fea3cd0d62611b1c52689034ac9))
* protocol version ([221b1f1](https://github.com/MCBE-Utilities/BeAPI/commit/221b1f1ed4ca2137e38784867eede62a586d4c76))





# [1.1.0](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@1.0.4...beapi-core@1.1.0) (2021-12-30)


### Features

* build generates uuids for manifest ([fc3d8bd](https://github.com/MCBE-Utilities/BeAPI/commit/fc3d8bd2949d8ec84f981f4d6f129720297999e2))





## [1.0.4](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@1.0.3...beapi-core@1.0.4) (2021-12-30)


### Bug Fixes

* bin typo ([84def31](https://github.com/MCBE-Utilities/BeAPI/commit/84def31ec718858a083f5368a73a10a8d368f0ea))





## [1.0.3](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@1.0.2...beapi-core@1.0.3) (2021-12-30)

**Note:** Version bump only for package beapi-core





## [1.0.2](https://github.com/MCBE-Utilities/BeAPI/compare/beapi-core@1.0.1...beapi-core@1.0.2) (2021-12-29)

**Note:** Version bump only for package beapi-core





## 1.0.1 (2021-12-29)


### Bug Fixes

* configs ([a69b7b5](https://github.com/MCBE-Utilities/BeAPI/commit/a69b7b5eea04baab5865c6df4b5b27d7910f2e32))
* configs ([0b5d8ff](https://github.com/MCBE-Utilities/BeAPI/commit/0b5d8ff3e2a1ef1ffdc1a4930dada2ff47c914d7))
