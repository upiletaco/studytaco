// import * as PDFJS from 'pdfjs-dist';
import mammoth from 'mammoth';
// import { Document, Packer, Paragraph } from 'docx';

// const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
// PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;


const extractTextFromFile = async (file: File): Promise<string> => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'txt':
        return extractFromTxt(file);
      case 'pdf':
        return extractFromPdf(file);
      case 'docx':
        return extractFromWord(file);
      default:
        throw new Error('Unsupported file type');
    }
  };

const extractFromWord = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    } catch (error) {
      console.error('Word doc extraction error:', error);
      throw new Error('Failed to extract text from Word document');
    }
  };


  const extractFromPdf = async(file: File): Promise<string> => {

    const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to parse PDF, please pick smaller file');
      }
      
      const data = await response.json();
      return data.text;
  }

//   const extractFromPdf = async (file: File): Promise<string> => {
//     try {
//       const arrayBuffer = await file.arrayBuffer();
//       const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
//       let fullText = '';
  
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const content = await page.getTextContent();
//         const pageText = content.items
//           .map((item: any) => item.str)
//           .join(' ');
//         fullText += pageText + '\n';
//       }
  
//       return fullText.trim();
//     } catch (error) {
//       console.error('PDF extraction error:', error);
//       throw new Error('Failed to extract text from PDF');
//     }
//   };

  const extractFromTxt = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          resolve(event.target.result);
        } else {
          reject(new Error('Failed to read text file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };


export {extractFromTxt, extractFromWord, extractTextFromFile}