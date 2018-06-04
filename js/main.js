import introScreen from './intro.js';
import greetingScreen from './greeting.js';
import rulesScreen from './rules.js';
import game1Screen from './game-1.js';
import game2Screen from './game-2.js';
import game3Screen from './game-3.js';
import statsScreen from './stats.js';

import {initScreens, renderScreen} from './util.js';

initScreens({
  'intro': introScreen,
  'greeting': greetingScreen,
  'rules': rulesScreen,
  'game1': game1Screen,
  'game2': game2Screen,
  'game3': game3Screen,
  'stats': statsScreen
});

renderScreen(`intro`);
