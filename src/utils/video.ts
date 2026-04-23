import axios from 'axios';
const M3U8FileParser = require('m3u8-file-parser');
const m3u8Parser = new M3U8FileParser();

interface iVideoResult {
  url: string;
  videoDetails?: any;
  liveData?: any;
}

type typeSignatureCipher = string | string[][] | Record<string, string> | URLSearchParams | undefined;

const axiosInstanceVideo = axios.create({
  withCredentials: true,
});

const resolvePlayerResponse = (videoHtml: string) => {
  if (!videoHtml) {
    return '';
  }

  const matches = videoHtml.match(/ytInitialPlayerResponse = (.*)}}};/);
  return matches ? matches[1] + '}}}' : '';
};

const resoleM3U8Link = (videoHtml: string) => {
  if (!videoHtml) {
    return null;
  }

  const matches = videoHtml.match(/hlsManifestUrl":"(.*\/file\/index\.m3u8)/);
  return matches ? matches[1] : null;
};

const buildDecoder = async (watchHtml: string) => {
  if (!watchHtml) {
    return null;
  }

  const jsFileUrlMatches = watchHtml.match(
    /\/s\/player\/[A-Za-z0-9]+\/[A-Za-z0-9_.]+\/[A-Za-z0-9_]+\/base\.js/
  );

  if (!jsFileUrlMatches) {
    return null;
  }

  const jsFileContent = await getRemoteFile(jsFileUrlMatches[0]);
  if (!jsFileContent) {
    return null;
  }
  const decodeFunctionMatches = jsFileContent.match(
    /function.*\.split\(\"\"\).*\.join\(\"\"\)}/
  );

  if (!decodeFunctionMatches) {
    return null;
  }

  const decodeFunction = decodeFunctionMatches[0];
  const nameMatches = decodeFunction.match(/\.split\(\"\"\);([a-zA-Z0-9]+)\./);
  if (!nameMatches) {
    return null;
  }

  const startIndex = jsFileContent.indexOf(`var ${nameMatches[1]}={`);
  if (startIndex < 0) {
    return null;
  }

  const endIndex = jsFileContent.indexOf('}};', startIndex);
  if (endIndex < 0) {
    return null;
  }

  const declares = jsFileContent.substring(startIndex, endIndex + 3);
  if (!declares) {
    return null;
  }

  return function (signatureCipher: typeSignatureCipher) {
    const params = new URLSearchParams(signatureCipher);
    const {
      s: signature,
      sp: signatureParam = 'signature',
      url,
    } = Object.fromEntries(params);
    const decodedSignature = new Function(`
          "use strict";
          ${declares}
          return (${decodeFunction})("${signature}");
      `)();

    return `${url}&${signatureParam}=${encodeURIComponent(decodedSignature)}`;
  };
};

const getRemoteFile = async (url: string) => {
  if (!process.env.YOUTUBE_URL) {
    return null;
  }

  try {
    const res =
      'development' === process.env.NODE_ENV
        ? await axiosInstanceVideo.get(url)
        : await axiosInstanceVideo.get(process.env.YOUTUBE_URL + url);
    return res.data as string;
  } catch (error) {
    throw error
  }
};

// for more infomation about iTag : https://gist.github.com/sidneys/7095afe4da4ae58694d128b1034e01e2
const getVideoInfo = async ({ videoURL, iTag = 18, withDetails = false }: {videoURL: string; iTag?: number; withDetails?: boolean; }) => {
  if (!videoURL || !process.env.YOUTUBE_URL) {
    return null;
  }

  let url = videoURL;
  if ('development' === process.env.NODE_ENV) {
    url = videoURL.startsWith(process.env.YOUTUBE_URL)
      ? videoURL.slice(process.env.YOUTUBE_URL.length)
      : videoURL;
  }

  const res = await axiosInstanceVideo.get(url + '&app=desktop');
  
  if (!res || 200 !== res.status || !res.data) {
    throw new Error('Failed to fetch data.');
  }

  const ytInitialPlayerResponse = resolvePlayerResponse(res.data);
  const parsedResponse = JSON.parse(ytInitialPlayerResponse);
  const streamingData = parsedResponse.streamingData || {};
  let formats = (streamingData.formats || []).concat(
    streamingData.adaptiveFormats || []
  );
  const isEncryptedVideo = !!formats.find(
    (it: { signatureCipher: typeSignatureCipher }) => !!it.signatureCipher
  );

  if (isEncryptedVideo) {
    const decoder = await buildDecoder(res.data);

    if (decoder) {
      formats = formats.map(
        (it: {
          url: string;
          signatureCipher: typeSignatureCipher;
        }) => {
          if (it.url || !it.signatureCipher) {
            return it;
          }

          it.url = decoder(it.signatureCipher);
          delete it.signatureCipher;
          return it;
        }
      );
    }
  }
  
  const [realFormat] = formats.filter((format: any) => { return iTag === format.itag;});
  let result: iVideoResult = {
    url: realFormat && realFormat.url ? realFormat.url : ''
  };
  
  if (withDetails) {
    result.videoDetails = parsedResponse.videoDetails || {};
    result.liveData = {};
  }

  if (result.videoDetails && result.videoDetails.isLiveContent) {
    const m3u8Link = resoleM3U8Link(res.data);
    if (m3u8Link) {
      const m3u8FileContent = await getRemoteFile(m3u8Link);

      m3u8Parser.read(m3u8FileContent);

      result.liveData = {
        manifestUrl: m3u8Link,
        data: m3u8Parser.getResult(),
      };

      m3u8Parser.reset();
    }
  }

  return result;
};

const downloadVideo = async (name: string, url: string, onDownloadProgress: any) => {
  try {
    const res = await axios.get(url, {
      responseType: 'blob',
      onDownloadProgress,
    });

    const blobUrl = URL.createObjectURL(res.data);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `${name}.mp4`;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    throw(error);
  }
}

const checkVideoExist = async (name: string): Promise<{ uri: string } | null> => {
  return null;
}

const readVideo = async (name: string): Promise<{ data: string } | null> => {
  return null;
}

const deleteVideo = async (name: string): Promise<boolean | null> => {
  return null;
}

const clearVideo = async (): Promise<boolean | null> => {
  return null;
}

export {
  getVideoInfo,
  downloadVideo,
  checkVideoExist,
  readVideo,
  deleteVideo,
  clearVideo,
};
