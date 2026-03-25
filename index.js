import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";

const MAPS: {
  name: string;
  image: string;
  description?: string;
  hidden?: boolean;
}[] = [
  {
    name: "Hasun Dong",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483756071976697906/ULFeGk6.jpg?ex=69bbbf06&is=69ba6d86&hm=bfa7a51db2c5f6a1a0b49e111af0c9cfbb93938f64e03739d12c83147847286a&",
    description:
      "Hasun Dong, also called Easy Ape Dungeon, is the first ape dungeon that is located in each second town of every kingdom. Each kingdom has its own ape dungeon, but it is possible to visit each other. It is divided in several small maps. In the quest The secret of the Metin Stones you have to find the Hasun Stone Memorial which is located at the very end of this dungeon. To reach it, simple read below.\n\nFrom start, you walk straight forward.\nYou then keep walking straight forward to the next part;\nIn the next map you keep walking straight.\nIn this part you take the farthest turn.\nYou now make an S turn, meaning you take the opposite teleport;\nYou now entered a round room, which is the boss room.",
  },
  {
    name: "Seungryong Valley",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483749529957306448/Irk4prf.jpg?ex=69bbb8ee&is=69ba676e&hm=1c9eba5ecc14e5f0096351d69dd9c21e1e765b0e5911ee9487f1ba471004a779&",
    description:
      'The Valley of Seungryong is often the third map, after map1 and map2, for players to level up. It is also a common place for beginners to farm on particular islands. For example the bottom left island where Chief Esoteric Arahan can drop a Red Iron Blade. The islands spawning Metin of Shadow for. For training purposes, the common place is "BO", which is short for "Black Orc" that is located on the center island. You can craft epic items at Seon-Pyeong. Also Koe-Pung can grant you access to Grotto of Exile when you are at least level 75 and provide him a Blood Stone.',
  },
  {
    name: "Yongbi Desert",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483748294252429312/kg0hzHG.jpg?ex=69bbb7c8&is=69ba6648&hm=b128ec3b6ba02a92a1449fdbbc4c848c8f7fa914441c8eb8d4949bd16c7344be&",
    description:
      "Desert Yongbi is full of spiders, scorpions and snakes, not for the faint hearted. However, if you make it through, you can find 2 Monkey Dungeons which are good for Horse Medal farming. Also, on the bottom left center of the map, you can access the Snakefield (full of aggressive monsters) or the Spider Dungeon, popular for leveling purposes.",
  },
  {
    name: "Jungsun Dong",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483756072505311333/21pJGlw.jpg?ex=69bbbf06&is=69ba6d86&hm=e9d6eac0d1b8ff3c3f99083ff0c05c5aff954d1618a97ebb630caff5081146f1&",
  },
  {
    name: "Hwang Temple",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483750314502000662/x2ecBWU.jpg?ex=69bbb9a9&is=69ba6829&hm=3c6f45ccd465d6cac51d0913ce56cd89a25bdef54f96bb405936e4e54b93a08a&",
  },
  {
    name: "Demon Tower",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=Demon+Tower",
  },
  {
    name: "Sangsun Dong",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=Sangsun+Dong",
  },
  {
    name: "Mount Sohan",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483748293874810890/X8uC6lu.jpg?ex=69bbb7c7&is=69ba6647&hm=e88c9151070d0700bbda8899725bced9348cd3eed5c4d63fd719d34ea8db5379&",
    description:
      "Mount Sohan is an icy landscape with many undead monsters. When you walk to the bottom right corner, you can access Lungsam. Take note that from the start to Lungsam you find aggressive monsters that attack you automatically.",
  },
  {
    name: "Spider Cave",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483756073809875024/xjnbCpF.jpg?ex=69bbbf06&is=69ba6d86&hm=9df522c04c89f0985fd79b590054792e834feb01d7c8358516ebcc1c323b80f8&",
  },
  {
    name: "Spider Cave 2",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483750314170519552/34cDxHK.jpg?ex=69bbb9a9&is=69ba6829&hm=06540f0f59e280d81d4b6f4585505b490ea0ad32e0da7aaf84925719861cd27f&",
  },
  {
    name: "Doyyumhwan",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483750313402962070/pGlOCu1.jpg?ex=69bbb9a9&is=69ba6829&hm=193e74e3d167300d0b3b581c2f0fd5348a7eb26403f7e8dabc1907b2bce37d2f&",
  },
  {
    name: "Snakefield",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483756073386246236/Or0zV3F.jpg?ex=69bbbf06&is=69ba6d86&hm=906100130eaaaa2e5fa1c508917088d92c3a32ef6b9080b8fa6e5ac6bb017674&",
  },
  {
    name: "Lungsam",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483750313717399646/vk6e1qX.jpg?ex=69bbb9a9&is=69ba6829&hm=1b2eed08515bf6a3a91cbd0b782467b4d6e969f8bf6d20a5a2da5b1202638b7c&",
  },
  {
    name: "Land of Giants",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483748293195599903/wRmtgC3.jpg?ex=69bbb7c7&is=69ba6647&hm=2dad3fc52a175fc5c9eca53d425e858df74a0ebd0e2f996caf9162b69bfbce0d&",
  },
  {
    name: "Spider Cave 3",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483753241346052148/cpdHhfv-1.jpg?ex=69bbbc63&is=69ba6ae3&hm=3773ecfa0f9473f5f672f80b6cd512ad19dcede401cf49bd235944a30f489392&",
  },
  {
    name: "Red Forest",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483631326186836110/P8XzR00.jpg?ex=69bb4ad8&is=69b9f958&hm=d9bdb6b58134df41f0db4cecb67a66a3065594c4580db20808b2581a521f383d&",
  },
  {
    name: "Grotto of Exile",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483631325503160440/3fDfuCf.jpg?ex=69bb4ad8&is=69b9f958&hm=84c52edafa8aa09777cfb2823563661b9241f5623e6b94a5fb49f073036e3f3f&",
  },
  {
    name: "Grotto of Exile 2",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483748293522493600/GZJgsPR.jpg?ex=69bbb7c7&is=69ba6647&hm=06f5a9dcc70d338275ef276d9b0efe841da7ca8ccc350a99d5e42ad7e0e640e7&",
  },
  {
    name: "Dragon Room",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483756072853573742/JICmcbS.jpg?ex=69bbbf06&is=69ba6d86&hm=3323bdf65d0e0c0bf10a27b9a0a59f8eb71d51f2f012cb2ad4b20d90b932336c&",
  },
  {
    name: "Devil's Catacomb",
    image:
      "https://cdn.discordapp.com/attachments/1483615222970318992/1483760491837784145/1773826365971.png?ex=69bbc324&is=69ba71a4&hm=9b9905516f740d5c7476d841ec9ee789e0e5ed32f28f3a1009915c2697f3091f&",
  },
];

