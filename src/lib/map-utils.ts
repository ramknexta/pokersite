export function getGoogleMapsEmbedUrl(clubName: string): string | undefined {
  const name = clubName.toLowerCase();


  if (name.includes("royal flush poker")) {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0000000000005!2d77.59996687572318!3d12.9690117235815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167f4ca86653%3A0x7427ceed0c91991!2sKonark%20Vegetarian%20Restaurant!5e1!3m2!1sen!2sin!4v1746776615611!5m2!1sen!2sin";
  }
  if (name.includes("high stakes society")) {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4612.713686874305!2d77.58258407572264!3d12.929923315789322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15000cb14de5%3A0x53900046a58d3122!2sHigh%20Stakes%20Society%20-%20Live%20Premium%20Poker%20Club%20Bangalore!5e1!3m2!1sen!2sin!4v1746773342677!5m2!1sen!2sin";
  }
  if (name.includes("indian poker house")) {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4612.926811303211!2d77.58102247572252!3d12.91838731604137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15a281aa7009%3A0x60c676669d2dbd60!2sIndian%20Poker%20House%20(%20Live%20Poker%20club%20In%20Bangalore%20)!5e1!3m2!1sen!2sin!4v1746776615611!5m2!1sen!2sin";
  }
  if (name.includes("the house poker")) {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4611.950757061949!2d77.59759197572305!3d12.971136514887144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17bd3bb0989d%3A0x1f5670038c75fd20!2sThe%20House%20Poker!5e1!3m2!1sen!2sin!4v1746777349243!5m2!1sen!2sin";
  }
  if (name.includes("tilt poker room")) {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4611.866176305335!2d77.64391587572318!3d12.975697614787062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17bc179cb89b%3A0x2003b4ae8803dcb0!2sTilt%20Poker%20Room!5e1!3m2!1sen!2sin!4v1746776831841!5m2!1sen!2sin";
  }
  if (name.includes("golden aces")) {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4612.66857164617!2d77.6294313757227!3d12.93236401573598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1539ac97e1f1%3A0xbb564431a2b95d1!2sGolden%20Aces%20-%20Legal%20Poker%20Room!5e1!3m2!1sen!2sin!4v1746776945286!5m2!1sen!2sin";
  }
  if (name.includes("champs of aces") || name.includes("champ of aces")) {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4612.612814395458!2d77.62231857572276!3d12.935379815670087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1444a826dd33%3A0xe7b9cdb437e082e5!2sChamp%20of%20Aces%20Poker%20Club%20-%20Bangalore!5e1!3m2!1sen!2sin!4v1746776990568!5m2!1sen!2sin";
  }
  if (name.includes("kings and queens poker")) {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.576416757495!2d77.62951919999999!3d12.9349239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae145d4b409923%3A0x921634fee1dcd997!2sKings%20And%20Queens%20Poker%20-%20(Bangalore%20Poker%20Sports)!5e0!3m2!1sen!2sin!4v1752818825706!5m2!1sen!2sin";
  }
  if (name.includes("poker syndicate - legal poker room")) {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.693171273458!2d77.6217296!3d12.9274315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15022365153d%3A0xc1c8d0d786f160b!2sPoker%20Syndicate%20-%20Legal%20Poker%20Room!5e0!3m2!1sen!2sin!4v1757680357736!5m2!1sen!2sin";
  }
  return undefined;
} 