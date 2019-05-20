#! /usr/bin/env node

const { readFileSync } = require('fs');
const log = require('log-update');
const Speaker = require('speaker');
const { StreamAudioContext } = require('web-audio-engine');

const frames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  .map(i => readFileSync(`${__dirname}/frames/${i}.txt`, 'utf-8'));
const context = new StreamAudioContext();
const node = context.createGain();
const osc = context.createOscillator();

node.gain.value = 0.1;
node.connect(context.destination);
osc.connect(node);
osc.type = 'sawtooth';
osc.start();

context.pipe(new Speaker());
context.resume();

let i = 0;
setInterval(() => {
  osc.frequency.value = [220, 230][i % 2];
  log(frames[i = ++i % frames.length]);
}, 100);