const DEVIL_CATACOMB_INDEX = 19;
const DEMON_TOWER_INDEX = 5;

const DEVIL_FLOORS: { name: string; image: string }[] = [
  {
    name: "Floor 1",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=Floor+1",
  },
  {
    name: "Floor 2",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=Floor+2",
  },
  {
    name: "Floor 3",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=Floor+3",
  },
  {
    name: "Floor 4",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=Floor+4",
  },
  {
    name: "Floor 5",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=Floor+5",
  },
  {
    name: "Floor 6",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=Floor+6",
  },
];

const DEMON_TOWER_FLOORS: { name: string; image: string }[] = [
  {
    name: "Floor 1",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=DT+Floor+1",
  },
  {
    name: "Floor 2",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=DT+Floor+2",
  },
  {
    name: "Floor 3",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=DT+Floor+3",
  },
  {
    name: "Floor 4",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=DT+Floor+4",
  },
  {
    name: "Floor 5",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=DT+Floor+5",
  },
  {
    name: "Floor 6",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=DT+Floor+6",
  },
  {
    name: "Floor 7",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=DT+Floor+7",
  },
  {
    name: "Floor 8",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=DT+Floor+8",
  },
  {
    name: "Floor 9",
    image: "https://placehold.co/800x400/2d5a27/ffffff?text=DT+Floor+9",
  },
];

const token = process.env["DISCORD_TOKEN"];

