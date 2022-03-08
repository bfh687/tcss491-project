const level1 = {
  map: { path: "./sprites/map/level_1.png", width: 3216, height: 1760 },
  props: [
    { x: 608, y: 128, type: "pillar1" },
    { x: 5216, y: 512, type: "pillar1" },
    { x: 5152, y: 1216, type: "pillar1" },
    { x: 3104, y: 1152, type: "pillar1" },
    { x: 3552, y: 1344, type: "pillar1" },
    { x: 672, y: 1984, type: "pillar1" },
    { x: 928, y: 192, type: "pillar2" },
    { x: 3168, y: 1472, type: "pillar2" },
    { x: 5600, y: 1472, type: "pillar2" },
    { x: 5664, y: 576, type: "pillar2" },
    { x: 3552, y: 1152, type: "pillar2" },
    { x: 1184, y: 2432, type: "pillar2" },
    { x: 288, y: 1728, type: "smallrock1" },
    { x: 480, y: 1856, type: "smallrock6" },
    { x: 4448, y: 2560, type: "smallrock6" },
    { x: 3872, y: 1600, type: "smallrock5" },
    { x: 3680, y: 1408, type: "smallrock3" },
    { x: 5344, y: 192, type: "smallrock6" },
    { x: 5344, y: 320, type: "smallrock5" },
    { x: 5216, y: 384, type: "smallrock3" },
    { x: 672, y: 256, type: "smallrock3" },
    { x: 3488, y: 2240, type: "smallrock3" },
    { x: 1696, y: 512, type: "smallrock3" },
    { x: 1568, y: 1920, type: "smallrock1" },
    { x: 480, y: 2752, type: "smallrock1" },
    { x: 608, y: 384, type: "smallrock4" },
    { x: 2016, y: 768, type: "smallrock4" },
    { x: 544, y: 1664, type: "smallrock4" },
    { x: 352, y: 1984, type: "smallrock3" },
    { x: 736, y: 2048, type: "smallrock6" },
    { x: 1504, y: 1984, type: "smallrock6" },
    { x: 1184, y: 2112, type: "smallrock3" },
    { x: 1568, y: 2176, type: "smallrock4" },
    { x: 1120, y: 2304, type: "smallrock3" },
    { x: 5920, y: 1856, type: "smallrock3" },
    { x: 1760, y: 2112, type: "smallrock5" },
    { x: 2912, y: 3008, type: "smallrock5" },
    { x: 6112, y: 1920, type: "smallrock5" },
    { x: 672, y: 2624, type: "smallrock6" },
    { x: 2400, y: 1792, type: "smallrock6" },
    { x: 5984, y: 2048, type: "smallrock6" },
    { x: 672, y: 2816, type: "smallrock4" },
    { x: 3104, y: 2624, type: "smallrock4" },
    { x: 3488, y: 2560, type: "smallrock2" },
    { x: 864, y: 320, type: "bigrock" },
    { x: 3296, y: 2112, type: "bigrock" },
    { x: 4320, y: 1920, type: "bigrock" },
    { x: 352, y: 1728, type: "bigrock" },
    { x: 544, y: 2688, type: "bigrock" },
    { x: 1632, y: 1984, type: "bigrock" },
    { x: 352, y: 576, type: "bigrock" },
    { x: 3808, y: 1408, type: "bigrock" },
    { x: 3296, y: 2688, type: "bigrock" },
    { x: 2528, y: 1856, type: "bigrock" },
    { x: 1440, y: 576, type: "bigrock" },
    { x: 2528, y: 3008, type: "bigrock" },
    { x: 2912, y: 2752, type: "bigrock" },
    { x: 4960, y: 2432, type: "bigrock" },
    { x: 4704, y: 2432, type: "bigrock" },
    { x: 6048, y: 1984, type: "bigrock" },
    { x: 5536, y: 256, type: "bigrock" },
    { x: 2144, y: 2496, type: "bigrock" },
    { x: 1056, y: 256, type: "barrel" },
    { x: 4064, y: 1920, type: "barrel" },
    { x: 480, y: 1216, type: "barrel" },
    { x: 1824, y: 2624, type: "barrel" },
    { x: 1824, y: 2368, type: "barrel" },
    { x: 5152, y: 2112, type: "barrel" },
    { x: 5664, y: 2048, type: "barrel" },
    { x: 2016, y: 2240, type: "barrel" },
    { x: 2080, y: 2688, type: "barrel" },
    { x: 1120, y: 2112, type: "barrel" },
    { x: 1440, y: 2880, type: "barrel" },
    { x: 1888, y: 2048, type: "barrel" },
    { x: 544, y: 1216, type: "vase1" },
    { x: 2144, y: 2752, type: "vase2" },
    { x: 2592, y: 2752, type: "vase2" },
    { x: 480, y: 1344, type: "vase2" },
    { x: 5792, y: 2176, type: "vase2" },
    { x: 1120, y: 320, type: "box" },
    { x: 3872, y: 1920, type: "box" },
    { x: 1760, y: 320, type: "box" },
    { x: 2656, y: 2688, type: "box" },
    { x: 736, y: 2240, type: "box" },
    { x: 1120, y: 2496, type: "box" },
    { x: 2208, y: 1600, type: "grave" },
    { x: 2336, y: 1664, type: "grave" },
    { x: 4000, y: 2112, type: "tombstone1" },
    { x: 4448, y: 2048, type: "tombstone3" },
    { x: 2528, y: 1984, type: "tombstone2" },
    { x: 6112, y: 1152, type: "tombstone2" },
    { x: 3488, y: 2048, type: "tombstone2" },
    { x: 5792, y: 960, type: "tombstone2" },
    { x: 4896, y: 832, type: "tombstone2" },
    { x: 5088, y: 896, type: "tombstone2" },
    { x: 2784, y: 2112, type: "tombstone2" },
    { x: 3040, y: 2048, type: "tombstone2" },
    { x: 3232, y: 2176, type: "tombstone2" },
    { x: 464 * 2, y: 1120 * 2, type: "well" }, // Left Well
    { x: 1647 * 2, y: 672 * 2, type: "well" }, // Center Well
    { x: 2672 * 2, y: 704 * 2, type: "well" }, // Right Well
  ],
  foilage: [
    { x: 864, y: 256, type: "medbush" },
    { x: 5600, y: 640, type: "medbush" },
    { x: 5664, y: 320, type: "medbush" },
    { x: 5536, y: 384, type: "medbush" },
    { x: 5280, y: 256, type: "medbush" },
    { x: 4064, y: 2112, type: "medbush" },
    { x: 4384, y: 2048, type: "medbush" },
    { x: 2976, y: 2112, type: "medbush" },
    { x: 3104, y: 2176, type: "smallbush" },
    { x: 480, y: 1536, type: "medbush" },
    { x: 352, y: 2112, type: "medbush" },
    { x: 2464, y: 3008, type: "medbush" },
    { x: 6112, y: 1600, type: "medbush" },
    { x: 4768, y: 2624, type: "medbush" },
    { x: 4640, y: 2432, type: "medbush" },
    { x: 1376, y: 576, type: "smallbush" },
    { x: 2208, y: 640, type: "smallbush" },
    { x: 2976, y: 1472, type: "smallbush" },
    { x: 288, y: 256, type: "bigtree" },
    { x: 2336, y: 896, type: "bigtree" },
    { x: 4576, y: 1344, type: "bigtree" },
    { x: 4192, y: 1280, type: "bigtree" },
    { x: 4640, y: 704, type: "bigtree" },
    { x: 4832, y: 576, type: "bigtree" },
    { x: 5088, y: 640, type: "bigtree" },
    { x: 6048, y: 1600, type: "bigtree" },
    { x: 2592, y: 448, type: "bigtree" },
    { x: 3040, y: 384, type: "bigtree" },
    { x: 3616, y: 640, type: "bigtree" },
    { x: 1376, y: 896, type: "bigtree" },
    { x: 5920, y: 896, type: "bigtree" },
    { x: 5792, y: 576, type: "bigtree" },
    { x: 5792, y: 704, type: "medtree" },
    { x: 1056, y: 320, type: "bigtree" },
    { x: 416, y: 448, type: "bigtree" },
    { x: 160, y: 1792, type: "bigtree" },
    { x: 1440, y: 320, type: "bigtree" },
    { x: 1568, y: 192, type: "bigtree" },
    { x: 3744, y: 2432, type: "bigtree" },
    { x: 5216, y: 2880, type: "bigtree" },
    { x: 5344, y: 2880, type: "bigtree" },
    { x: 1952, y: 384, type: "bigtree" },
    { x: 1888, y: 960, type: "bigtree" },
    { x: 5600, y: 2752, type: "bigtree" },
    { x: 5664, y: 2560, type: "bigtree" },
    { x: 5536, y: 2624, type: "bigtree" },
    { x: 4896, y: 2176, type: "bigtree" },
    { x: 1824, y: 1152, type: "bigtree" },
    { x: 1888, y: 1408, type: "bigtree" },
    { x: 5984, y: 1280, type: "bigtree" },
    { x: 3872, y: 1792, type: "bigtree" },
    { x: 4448, y: 1856, type: "bigtree" },
    { x: 1888, y: 256, type: "medtree" },
    { x: 5664, y: 384, type: "medtree" },
    { x: 3808, y: 1664, type: "medtree" },
    { x: 3872, y: 1920, type: "medtree" },
    { x: 4384, y: 1728, type: "medtree" },
    { x: 672, y: 2304, type: "medtree" },
    { x: 5536, y: 2816, type: "medtree" },
    { x: 5728, y: 1728, type: "medtree" },
    { x: 6176, y: 1408, type: "medtree" },
    { x: 2976, y: 320, type: "medtree" },
    { x: 3552, y: 512, type: "medtree" },
    { x: 4384, y: 1408, type: "medtree" },
    { x: 4448, y: 1152, type: "medtree" },
    { x: 2528, y: 1216, type: "medtree" },
    { x: 1312, y: 1408, type: "medtree" },
    { x: 4832, y: 2304, type: "medtree" },
    { x: 4256, y: 2368, type: "medtree" },
    { x: 1568, y: 1536, type: "medtree" },
    { x: 3424, y: 2816, type: "medtree" },
    { x: 2528, y: 2752, type: "medtree" },
    { x: 2784, y: 2752, type: "medtree" },
    { x: 4576, y: 640, type: "medtree" },
    { x: 544, y: 2112, type: "smalltree" },
    { x: 4512, y: 768, type: "smalltree" },
    { x: 5664, y: 128, type: "smalltree" },
    { x: 5088, y: 448, type: "smalltree" },
    { x: 3488, y: 2560, type: "smalltree" },
    { x: 5472, y: 2688, type: "smalltree" },
    { x: 2656, y: 2688, type: "smalltree" },
    { x: 1248, y: 1984, type: "smalltree" },
    { x: 2912, y: 2688, type: "smalltree" },
    { x: 1376, y: 1088, type: "smalltree" },
    { x: 1120, y: 2176, type: "bigtree" },
    { x: 352, y: 1216, type: "smalltree" },
    { x: 608, y: 1408, type: "smalltree" },
    { x: 864, y: 1024, type: "smalltree" },
    { x: 1184, y: 960, type: "medtree" },
    { x: 736, y: 1856, type: "bigtree" },
    { x: 1760, y: 2176, type: "bigtree" },
    { x: 1824, y: 2304, type: "bigtree" },
    { x: 2528, y: 1088, type: "bigtree" },
    { x: 2528, y: 1664, type: "bigtree" },
    { x: 2784, y: 1856, type: "bigtree" },
    { x: 2912, y: 1792, type: "bigtree" },
    { x: 3040, y: 1920, type: "bigtree" },
    { x: 3232, y: 1856, type: "bigtree" },
    { x: 2592, y: 2880, type: "bigtree" },
    { x: 5088, y: 64, type: "bigtree" },
    { x: 5536, y: 0, type: "bigtree" },
    { x: 2656, y: 2560, type: "bigtree" },
    { x: 3168, y: 832, type: "bigtree" },
    { x: 2592, y: 1856, type: "smalltree" },
    { x: 2720, y: 1152, type: "smalltree" },
    { x: 2016, y: 2240, type: "smalltree" },
    { x: 2720, y: 1792, type: "medtree" },
    { x: 1696, y: 2432, type: "medtree" },
  ],
  signs: [
    { x: 928, y: 640, type: "eastsign", dialogue: ["Shop to the east..."] },
    {
      x: 2912,
      y: 512,
      type: "slab2",
      dialogue: [
        "This land was once occupied by humans and what they called pets...",
        "but as they all passed, all that remained was a shell of what once was...",
        "cursed to roam the land for eternity...",
      ],
    },
    {
      x: 3296,
      y: 384,
      type: "slab3",
      dialogue: ["Neighboring towns were no longer safe...", "and so they prayed that a hero would come to cleanse what was left..."],
    },
    { x: 3488, y: 576, type: "slab1", dialogue: ["That hero never came...", "and they may never, but still they hoped..."] },
    { x: 5664, y: 896, type: "slab1", dialogue: ["Here lies the graves of those who have failed to pass..."] },
    { x: 2272, y: 2752, type: "eastsign", dialogue: ["This way..."] },
    { x: 2464, y: 2752, type: "westsign", dialogue: ["This way..."] },
    { x: 5216, y: 960, type: "slab2", dialogue: ["Boss ahead...", "Are you sure you're ready?"] },
    { x: 5536, y: 832, type: "slab2", dialogue: ["One last chance to turn back..."] },
    {
      x: 5344,
      y: 768,
      type: "slab3",
      dialogue: ["For thousands of years challengers have faced the Minotaur...", "For thousands of years the Minotaur has gone undefeated..."],
    },
  ],
  shops: [
    { x: 1760, y: 320 },
    { x: 4128, y: 1792 },
  ],
  bounding_boxes: [
    { x: 544, y: 193, width: 14, height: 448 },
    { x: 1042, y: 193, width: 14, height: 448 },
    { x: 736, y: 512, width: 14, height: 192 },
    { x: 852, y: 512, width: 14, height: 192 },
    { x: 544, y: 193, width: 512, height: 14 },
    { x: 544, y: 512, width: 192, height: 14 },
    { x: 544, y: 627, width: 192, height: 14 },
    { x: 864, y: 512, width: 192, height: 14 },
    { x: 864, y: 627, width: 192, height: 14 },
    { x: 288, y: 512, width: 14, height: 704 },
    { x: 352, y: 320, width: 14, height: 192 },
    { x: 1170, y: 320, width: 14, height: 160 },
    { x: 1232, y: 477, width: 14, height: 115.2 },
    { x: 1377, y: 515, width: 14, height: 64 },
    { x: 1559, y: 396, width: 14, height: 128 },
    { x: 2066, y: 396, width: 14, height: 192 },
    { x: 2194, y: 569, width: 14, height: 83.2 },
    { x: 2848, y: 450, width: 14, height: 192 },
    { x: 3410, y: 450, width: 14, height: 137.6 },
    { x: 3666, y: 576, width: 14, height: 204.8 },
    { x: 3858, y: 768, width: 14, height: 140.8 },
    { x: 3986, y: 900, width: 14, height: 73.6 },
    { x: 4242, y: 960, width: 14, height: 73.6 },
    { x: 4450, y: 900, width: 14, height: 135.04 },
    { x: 4620, y: 810, width: 14, height: 100.48 },
    { x: 4832, y: 700, width: 14, height: 121.6 },
    { x: 4962, y: 514, width: 14, height: 198.4 },
    { x: 5024, y: 384, width: 14, height: 137.6 },
    { x: 5090, y: 256, width: 14, height: 633.6 },
    { x: 5154, y: 192, width: 14, height: 377.6 },
    { x: 5776, y: 192, width: 14, height: 377.6 },
    { x: 5408, y: 450, width: 14, height: 188.8 },
    { x: 5522, y: 450, width: 14, height: 188.8 },
    { x: 5842, y: 256, width: 14, height: 633.6 },
    { x: 5408, y: 770, width: 14, height: 188.8 },
    { x: 5522, y: 770, width: 14, height: 188.8 },
    { x: 5904, y: 384, width: 14, height: 416 },
    { x: 5970, y: 792, width: 14, height: 179.2 },
    { x: 6096, y: 962, width: 14, height: 204.8 },
    { x: 6160, y: 1154, width: 14, height: 140.8 },
    { x: 6226, y: 1282, width: 14, height: 268.8 },
    { x: 6288, y: 1544, width: 14, height: 320 },
    { x: 6226, y: 1858, width: 14, height: 435.2 },
    { x: 5920, y: 2050, width: 14, height: 250.88 },
    { x: 5970, y: 2300, width: 14, height: 268.8 },
    { x: 5904, y: 2566, width: 14, height: 320 },
    { x: 5776, y: 2880, width: 14, height: 268.8 },
    { x: 5584, y: 3136, width: 14, height: 192 },
    { x: 3874, y: 3136, width: 14, height: 64 },
    { x: 3424, y: 3006, width: 14, height: 134.4 },
    { x: 3538, y: 2562, width: 14, height: 64 },
    { x: 3474, y: 2626, width: 14, height: 374.4 },
    { x: 3616, y: 2562, width: 14, height: 185.6 },
    { x: 3730, y: 2562, width: 14, height: 185.6 },
    { x: 3546, y: 2672, width: 14, height: 78.08 },
    { x: 3854, y: 2496, width: 14, height: 185.6 },
    { x: 4384, y: 2496, width: 14, height: 320 },
    { x: 4882, y: 2432, width: 14, height: 380.8 },
    { x: 4816, y: 2308, width: 14, height: 134.4 },
    { x: 4946, y: 2242, width: 14, height: 204.16 },
    { x: 5072, y: 2114, width: 14, height: 233.6 },
    { x: 5138, y: 2050, width: 14, height: 188.8 },
    { x: 5200, y: 1986, width: 14, height: 188.8 },
    { x: 5408, y: 1986, width: 14, height: 188.8 },
    { x: 5524, y: 1984, width: 14, height: 188.8 },
    { x: 5730, y: 1984, width: 14, height: 188.8 },
    { x: 4962, y: 1794, width: 14, height: 201.6 },
    { x: 4770, y: 1666, width: 14, height: 128 },
    { x: 4770, y: 1988, width: 14, height: 71.04 },
    { x: 4602, y: 1988, width: 14, height: 71.04 },
    { x: 4432, y: 1924, width: 14, height: 71.04 },
    { x: 4368, y: 1856, width: 14, height: 71.04 },
    { x: 4022, y: 1856, width: 14, height: 71.04 },
    { x: 3808, y: 1924, width: 14, height: 211.2 },
    { x: 3872, y: 2114, width: 14, height: 204.8 },
    { x: 3666, y: 2242, width: 14, height: 64 },
    { x: 3600, y: 2114, width: 14, height: 140.8 },
    { x: 3408, y: 1984, width: 14, height: 140.8 },
    { x: 2810, y: 1856, width: 14, height: 140.8 },
    { x: 2512, y: 1730, width: 14, height: 140.8 },
    { x: 2450, y: 1664, width: 14, height: 70.4 },
    { x: 2144, y: 1664, width: 14, height: 70.4 },
    { x: 2000, y: 1664, width: 14, height: 70.4 },
    { x: 1936, y: 1472, width: 14, height: 206.72 },
    { x: 2064, y: 1152, width: 14, height: 352 },
    { x: 2192, y: 1024, width: 14, height: 192 },
    { x: 2442, y: 962, width: 14, height: 192 },
    { x: 2592, y: 962, width: 14, height: 256 },
    { x: 2528, y: 1216, width: 14, height: 332.8 },
    { x: 2706, y: 1474, width: 14, height: 64 },
    { x: 2850, y: 1474, width: 14, height: 204.8 },
    { x: 3490, y: 1664, width: 14, height: 128 },
    { x: 3984, y: 1344, width: 14, height: 448 },
    { x: 4390, y: 1344, width: 14, height: 192 },
    { x: 4640, y: 1474, width: 14, height: 192 },
    { x: 3088, y: 2816, width: 14, height: 64 },
    { x: 3234, y: 2816, width: 14, height: 64 },
    { x: 3024, y: 2882, width: 14, height: 192 },
    { x: 2832, y: 3072, width: 14, height: 192 },
    { x: 2528, y: 2942, width: 14, height: 204.8 },
    { x: 2658, y: 3136, width: 14, height: 128 },
    { x: 2720, y: 2626, width: 14, height: 326.4 },
    { x: 2320, y: 3072, width: 14, height: 192 },
    { x: 1696, y: 3136, width: 14, height: 192 },
    { x: 1056, y: 2944, width: 14, height: 192 },
    { x: 480, y: 2496, width: 14, height: 448 },
    { x: 416, y: 2434, width: 14, height: 64 },
    { x: 288, y: 2240, width: 14, height: 195.2 },
    { x: 224, y: 1992, width: 14, height: 256 },
    { x: 288, y: 1664, width: 14, height: 342.4 },
    { x: 416, y: 1324, width: 14, height: 352 },
    { x: 464, y: 1152, width: 14, height: 172.8 },
    { x: 914, y: 1090, width: 14, height: 186.88 },
    { x: 1056, y: 1090, width: 14, height: 186.88 },
    { x: 1170, y: 1090, width: 14, height: 186.88 },
    { x: 1232, y: 1026, width: 14, height: 187.52 },
    { x: 1376, y: 1026, width: 14, height: 380.8 },
    { x: 1440, y: 1282, width: 14, height: 251.52 },
    { x: 1570, y: 1408, width: 14, height: 380.8 },
    { x: 1632, y: 1664, width: 14, height: 320 },
    { x: 1760, y: 1856, width: 14, height: 192 },
    { x: 1824, y: 1922, width: 14, height: 188.8 },
    { x: 1952, y: 1984, width: 14, height: 332.8 },
    { x: 1760, y: 2304, width: 14, height: 384 },
    { x: 1888, y: 2560, width: 14, height: 192 },
    { x: 2336, y: 2624, width: 14, height: 192 },
    { x: 2450, y: 2624, width: 14, height: 192 },
    { x: 285, y: 510, width: 80, height: 14 },
    { x: 360, y: 320, width: 192, height: 14 },
    { x: 1055, y: 320, width: 128, height: 14 },
    { x: 1170, y: 479, width: 76.8, height: 14 },
    { x: 1233, y: 578, width: 156.8, height: 14 },
    { x: 1373, y: 510, width: 192, height: 14 },
    { x: 1560, y: 385, width: 512, height: 14 },
    { x: 2066, y: 577, width: 144, height: 14 },
    { x: 2195, y: 640, width: 665.6, height: 14 },
    { x: 2846, y: 450, width: 576, height: 14 },
    { x: 3410, y: 576, width: 268.8, height: 14 },
    { x: 3666, y: 772, width: 204.8, height: 14 },
    { x: 3858, y: 896, width: 134.4, height: 14 },
    { x: 3986, y: 960, width: 262.4, height: 14 },
    { x: 4242, y: 1022, width: 217.6, height: 14 },
    { x: 4450, y: 898, width: 172.8, height: 14 },
    { x: 4620, y: 810, width: 224, height: 14 },
    { x: 4832, y: 700, width: 140.8, height: 14 },
    { x: 4962, y: 514, width: 75.52, height: 14 },
    { x: 5024, y: 384, width: 76.8, height: 14 },
    { x: 5090, y: 256, width: 76.8, height: 14 },
    { x: 5154, y: 192, width: 640, height: 14 },
    { x: 5154, y: 450, width: 262.4, height: 14 },
    { x: 5522, y: 450, width: 262.4, height: 14 },
    { x: 5158, y: 560, width: 256, height: 14 },
    { x: 5534, y: 560, width: 256, height: 14 },
    { x: 5092, y: 768, width: 326.4, height: 14 },
    { x: 5522, y: 768, width: 326.4, height: 14 },
    { x: 5780, y: 256, width: 76.8, height: 14 },
    { x: 5092, y: 878, width: 320, height: 14 },
    { x: 5534, y: 878, width: 320, height: 14 },
    { x: 5856, y: 384, width: 64, height: 14 },
    { x: 5904, y: 792, width: 76.8, height: 14 },
    { x: 5970, y: 962, width: 128, height: 14 },
    { x: 6096, y: 1154, width: 83.2, height: 14 },
    { x: 6162, y: 1282, width: 83.2, height: 14 },
    { x: 6226, y: 1544, width: 83.2, height: 14 },
    { x: 6226, y: 1858, width: 83.2, height: 14 },
    { x: 5922, y: 2178, width: 320, height: 14 },
    { x: 5926, y: 2288, width: 320, height: 14 },
    { x: 5904, y: 2560, width: 64, height: 14 },
    { x: 5776, y: 2880, width: 128, height: 14 },
    { x: 5584, y: 3136, width: 192, height: 14 },
    { x: 3876, y: 3200, width: 1792, height: 14 },
    { x: 3424, y: 3136, width: 462.72, height: 14 },
    { x: 3538, y: 2562, width: 91.52, height: 14 },
    { x: 3474, y: 2626, width: 76.8, height: 14 },
    { x: 3234, y: 2880, width: 249.6, height: 14 },
    { x: 3474, y: 2736, width: 76.8, height: 14 },
    { x: 3538, y: 2672, width: 91.52, height: 14 },
    { x: 3424, y: 2990, width: 64, height: 14 },
    { x: 3732, y: 2562, width: 128, height: 14 },
    { x: 3732, y: 2562, width: 134.4, height: 14 },
    { x: 3732, y: 2672, width: 134.4, height: 14 },
    { x: 3854, y: 2496, width: 537.6, height: 14 },
    { x: 3854, y: 2608, width: 537.6, height: 14 },
    { x: 4384, y: 2688, width: 512, height: 14 },
    { x: 4384, y: 2802, width: 505.6, height: 14 },
    { x: 4818, y: 2432, width: 134.4, height: 14 },
    { x: 4816, y: 2304, width: 134.4, height: 14 },
    { x: 4946, y: 2242, width: 137.6, height: 14 },
    { x: 5138, y: 2050, width: 64, height: 14 },
    { x: 5200, y: 1986, width: 221.76, height: 14 },
    { x: 5072, y: 2226, width: 70.4, height: 14 },
    { x: 5144, y: 2162, width: 67.2, height: 14 },
    { x: 5072, y: 2114, width: 67.2, height: 14 },
    { x: 4944, y: 2334, width: 128, height: 14 },
    { x: 5208, y: 2096, width: 201.6, height: 14 },
    { x: 5534, y: 2096, width: 201.6, height: 14 },
    { x: 5534, y: 1984, width: 207.36, height: 14 },
    { x: 5732, y: 2048, width: 200.32, height: 14 },
    { x: 5732, y: 2160, width: 200.32, height: 14 },
    { x: 4770, y: 1792, width: 204.48, height: 14 },
    { x: 4770, y: 1986, width: 204.48, height: 14 },
    { x: 4602, y: 2048, width: 179.2, height: 14 },
    { x: 4434, y: 1986, width: 179.2, height: 14 },
    { x: 4370, y: 1922, width: 70.4, height: 14 },
    { x: 3808, y: 1922, width: 227.52, height: 14 },
    { x: 4020, y: 1858, width: 352, height: 14 },
    { x: 3808, y: 2112, width: 78.72, height: 14 },
    { x: 3666, y: 2306, width: 208, height: 14 },
    { x: 3600, y: 2242, width: 70.4, height: 14 },
    { x: 3408, y: 2112, width: 192, height: 14 },
    { x: 2810, y: 1984, width: 576, height: 14 },
    { x: 2514, y: 1856, width: 384, height: 14 },
    { x: 2450, y: 1730, width: 64, height: 14 },
    { x: 2144, y: 1664, width: 320, height: 14 },
    { x: 2000, y: 1728, width: 158.08, height: 14 },
    { x: 1938, y: 1666, width: 60.8, height: 14 },
    { x: 1938, y: 1472, width: 128, height: 14 },
    { x: 2064, y: 1152, width: 140.8, height: 14 },
    { x: 2192, y: 1024, width: 275.2, height: 14 },
    { x: 2442, y: 962, width: 153.6, height: 14 },
    { x: 2528, y: 1218, width: 78.08, height: 14 },
    { x: 2528, y: 1538, width: 192, height: 14 },
    { x: 2706, y: 1474, width: 156.8, height: 14 },
    { x: 2850, y: 1664, width: 651.52, height: 14 },
    { x: 3490, y: 1730, width: 512, height: 14 },
    { x: 3984, y: 1344, width: 416, height: 14 },
    { x: 4390, y: 1474, width: 256, height: 14 },
    { x: 4640, y: 1664, width: 134.4, height: 14 },
    { x: 3088, y: 2816, width: 160, height: 14 },
    { x: 3024, y: 2882, width: 76.8, height: 14 },
    { x: 2832, y: 3072, width: 204.8, height: 14 },
    { x: 2528, y: 2942, width: 204.8, height: 14 },
    { x: 2540, y: 3136, width: 131.2, height: 14 },
    { x: 2658, y: 3202, width: 176, height: 14 },
    { x: 2320, y: 3072, width: 211.2, height: 14 },
    { x: 1696, y: 3200, width: 640, height: 14 },
    { x: 1056, y: 3136, width: 640, height: 14 },
    { x: 480, y: 2944, width: 576, height: 14 },
    { x: 416, y: 2496, width: 64, height: 14 },
    { x: 288, y: 2434, width: 134.4, height: 14 },
    { x: 224, y: 2240, width: 64, height: 14 },
    { x: 224, y: 1992, width: 64, height: 14 },
    { x: 288, y: 1664, width: 140.8, height: 14 },
    { x: 416, y: 1324, width: 64, height: 14 },
    { x: 288, y: 1218, width: 192, height: 14 },
    { x: 464, y: 1152, width: 448, height: 14 },
    { x: 464, y: 1264, width: 460.8, height: 14 },
    { x: 914, y: 1090, width: 155.52, height: 14 },
    { x: 914, y: 1200, width: 147.2, height: 14 },
    { x: 1186, y: 1200, width: 57.6, height: 14 },
    { x: 1186, y: 1090, width: 57.6, height: 14 },
    { x: 1232, y: 1026, width: 157.44, height: 14 },
    { x: 1232, y: 1134, width: 147.2, height: 14 },
    { x: 1376, y: 1282, width: 64, height: 14 },
    { x: 1376, y: 1392, width: 64, height: 14 },
    { x: 1442, y: 1408, width: 140.8, height: 14 },
    { x: 1444, y: 1522, width: 134.4, height: 14 },
    { x: 1570, y: 1664, width: 64, height: 14 },
    { x: 1570, y: 1776, width: 64, height: 14 },
    { x: 1632, y: 1856, width: 142.08, height: 14 },
    { x: 1632, y: 1970, width: 142.08, height: 14 },
    { x: 1760, y: 1922, width: 78.08, height: 14 },
    { x: 1760, y: 2034, width: 78.08, height: 14 },
    { x: 1824, y: 1984, width: 128, height: 14 },
    { x: 1824, y: 2098, width: 128, height: 14 },
    { x: 1760, y: 2304, width: 204.8, height: 14 },
    { x: 1760, y: 2560, width: 137.6, height: 14 },
    { x: 1760, y: 2674, width: 137.6, height: 14 },
    { x: 1888, y: 2624, width: 462.08, height: 14 },
    { x: 1888, y: 2738, width: 448, height: 14 },
    { x: 2450, y: 2624, width: 281.6, height: 14 },
    { x: 2450, y: 2738, width: 281.6, height: 14 },
  ],
};

