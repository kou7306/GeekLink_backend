import https from 'https';

export const graphql = (query: string, variables: any, token: string | null) => {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      query,
      variables: JSON.stringify(variables),
      token,
    });

    const options = {
      hostname: 'api.github.com',
      path: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'Node.js',
      },
    };

    const req = https.request(options, (res) => {
      let responseBody = '';

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseBody);
          if (parsedData.errors) {
            reject(parsedData.errors);
          } else {
            resolve(parsedData.data);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
};