if (!token) {
  throw new Error("DISCORD_TOKEN environment variable is required.");
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("clientReady", async () => {
  console.log(`Logged in as ${client.user?.tag}`);

  const rest = new REST().setToken(token);
  const commands = [
    new SlashCommandBuilder()
      .setName("maps")
      .setDescription("Browse all available maps")
      .toJSON(),
  ];

  await rest.put(Routes.applicationCommands(client.application!.id), {
    body: commands,
  });

  console.log("Slash commands registered globally.");
});

function buildMapRows(userId: string): ActionRowBuilder<ButtonBuilder>[] {
  const rows: ActionRowBuilder<ButtonBuilder>[] = [];

  const visibleMaps = MAPS.map((map, index) => ({ map, index })).filter(
    ({ map }) => !map.hidden,
  );

  for (let i = 0; i < visibleMaps.length; i += 5) {
    const row = new ActionRowBuilder<ButtonBuilder>();
    const chunk = visibleMaps.slice(i, i + 5);

    chunk.forEach(({ map, index }) => {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(`map_${userId}_${index}`)
          .setLabel(map.name)
          .setStyle(ButtonStyle.Success),
      );
    });

    rows.push(row);
  }

  return rows;
}

function buildFloorRows(userId: string): ActionRowBuilder<ButtonBuilder>[] {
  const rows: ActionRowBuilder<ButtonBuilder>[] = [];

  // Row 1: Floor 1–5
  const row1 = new ActionRowBuilder<ButtonBuilder>();
  DEVIL_FLOORS.slice(0, 5).forEach((floor, i) => {
    row1.addComponents(
      new ButtonBuilder()
        .setCustomId(`floor_${userId}_${i}`)
        .setLabel(floor.name)
        .setStyle(ButtonStyle.Success),
    );
  });
  rows.push(row1);

  // Row 2: Floor 6–7
  const row2 = new ActionRowBuilder<ButtonBuilder>();
  DEVIL_FLOORS.slice(5).forEach((floor, i) => {
    row2.addComponents(
      new ButtonBuilder()
        .setCustomId(`floor_${userId}_${5 + i}`)
        .setLabel(floor.name)
        .setStyle(ButtonStyle.Success),
    );
  });
  rows.push(row2);

  // Row 3: Back to Maps (red)
  const row3 = new ActionRowBuilder<ButtonBuilder>();
  row3.addComponents(
    new ButtonBuilder()
      .setCustomId(`backtomaps_${userId}`)
      .setLabel("Back to Maps")
      .setStyle(ButtonStyle.Danger),
  );
  rows.push(row3);

  return rows;
}

function buildDemonTowerFloorRows(
  userId: string,
): ActionRowBuilder<ButtonBuilder>[] {
  const rows: ActionRowBuilder<ButtonBuilder>[] = [];

  // Row 1: Floor 1–5
  const row1 = new ActionRowBuilder<ButtonBuilder>();
  DEMON_TOWER_FLOORS.slice(0, 5).forEach((floor, i) => {
    row1.addComponents(
      new ButtonBuilder()
        .setCustomId(`dtfloor_${userId}_${i}`)
        .setLabel(floor.name)
        .setStyle(ButtonStyle.Success),
    );
  });
  rows.push(row1);

  // Row 2: Floor 6–9
  const row2 = new ActionRowBuilder<ButtonBuilder>();
  DEMON_TOWER_FLOORS.slice(5).forEach((floor, i) => {
    row2.addComponents(
      new ButtonBuilder()
        .setCustomId(`dtfloor_${userId}_${5 + i}`)
        .setLabel(floor.name)
        .setStyle(ButtonStyle.Success),
    );
  });
  rows.push(row2);

  // Row 3: Back to Maps (red)
  const row3 = new ActionRowBuilder<ButtonBuilder>();
  row3.addComponents(
    new ButtonBuilder()
      .setCustomId(`backtomaps_${userId}`)
      .setLabel("Back to Maps")
      .setStyle(ButtonStyle.Danger),
  );
  rows.push(row3);

  return rows;
}

function defaultEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle("Map Viewer")
    .setDescription("Select a map below to view it.")
    .setColor(0x57f287)
    .setFooter({ text: "Royale2Bot • Map Viewer" });
}

