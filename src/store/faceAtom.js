import { atom } from 'recoil';

export const faceAtom = atom({
  key: 'faceAtom',
  default: null,
  dangerouslyAllowMutability: true,
});

export const kitAtom = atom({
  key: 'kitAtom',
  default: null,
  dangerouslyAllowMutability: true,
});
