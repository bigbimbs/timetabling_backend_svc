function generateApiKey(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let apiKey = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    apiKey += characters.charAt(randomIndex);
  }

  return apiKey;
}

export const usersSeedData = [
  {
    name: 'user one',
    apiKey: generateApiKey(16),
    privateApiKey: generateApiKey(16),
  },
  {
    name: 'user two',
    apiKey: generateApiKey(16),
    privateApiKey: generateApiKey(16),
  },
  {
    name: 'user three',
    apiKey: generateApiKey(16),
    privateApiKey: generateApiKey(16),
  },
  {
    name: 'user four',
    apiKey: generateApiKey(16),
    privateApiKey: generateApiKey(16),
  },
  {
    name: 'user five',
    apiKey: generateApiKey(16),
    privateApiKey: generateApiKey(16),
  },
  {
    name: 'user six',
    apiKey: generateApiKey(16),
    privateApiKey: generateApiKey(16),
  },
  {
    name: 'user seven',
    apiKey: generateApiKey(16),
    privateApiKey: generateApiKey(16),
  },
  {
    name: 'user eight',
    apiKey: generateApiKey(16),
    privateApiKey: generateApiKey(16),
  },
  {
    name: 'user nine',
    apiKey: generateApiKey(16),
    privateApiKey: generateApiKey(16),
  },
  {
    name: 'user ten',
    apiKey: generateApiKey(16),
    privateApiKey: generateApiKey(16),
  },
  {
    name: 'user eleven',
    apiKey: generateApiKey(16),
    privateApiKey: generateApiKey(16),
  },
  {
    name: 'user twelve',
    apiKey: generateApiKey(16),
    privateApiKey: generateApiKey(16),
  },
];