const level1boss = {
  map: { path: "./sprites/map/bossroom.png", width: 800, height: 1312 },
  props: [
    { x: 256, y: 1088, type: "bigrock" },
    { x: 1088, y: 1216, type: "bigrock" },
    { x: 384, y: 128, type: "bigrock" },
    { x: 1280, y: 896, type: "smallrock6" },
    { x: 1024, y: 128, type: "smallrock4" },
    { x: 256, y: 320, type: "smallrock3" },
  ],
  foilage: [
    { x: 384, y: 960, type: "medtree" },
    { x: 448, y: 1792, type: "bigtree" },
    { x: 512, y: 1664, type: "bigtree" },
    { x: 832, y: 1280, type: "bigtree" },
    { x: 1024, y: 64, type: "bigtree" },
    { x: 1152, y: 128, type: "bigtree" },
    { x: 1152, y: 448, type: "bigtree" },
    { x: 384, y: 1024, type: "bigtree" },
    { x: 1216, y: 896, type: "bigtree" },
    { x: 192, y: 0, type: "bigtree" },
    { x: 64, y: 128, type: "bigtree" },
    { x: 128, y: 704, type: "bigtree" },
    { x: 832, y: 1408, type: "medtree" },
    { x: 1152, y: 960, type: "medtree" },
    { x: 1280, y: 576, type: "medtree" },
    { x: 128, y: 832, type: "medtree" },
    { x: 896, y: 1920, type: "smallbush" },
    { x: 576, y: 2112, type: "medbush" },
    { x: 960, y: 1728, type: "medbush" },
    { x: 640, y: 1536, type: "medbush" },
  ],
  signs: [],
  shops: [],
  bounding_boxes: [
    { x: 642, y: 2370, width: 14, height: 192 },
    { x: 944, y: 2176, width: 14, height: 326.4 },
    { x: 576, y: 2050, width: 14, height: 326.4 },
    { x: 642, y: 1922, width: 14, height: 128 },
    { x: 706, y: 1600, width: 14, height: 334.08 },
    { x: 880, y: 1984, width: 14, height: 198.4 },
    { x: 944, y: 1792, width: 14, height: 198.4 },
    { x: 1008, y: 1536, width: 14, height: 256 },
    { x: 816, y: 1346, width: 14, height: 192 },
    { x: 642, y: 1536, width: 14, height: 70.4 },
    { x: 576, y: 1346, width: 14, height: 192 },
    { x: 514, y: 1282, width: 14, height: 70.4 },
    { x: 448, y: 1216, width: 14, height: 70.4 },
    { x: 258, y: 1152, width: 14, height: 70.4 },
    { x: 194, y: 212, width: 14, height: 960 },
    { x: 308, y: 130, width: 14, height: 96 },
    { x: 1330, y: 130, width: 14, height: 332.8 },
    { x: 1392, y: 448, width: 14, height: 844.8 },
    { x: 1202, y: 1280, width: 14, height: 70.4 },
    { x: 642, y: 2498, width: 316.8, height: 14 },
    { x: 576, y: 2368, width: 80, height: 14 },
    { x: 576, y: 2050, width: 80, height: 14 },
    { x: 642, y: 1922, width: 76.8, height: 14 },
    { x: 880, y: 2178, width: 76.8, height: 14 },
    { x: 944, y: 1792, width: 76.8, height: 14 },
    { x: 880, y: 1984, width: 76.8, height: 14 },
    { x: 816, y: 1536, width: 192, height: 14 },
    { x: 816, y: 1346, width: 400, height: 14 },
    { x: 642, y: 1600, width: 64, height: 14 },
    { x: 576, y: 1536, width: 70.4, height: 14 },
    { x: 514, y: 1346, width: 70.4, height: 14 },
    { x: 448, y: 1282, width: 70.4, height: 14 },
    { x: 258, y: 1216, width: 192, height: 14 },
    { x: 194, y: 1152, width: 64, height: 14 },
    { x: 194, y: 212, width: 128, height: 14 },
    { x: 308, y: 130, width: 1024, height: 14 },
    { x: 1330, y: 448, width: 76.8, height: 14 },
    { x: 1202, y: 1280, width: 192, height: 14 },
  ],
};

