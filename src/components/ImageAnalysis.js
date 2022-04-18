import { useEffect } from 'react';

const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

const ImageAnalysis = () => {





  useEffect(() => {
        /**
     * AUTHENTICATE
     * This single client is used for all examples.
     */
    const key = '9233765709d24948aa6182effedde896';
    const endpoint = 'https://odinbook.cognitiveservices.azure.com/';

    const computerVisionClient = new ComputerVisionClient(
      new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);
    /**
     * END - Authenticate
     */

    const computerVision = async () => {
      // Image of different kind of dog.
      const tagsURL = 'https://res.cloudinary.com/dy2ycpgo4/image/upload/v1649748927/odinbook/hbklnb6emcjmsnoqwsjr.jpg';

      try {
        const altText = await computerVisionClient.describeImage(tagsURL);
        console.log(`Alt text: ${altText.captions[0].text}`);
      } catch (error) {
        console.log(error);
      }

    }

    computerVision();
  }, [])

  return (
    <div>Image analysis</div>
  )
}

export default ImageAnalysis