import { FileDisplayProps } from '@/app/util/wwbm.types'
import { FileText, Youtube, Check } from 'lucide-react';
import React from 'react'


const FileDisplay: React.FC<FileDisplayProps> = ({
    files,
    transcriptFound,
}) => {
    return (
        <div className="w-full mb-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        {files.length > 0 && (
                            <>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    Uploaded File
                                </h2>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FileText className="w-5 h-5" />
                                    <span>{files[0].name}</span>
                                </div>
                            </>
                        )}
                        {transcriptFound && (
                            <>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    YouTube Video
                                </h2>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Youtube className="w-5 h-5" />
                                    <span>Transcript found</span>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 text-green-600" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileDisplay