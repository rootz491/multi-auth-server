type ApiKeyPair = {
  identifier: string;
  header: string;
  value: string;
};

const apiKeys: ApiKeyPair[] = [
  {
    identifier: 'analytics',
    header: 'API-KEY-1',
    value: 'rootz491',
  },
  {
    identifier: 'logger',
    header: 'API-KEY-2',
    value: 'rootz492',
  },
  {
    identifier: 'cron',
    header: 'API-KEY-3',
    value: 'rootz493',
  },
];

export default apiKeys;
