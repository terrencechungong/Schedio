export const truncateString = (str: string, maxLength: number): string => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength).concat("...")
}

export const generateRandom4Digit = () => {
    return Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number
  };


  // helpers/getImageDimensions.js

export function getImageDimensions(imageUrl: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
  
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
  
      img.onerror = (err) => {
        reject(new Error(`Failed to load image: ${err.message}`));
      };
  
      // Set crossOrigin before setting src
      img.crossOrigin = 'anonymous';
  
      img.src = imageUrl;
    });
  }
  
  

// In a client-side function
export async function fetchDimensions(imageUrl: string) {  
    try {
      const { width, height } = await getImageDimensions(imageUrl);
      console.log(`Image dimensions: ${width}x${height}`);
      return {width, height};
      // Proceed with your logic using the dimensions
    } catch (error) {
      console.error('Error:', error);
      // Handle the error accordingly
    }
  }
  
  
