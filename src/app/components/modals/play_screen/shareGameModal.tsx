import React, { useEffect, useState } from 'react'
import { Copy, Twitter, Facebook, Linkedin } from 'lucide-react';
import posthog from 'posthog-js';
import Modal from '../modalTemplate';

interface ShareGameModalProps  {
    isOpen: boolean;
    onClose: () => void;
    score: number;
    title: string;
    sharedLink: string | null;
    onPublic: () => void;
    isPublic: boolean;
}

const ShareGameModal: React.FC<ShareGameModalProps> = ({isOpen, onClose, score, title, sharedLink, onPublic, isPublic}) => {

    const [isSharing, setIsSharing] = useState(false);
    // const [shareUrl, setShareUrl] = useState<string | null>(sharedLink);
    const [copied, setCopied] = useState(false);


    useEffect(() => {
        handleShare()
    }, [])
    const handleShare = async () => {
        setIsSharing(true);
        if(sharedLink == null) return;
        try {
            const id = sharedLink?.split("/").pop()

            const response = await fetch('/api/make-game-public', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save game');
            }
            onPublic()
        } catch (error) {
            console.error('Error saving game:', error);
            // You might want to show an error message to the user
        } finally {
            setIsSharing(false);
        }
    };

    const handleCopy = async () => {
        posthog.capture(`user copies shareable link`, {"link": sharedLink})
        if (sharedLink) {
            await navigator.clipboard.writeText(sharedLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };



    const shareMessage = encodeURIComponent(`I scored $${score} in AI Jeopardy - ${title}! Can you beat my score?`);
    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${shareMessage}&url=${encodeURIComponent(sharedLink || '')}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharedLink || '')}&quote=${shareMessage}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(sharedLink || '')}`
    };

    const handleSocialShare = (platform: keyof typeof shareLinks) => {
        posthog.capture(`user clicks share to ${platform}`, {"link": sharedLink})
        if (sharedLink) {
            window.open(shareLinks[platform], '_blank', 'width=600,height=400');
        }
    };

    if (!isOpen) return null;
    
  return (
    <Modal isOpen={isOpen} onClose={onClose}> 
    
    <p className="text-xl text-[#FFCC00] mb-6 text-center">
                Final Score: ${score}
            </p>

    

            {/* Share Button with Loading State */}
            {!isPublic && (
                <button
                    onClick={handleShare}
                    disabled={isSharing}
                    className={`
                                w-full bg-[#FFCC00] text-[#000080] px-6 py-3 rounded-lg 
                                font-bold transition duration-200
                                ${isSharing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FFD700]'}
                            `}
                >
                    {isSharing ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-[#000080] border-t-transparent rounded-full animate-spin" />
                            <span>Generating Share Link...</span>
                        </div>
                    ) : (
                        'Share Game'
                    )}
                </button>
            )}

            {(isPublic && sharedLink) && (
                <div className="space-y-4">
                    <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                        <input
                            type="text"
                            value={sharedLink}
                            readOnly
                            className="flex-1 bg-transparent text-[#FFCC00] px-3 py-2 
                                        rounded-lg focus:outline-none"
                        />
                        <button
                            onClick={handleCopy}
                            className="bg-[#FFCC00] text-[#000080] p-2 rounded-lg 
                                        hover:bg-[#FFD700] transition duration-200"
                        >
                            <Copy size={20} />
                        </button>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => handleSocialShare('twitter')}
                            className="bg-[#1DA1F2] text-white p-2 rounded-lg 
                                        hover:bg-[#1a8cd8] transition duration-200"
                        >
                            <Twitter size={24} />
                        </button>
                        <button
                            onClick={() => handleSocialShare('facebook')}
                            className="bg-[#4267B2] text-white p-2 rounded-lg 
                                        hover:bg-[#365899] transition duration-200"
                        >
                            <Facebook size={24} />
                        </button>
                        <button
                            onClick={() => handleSocialShare('linkedin')}
                            className="bg-[#0077B5] text-white p-2 rounded-lg 
                                        hover:bg-[#006399] transition duration-200"
                        >
                            <Linkedin size={24} />
                        </button>
                    </div>

                    {copied && (
                        <p className="text-green-400 text-sm">Link copied to clipboard!</p>
                    )}


                </div>
            )}
            {isPublic == false &&  (<p className="text-sm text-[#FFCC00] mt-6 text-center">
                 Warning: By sharing game you agree to provide public access to the content of your game
             </p>)}

    </Modal>
  )
}

export default ShareGameModal