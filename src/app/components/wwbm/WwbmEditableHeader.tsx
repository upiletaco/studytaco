import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface EditableHeaderProps {
    text: string;
    onTextChange: (newText: string) => void;
    className?: string;
  }
  
  const WWbmEditableHeader: React.FC<EditableHeaderProps> = ({ 
    text, 
    onTextChange,
    className = "text-3xl font-bold text-black mb-6 tracking-wide uppercase" 
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localText, setLocalText] = useState(text);
  
    useEffect(() => {
      setLocalText(text);
    }, [text]);
  
    const handleClick = () => {
      setIsEditing(true);
    };

    const handleBlur = () => {
      setIsEditing(false);
      onTextChange(localText);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        setIsEditing(false);
        onTextChange(localText);
      }
    };
    
    return (
      <>
        {isEditing ? (
          <input
            type="text"
            value={localText}
            onChange={(e) => setLocalText(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className={` w-full bg-transparent focus:outline-none focus:ring-2 
              focus:ring-black rounded px-2 ${className}`}
          />
        ) : (
          <>
          <h2 
            onClick={handleClick}
            className={`cursor-pointer hover:opacity-80 ${className} flex justify-center items-center gap-2`}
          >
            {localText} 
            <Pencil/>
          </h2>
          </>
        )}
      </>
    );
  };

  export default WWbmEditableHeader