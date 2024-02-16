import { Network } from '@haechi-labs/face-types';

export const resolveApiKey = (network) => {
  // return 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCZNotniFjZdpvDllzdS77MrAgsYnvLtXJq6hem5XeCL9ZfQQzEwMJoadXUJuRQbZHFexJaPvynMD3ufvxKKEfxWR-8j6YCIbSh8MLhypfL7FEtLsQAck-T4jiptiMVxuPhrDRmGgzC2Sik_qi0SiXXUebsPULgQyS85nPhtQ5lNwIDAQAB';
  switch (network) {
    case Network.OASYS:
    case Network.OASYS_TESTNET:
    case Network.SAND_VERSE:
      return "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8Okg6t42RostBqGMdqi6IULmUDx-Mcgh6_HMQlyVaHiIOAxOPH_Ffq5TggxH6EZAX_zSCPKERRMbZuv2StMAoWpMuWncU1vkZnwoYbKRk-PgbhxBJgsNpOtCoy259YObAo5m9CMOdlDLpSm3tmm9RhQcIXMa_eL-lVsbI9u5cUQIDAQAB";
    default:
      throw new Error('unsupported network error');
  }
};
