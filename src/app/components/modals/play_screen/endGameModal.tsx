import React, {useEffect, useState } from 'react';
import { Copy, Twitter, Facebook, Linkedin, Loader2, SendHorizonal, CheckIcon } from 'lucide-react';
import posthog from 'posthog-js';
import Modal from '../modalTemplate';

interface EndGameModalProps {
    isOpen: boolean;
    onClose: () => void;
    score: number;
    onRestart: () => void;
    onNewGame: () => void;
    title: string;
    sharedLink: string | null;
    onPublic: () => void;
    isPublic: boolean;
}

const EndGameModal: React.FC<EndGameModalProps> = ({
    isOpen,
    onClose,
    score,
    onRestart,
    onNewGame,
    title,
    sharedLink,
    onPublic,
    isPublic


}) => {
    const [isSharing, setIsSharing] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showInvite, setShowInvite] = useState(false)
    const [emailSaved, setIsEmailSaved] = useState(false)
    const [email, setEmail] = useState<string>("")
    const [emailError, setEmailError] = useState<string | null>(null);
    const [handlingEmail, setHandlingEmail] = useState<boolean>(false)


    useEffect(()=>{
        if(isPublic == false){
            handleShare()
        }
    })
    const handleRestart = () => {
        if (emailSaved == false) {
            setShowInvite(true)
            return
        }
        onRestart()
    }

    const handleNewGame = () => {
        if (emailSaved == false) {
            setShowInvite(true)
            return
        }
        onNewGame()
    }


    const handleEmailSubmit = async () => {
        posthog.capture(`user invites friend`, {"link": sharedLink})

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('Email is required');
            return;
        }
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        setHandlingEmail(true)
        try {
            const response = await fetch('/api/save-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });
            if (!response.ok) {
                setEmailError('Failed to save email. Please try again.');
                return;
            }
            setIsEmailSaved(true);
            setEmailError(null);
            setHandlingEmail(false)


        } catch (err) {
            console.error(err)
            setEmailError('Something went wrong. Please try again.');
            setHandlingEmail(false)
        }
    }
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
            // const { id } = await response.json();
            // const urlTitle = title.replaceAll(" ", "-")
            // const url = `${window.location.origin}/play/${urlTitle}/${id}`;
            // setShareUrl(url);
            // onShare(url)
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

    const shareMessage = encodeURIComponent(`I scored $${score} in AI Jeopardy AI Jeopardy - ${title}! Can you beat my score?`);
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
            <h2 className="text-2xl font-bold text-[#FFCC00] mb-8">
                End Current Game?
            </h2>
            <p className="text-xl text-[#FFCC00] mb-6">
                Final Score: ${score}
            </p>

            {/* Share Button with Loading State */}
            {!isPublic && (
                <>
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
                {isPublic == false &&  (<p className="text-sm text-[#FFCC00] mt-6 text-center">
                 Warning: By sharing game you agree to provide public access to the content of your game
             </p>)}

                
             </>
            )}

            {/* Share URL and Social Links */}
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

            <div className="flex flex-col space-y-4 mt-6">
                <button
                    onClick={handleRestart}
                    className="w-full bg-[#000080] text-[#FFCC00] px-6 py-3 rounded-lg 
                                font-bold border-2 border-[#FFCC00] hover:bg-[#000080]/80 transition duration-200"
                >
                    Restart Game
                </button>
                <button
                    onClick={handleNewGame}
                    className="w-full bg-[#000080] text-[#FFCC00] px-6 py-3 rounded-lg 
                                font-bold border-2 border-[#FFCC00] hover:bg-[#000080]/80 transition duration-200"
                >
                    Create New Game
                </button>
                <button
                    onClick={onClose}
                    className="w-full bg-[#000080] text-[#FFCC00] px-6 py-3 rounded-lg 
                                font-bold border-2 border-[#FFCC00] hover:bg-[#000080]/80 transition duration-200"
                >
                    Cancel
                </button>
            </div>

            {showInvite && (
                <div className="text-[#FFCC00] mt-8">
                    <div className="text-2xl font-bold text-center mb-6">
                        Provide your email to continue
                    </div>

                    <div className="space-y-4"> {/* Added wrapper with spacing */}
                        <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                            <input
                                type="text"
                                className="flex-1 bg-transparent text-[#FFCC00] px-3 py-2 
                     rounded-lg focus:outline-none"
                                value={email}
                                disabled={emailSaved}
                                placeholder="Enter a friend's email here"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                onClick={handleEmailSubmit}
                                className="bg-[#FFCC00] text-[#000080] p-2 rounded-lg 
                     hover:bg-[#FFD700] transition duration-200"
                            >

                                {emailSaved ? (<CheckIcon size={20} />) : (handlingEmail ? (<Loader2
                                    size={20}
                                    className="animate-spin"
                                />) : (<SendHorizonal size={20} />))}



                            </button>
                        </div>

                        {/* Error message */}
                        {emailError && (
                            <div className="text-red-500 text-sm text-center">
                                {emailError}
                            </div>
                        )}
                    </div>

                </div>
            )}

        </Modal>

    );
};

export default EndGameModal;