function unauthorizedReply() {
  return {
    content:
      "Doar persoana care a folosit comanda poate folosi aceste butoane.",
    ephemeral: true,
  };
}

client.on("interactionCreate", async (interaction) => {
  // --- /maps command ---
  if (interaction.isChatInputCommand() && interaction.commandName === "maps") {
    const userId = interaction.user.id;

    await interaction.reply({
      embeds: [defaultEmbed()],
      components: buildMapRows(userId),
    });

    return;
  }

  // --- Map buttons ---
  if (interaction.isButton() && interaction.customId.startsWith("map_")) {
    const parts = interaction.customId.split("_");
    const userId = parts[1];
    const index = parseInt(parts[2], 10);

    if (interaction.user.id !== userId) {
      await interaction.reply(unauthorizedReply());
      return;
    }

    const map = MAPS[index];
    if (!map) {
      await interaction.update({});
      return;
    }

    // Demon Tower opens its floor sub-menu
    if (index === DEMON_TOWER_INDEX) {
      const embed = new EmbedBuilder()
        .setTitle("Demon Tower")
        .setDescription("Select a floor below.")
        .setImage(map.image)
        .setColor(0x57f287)
        .setFooter({ text: "Royale2Bot • Map Viewer" });

      await interaction.update({
        embeds: [embed],
        components: buildDemonTowerFloorRows(userId),
      });

      return;
    }

    // Devil's Catacomb opens the floor sub-menu
    if (index === DEVIL_CATACOMB_INDEX) {
      const embed = new EmbedBuilder()
        .setTitle("Devil's Catacomb")
        .setDescription("Select a floor below.")
        .setImage(map.image)
        .setColor(0x57f287)
        .setFooter({ text: "Royale2Bot • Map Viewer" });

      await interaction.update({
        embeds: [embed],
        components: buildFloorRows(userId),
      });

      return;
    }

    // All other maps — update embed and keep map buttons
    const embed = new EmbedBuilder()
      .setTitle(map.name)
      .setDescription(map.description ?? null)
      .setImage(map.image)
      .setColor(0x57f287)
      .setFooter({ text: "Royale2Bot • Map Viewer" });

    await interaction.update({
      embeds: [embed],
      components: buildMapRows(userId),
    });

    return;
  }

  // --- Floor buttons ---
  if (interaction.isButton() && interaction.customId.startsWith("floor_")) {
    const parts = interaction.customId.split("_");
    const userId = parts[1];
    const index = parseInt(parts[2], 10);

    if (interaction.user.id !== userId) {
      await interaction.reply(unauthorizedReply());
      return;
    }

    const floor = DEVIL_FLOORS[index];
    if (!floor) {
      await interaction.update({});
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(`Devil's Catacomb — ${floor.name}`)
      .setImage(floor.image)
      .setColor(0x57f287)
      .setFooter({ text: "Royale2Bot • Map Viewer" });

    await interaction.update({
      embeds: [embed],
      components: buildFloorRows(userId),
    });

    return;
  }

  // --- Demon Tower floor buttons ---
  if (interaction.isButton() && interaction.customId.startsWith("dtfloor_")) {
    const parts = interaction.customId.split("_");
    const userId = parts[1];
    const index = parseInt(parts[2], 10);

    if (interaction.user.id !== userId) {
      await interaction.reply(unauthorizedReply());
      return;
    }

    const floor = DEMON_TOWER_FLOORS[index];
    if (!floor) {
      await interaction.update({});
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(`Demon Tower — ${floor.name}`)
      .setImage(floor.image)
      .setColor(0x57f287)
      .setFooter({ text: "Royale2Bot • Map Viewer" });

    await interaction.update({
      embeds: [embed],
      components: buildDemonTowerFloorRows(userId),
    });

    return;
  }

  // --- Back to Maps button ---
  if (
    interaction.isButton() &&
    interaction.customId.startsWith("backtomaps_")
  ) {
    const userId = interaction.customId.replace("backtomaps_", "");

    if (interaction.user.id !== userId) {
      await interaction.reply(unauthorizedReply());
      return;
    }

    await interaction.update({
      embeds: [defaultEmbed()],
      components: buildMapRows(userId),
    });

    return;
  }
});

client.login(token);