const level2 = {
  map: { path: "./sprites/map/level_2.png", width: 3216, height: 1760 },
  props: [
    { x: 864 * 2, y: 976 * 2, type: "horizontaltomb2" },
    { x: 864 * 2, y: 1008 * 2, type: "horizontaltomb2" },
    { x: 864 * 2, y: 1040 * 2, type: "horizontaltomb3" },
    { x: 864 * 2, y: 1072 * 2, type: "horizontaltomb2" },
    { x: 864 * 2, y: 1104 * 2, type: "horizontaltomb5" },
    { x: 1072 * 2, y: 1040 * 2, type: "horizontaltomb2" },
    { x: 1072 * 2, y: 1072 * 2, type: "horizontaltomb4" },
    { x: 1072 * 2, y: 1104 * 2, type: "horizontaltomb2" },
    { x: 1311  * 2, y: 832 * 2, type: "horizontaltomb3" },
    { x: 1360  * 2, y: 832 * 2, type: "horizontaltomb2" },
    { x: 1375  * 2, y: 1008 * 2, type: "horizontaltomb1" },
    { x: 1696  * 2, y: 656 * 2, type: "horizontaltomb2" },
    { x: 1760 * 2, y: 656 * 2, type: "horizontaltomb2" },
    { x: 1344 * 2, y: 480 * 2, type: "stonepillar1" },
    { x: 1456 * 2, y: 480 * 2, type: "stonepillar1" },
    { x: 1952 * 2, y: 528 * 2, type: "stonepillar1" },
    { x: 1952 * 2, y: 464 * 2, type: "stonepillar1" },
    { x: 2272 * 2, y: 528 * 2, type: "stonepillar1" },
    { x: 2272 * 2, y: 464 * 2, type: "stonepillar1" },
    { x: 1392 * 2, y: 528 * 2, type: "stonepillar2" },
    { x: 2000 * 2, y: 496 * 2, type: "stonepillar2" },
    { x: 2208 * 2, y: 496 * 2, type: "stonepillar2" },
    { x: 1715 * 2, y: 837 * 2, type: "pole" },
    { x: 1795 * 2, y: 837 * 2, type: "pole" },
    { x: 1875 * 2, y: 837 * 2, type: "pole" },
    { x: 1955 * 2, y: 837 * 2, type: "pole" },
    { x: 1731 * 2, y: 500 * 2, type: "pole" },
    { x: 1731 * 2, y: 490 * 2, type: "pole" },
    { x: 1779 * 2, y: 500 * 2, type: "pole" },
    { x: 1779 * 2, y: 490 * 2, type: "pole" },
    { x: 1792 * 2, y: 528 * 2, type: "verticaltomb2" },
    { x: 1695 * 2, y: 528 * 2, type: "verticaltomb3" },
    { x: 1792 * 2, y: 480 * 2, type: "verticaltomb1" },
    { x: 1695 * 2, y: 480 * 2, type: "verticaltomb2" },
    { x: 1424 * 2, y: 1040 * 2, type: "verticaltomb1" },
    { x: 1648 * 2, y: 1024 * 2, type: "verticaltomb3" },
    { x: 1616 * 2, y: 1104 * 2, type: "verticaltomb2" },
    { x: 1984 * 2, y: 624 * 2, type: "verticaltomb2" },
    { x: 1984 * 2, y: 664 * 2, type: "verticaltomb2" },
    { x: 2224 * 2, y: 624 * 2, type: "verticaltomb1" },
    { x: 2224 * 2, y: 664 * 2, type: "verticaltomb2" },
    { x: 1968 * 2, y: 704 * 2, type: "fence" },
    { x: 2032 * 2, y: 704 * 2, type: "fence" },
    { x: 2144 * 2, y: 704 * 2, type: "fence" },
    { x: 2208 * 2, y: 704 * 2, type: "fence" },
    { x: 1056 * 2, y: 928 * 2, type: "crate4" },
    { x: 1088 * 2, y: 912 * 2, type: "crate1" },
    { x: 1080 * 2, y: 896 * 2, type: "crate2" },
    { x: 1072 * 2, y: 896 * 2, type: "crate1" },
    { x: 1192 * 2, y: 1008 * 2, type: "crate2" },
    { x: 1216 * 2, y: 1008 * 2, type: "crate1" },
    { x: 1408 * 2, y: 752 * 2, type: "crate2" },
    { x: 1440 * 2, y: 752 * 2, type: "crate2" },
    { x: 1408 * 2, y: 768 * 2, type: "crate2" },
    { x: 1440 * 2, y: 768 * 2, type: "crate2" },
    { x: 1448 * 2, y: 816 * 2, type: "crate1" },
    { x: 1416 * 2, y: 816 * 2, type: "crate1" },
    { x: 1424 * 2, y: 816 * 2, type: "crate3" },
    { x: 1576 * 2, y: 720 * 2, type: "crate1" },
    { x: 1656 * 2, y: 748 * 2, type: "crate1" },
    { x: 1648 * 2, y: 768 * 2, type: "crate1" },
    { x: 1656 * 2, y: 768 * 2, type: "crate2" },
    { x: 2288 * 2, y: 768 * 2, type: "crate2" },
    { x: 2304 * 2, y: 784 * 2, type: "crate2" },
    { x: 2320 * 2, y: 768 * 2, type: "crate2" },
    { x: 2288 * 2, y: 800 * 2, type: "crate2" },
    { x: 2320 * 2, y: 800 * 2, type: "crate2" },
    { x: 2240 * 2, y: 1088 * 2, type: "crate2" },
    { x: 2248 * 2, y: 1120 * 2, type: "crate2" },
    { x: 2240 * 2, y: 1120 * 2, type: "crate1" },
    { x: 2216 * 2, y: 1136 * 2, type: "crate3" },
    { x: 1232 * 2, y: 1008 * 2, type: "purplepot2" },
    { x: 1264* 2, y: 770 * 2, type: "purplepot1" },
    { x: 1248* 2, y: 770 * 2, type: "purplepot1" },
    { x: 1232* 2, y: 770 * 2, type: "purplepot1" },
    { x: 1264* 2, y: 752 * 2, type: "purplepot1" },
    { x: 1248* 2, y: 752 * 2, type: "purplepot1" },
    { x: 1232* 2, y: 752 * 2, type: "purplepot1" },
    { x: 1296* 2, y: 752 * 2, type: "purplepot2" },
    { x: 1248* 2, y: 784 * 2, type: "purplepot2" },
    { x: 1264* 2, y: 784 * 2, type: "purplepot2" },
    { x: 1776 * 2, y: 624 * 2, type: "greenpot1" },
    { x: 1776 * 2, y: 624 * 2, type: "greenpot2" },
    { x: 1744 * 2, y: 654 * 2, type: "greenpot2" },
    { x: 1440 * 2, y: 1120 * 2, type: "greenpot1" },
    { x: 1472 * 2, y: 1120 * 2, type: "greenpot2" },
    { x: 1664 * 2, y: 1056 * 2, type: "greenpot2" },
    { x: 1648 * 2, y: 1072 * 2, type: "greenpot2" },
    { x: 1968 * 2, y: 1102 * 2, type: "greenpot1" },
    { x: 1984 * 2, y: 1102 * 2, type: "greenpot1" },
    { x: 1968 * 2, y: 1118 * 2, type: "greenpot1" },
    { x: 1984 * 2, y: 1118 * 2, type: "greenpot1" },
    { x: 2016 * 2, y: 1118 * 2, type: "greenpot2" },
    { x: 2032 * 2, y: 1118 * 2, type: "greenpot2" },
  ],
  foilage:[],
  signs:[],
  shops:[],
  bounding_boxes:[
    // Vertical Boxes
    { x: 840 * 2, y: 835 * 2, width: 14, height: 10 * 64 },
    { x: 1119 * 2, y: 835 * 2, width: 14, height: 4.2 * 64 },
    { x: 1119 * 2, y: 1041 * 2, width: 14, height: 4.2 * 64 },
    { x: 936 * 2, y: 753 * 2, width: 14, height: 4.5 * 64 },
    { x: 1024 * 2, y: 753 * 2, width: 14, height: 4.5 * 64 },
    { x: 1057 * 2, y: 720 * 2, width: 14, height: 1.1 * 64 },
    { x: 904 * 2, y: 720 * 2, width: 14, height: 1.1 * 64 },
    { x: 1120 * 2, y: 673 * 2, width: 14, height: 2 * 64 },
    { x: 840 * 2, y: 673 * 2, width: 14, height: 2 * 64 },
    { x: 808 * 2, y: 500 * 2, width: 14, height: 6 * 64 },
    { x: 905 * 2, y: 464 * 2, width: 14, height: 1.6 * 64 },
    { x: 1153 * 2, y: 460 * 2, width: 14, height: 2.8 * 64 },
    { x: 1305 * 2, y: 430 * 2, width: 14, height: 3.8 * 64 },
    { x: 1505 * 2, y: 475 * 2, width: 14, height: 2.3 * 64 },
    { x: 1690 * 2, y: 475 * 2, width: 14, height: 2.3 * 64 },
    { x: 1825 * 2, y: 480 * 2, width: 14, height: 7 * 64 },
    { x: 1681 * 2, y: 689 * 2, width: 14, height: 2.75 * 64 },
    { x: 1153 * 2, y: 625 * 2, width: 14, height: 3 * 64 },
    { x: 1305 * 2, y: 625 * 2, width: 14, height: 0.6 * 64 },
    { x: 1320 * 2, y: 641 * 2, width: 14, height: 3.7 * 64 },
    { x: 1408 * 2, y: 625 * 2, width: 14, height: 0.6 * 64 },
    { x: 1240 * 2, y: 753 * 2, width: 14, height: 3.3 * 64 },
    { x: 1305 * 2, y: 848 * 2, width: 14, height: 1 * 64 },
    { x: 1409 * 2, y: 848 * 2, width: 14, height: 1 * 64 },
    { x: 1392 * 2, y: 641 * 2, width: 14, height: 3.7 * 64 },
    { x: 1472 * 2, y: 753 * 2, width: 14, height: 3.7 * 64 },
    { x: 1561 * 2, y: 625 * 2, width: 14, height: 8.6 * 64 },
    { x: 1497 * 2, y: 893 * 2, width: 14, height: 2.3 * 64 },
    { x: 1417 * 2, y: 1041 * 2, width: 14, height: 3 * 64 }, // Bottom border of the map, starting middle
    { x: 1449 * 2, y: 1104 * 2, width: 14, height: 2 * 64 },
    { x: 1648 * 2, y: 1104 * 2, width: 14, height: 2 * 64 },
    { x: 1681 * 2, y: 1088 * 2, width: 14, height: 2 * 64 },
    { x: 1976 * 2, y: 1088 * 2, width: 14, height: 2.2 * 64 },
    { x: 2273 * 2, y: 944 * 2, width: 14, height: 9 * 64 },
    { x: 2369 * 2, y: 706 * 2, width: 14, height: 9 * 64 },
    { x: 2273 * 2, y: 608 * 2, width: 14, height: 5 * 64 },
    { x: 2337 * 2, y: 418 * 2, width: 14, height: 6.5 * 64 },
    { x: 1896 * 2, y: 418 * 2, width: 14, height: 6.5 * 64 },
    { x: 1961 * 2, y: 608 * 2, width: 14, height: 5 * 64 },
    { x: 1691 * 2, y: 1019 * 2, width: 14, height: 3 * 64 },
    { x: 1967  * 2, y: 1019 * 2, width: 14, height: 3 * 64 },
    { x: 1691 * 2, y: 768 * 2, width: 14, height: 2.15 * 64 },
    { x: 2027 * 2, y: 832 * 2, width: 14, height: 2.15 * 64 },
    { x: 2094 * 2, y: 763 * 2, width: 14, height: 4.35 * 64 },
    { x: 2139 * 2, y: 763 * 2, width: 14, height: 4.35 * 64 },
    { x: 2205 * 2, y: 831 * 2, width: 14, height: 2.2 * 64 },
    { x: 2272 * 2, y: 763 * 2, width: 14, height: 2.3 * 64 },
    { x: 2027 * 2, y: 939 * 2, width: 14, height: 4.27 * 64 },
    { x: 2093 * 2, y: 939 * 2, width: 14, height: 4.27 * 64 },
    { x: 2139 * 2, y: 939 * 2, width: 14, height: 4.27 * 64 },
    { x: 2207 * 2, y: 939 * 2, width: 14, height: 4.27 * 64 },
    { x: 1691 * 2, y: 891 * 2, width: 14, height: 2.27 * 64 },
    { x: 1951 * 2, y: 891 * 2, width: 14, height: 2.27 * 64 },
    // Horizontal Boxes
    { x: 847 * 2, y: 897 * 2, width: 3 * 64, height: 14 },
    { x: 1024 * 2, y: 897 * 2, width: 3.2 * 64, height: 14 },
    { x: 1119 * 2, y: 1041 * 2, width: 9.5 * 64, height: 14 },
    { x: 840 * 2, y: 1153 * 2, width: 9.5 * 64, height: 14 },
    { x: 1024 * 2, y: 753 * 2, width: 1.2 * 64, height: 14 },
    { x: 903 * 2, y: 753 * 2, width: 1.2 * 64, height: 14 },
    { x: 1057 * 2, y: 720 * 2, width: 2.5 * 64, height: 14 },
    { x: 838 * 2, y: 720 * 2, width: 2.2 * 64, height: 14 },
    { x: 1120 * 2, y: 673 * 2, width: 1.5 * 64, height: 14 },
    { x: 807 * 2, y: 673 * 2, width: 1.2 * 64, height: 14 },
    { x: 808 * 2, y: 510 * 2, width: 3.2 * 64, height: 14 },
    { x: 905 * 2, y: 460 * 2, width: 8 * 64, height: 14 },
    { x: 1153 * 2, y: 545 * 2, width: 4.9 * 64, height: 14 },
    { x: 1305 * 2, y: 480 * 2, width: 7 * 64, height: 14 },
    { x: 1505 * 2, y: 545 * 2, width: 6 * 64, height: 14 },
    { x: 1690 * 2, y: 480 * 2, width: 21 * 64, height: 14 },
    { x: 1681 * 2, y: 689 * 2, width: 5 * 64, height: 14 },
    { x: 1681 * 2, y: 770 * 2, width: 1 * 64, height: 14 },
    { x: 1153 * 2, y: 625 * 2, width: 4.95 * 64, height: 14 },
    { x: 1305 * 2, y: 641 * 2, width: 0.7 * 64, height: 14 },
    { x: 1392 * 2, y: 641 * 2, width: 0.7 * 64, height: 14 },
    { x: 1408 * 2, y: 625 * 2, width: 4.98 * 64, height: 14 },
    { x: 1238 * 2, y: 753 * 2, width: 2.75 * 64, height: 14 },
    { x: 1240 * 2, y: 848 * 2, width: 2.22 * 64, height: 14 },
    { x: 1305 * 2, y: 865 * 2, width: 4 * 64, height: 14 },
    { x: 1409 * 2, y: 848 * 2, width: 2.5 * 64, height: 14 },
    { x: 1392 * 2, y: 753 * 2, width: 3 * 64, height: 14 },
    { x: 1120 * 2, y: 963 * 2, width: 12 * 64, height: 14 },
    { x: 1497 * 2, y: 893 * 2, width: 2 * 64, height: 14 },
    { x: 1417 * 2, y: 1104 * 2, width: 1.2 * 64, height: 14 }, // Bottom border of the map, starting middle
    { x: 1449 * 2, y: 1152 * 2, width: 7 * 64, height: 14 },
    { x: 1648 * 2, y: 1104 * 2, width: 2 * 64, height: 14 },
    { x: 1681 * 2, y: 1088 * 2, width: 9.43 * 64, height: 14 },
    { x: 1976 * 2, y: 1152 * 2, width: 9.43 * 64, height: 14 },
    { x: 2273 * 2, y: 944 * 2, width: 3.4 * 64, height: 14 },
    { x: 2146 * 2, y: 763 * 2, width: 7 * 64, height: 14 }, // Right Gate
    { x: 1959 * 2, y: 763 * 2, width: 4.23 * 64, height: 14 }, // Left Gate
    { x: 2273 * 2, y: 608 * 2, width: 3 * 64, height: 14 },
    { x: 1896 * 2, y: 608 * 2, width: 2.23 * 64, height: 14 },
    { x: 1691* 2, y: 1019 * 2, width: 8.8 * 64, height: 14 },
    { x: 1691* 2, y: 832 * 2, width: 10.7 * 64, height: 14 },
    { x: 2027 * 2, y: 895 * 2, width: 2.27 * 64, height: 14 },
    { x: 2139 * 2, y: 895 * 2, width: 2.27 * 64, height: 14 },
    { x: 2207 * 2, y: 831 * 2, width: 2.2 * 64, height: 14 },
    { x: 2027 * 2, y: 939 * 2, width: 2.28 * 64, height: 14 },
    { x: 2027 * 2, y: 1071 * 2, width: 2.28 * 64, height: 14 },
    { x: 2139 * 2, y: 1071 * 2, width: 2.28 * 64, height: 14 },
    { x: 2139 * 2, y: 939 * 2, width: 2.28 * 64, height: 14 },
    { x: 1691 * 2, y: 891 * 2, width: 8.3 * 64, height: 14 },
    { x: 1691 * 2, y: 959 * 2, width: 8.3 * 64, height: 14 },
  ],
};

const level2boss = {
  map: { path: "./sprites/map/bossroom2.png", width: 3216, height: 1760 },
  props: [],
  foilage:[],
  signs:[],
  shops:[],
  bounding_boxes:[
  ],
};
