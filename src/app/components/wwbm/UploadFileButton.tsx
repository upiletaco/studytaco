import { extractTextFromFile } from '@/app/services/extractText';
import { FileUploadProps } from '@/app/util/wwbm.types';
import React, { useState } from 'react'


const UploadFileButton: React.FC<FileUploadProps> = ({ onFileUpload }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState<boolean>(false)

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setProcessing(false) 

        try {
            const uploadedFiles = Array.from(event.target.files || []);
            const validFiles = uploadedFiles.filter(file => {
                const extension = file.name.split('.').pop()?.toLowerCase();
                return ['txt', 'pdf', 'doc', 'docx'].includes(extension || '');
            });

            if (validFiles.length === 0) {
                throw new Error('No valid files selected');
            }

            const file = validFiles[0];

            const text = await extractTextFromFile(file);
            onFileUpload(text, file)

            console.log('Extracted text:', text);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error processing file');
            console.log(error)
            console.error('File upload error:', err);
        } finally {
            setProcessing(false);
        }
    };
    return (
        <>
            <label
                className={`mb-4
              bg-gradient-to-b from-blue-500 to-blue-600
              hover:from-blue-600 hover:to-blue-700
              text-white px-6 py-3 rounded-lg cursor-pointer
              font-bold text-xl tracking-wide
              transition duration-200 transform
              ${isHovering ? 'scale-105' : 'scale-100'}
              ${processing ? 'opacity-50 cursor-wait' : ''}
              shadow-lg
            `}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {processing ? 'Processing...' : 'Upload Your Notes'}
                <input
                    type="file"
                    className="hidden"
                    onClick={() => { }}
                    accept=".txt,.pdf,.docx"
                    onChange={handleFileUpload}
                    disabled={processing}
                />
            </label>

            <p className="text-black font-semibold mb-8">
                Accepted: TXT, PDF, DOC, DOCX
            </p>
        </>
    )
}

export default UploadFileButton